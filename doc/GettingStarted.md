---
title: Getting Started
date: 2020-04-27
author: Geir Aalberg
layout: page
parent: Developer guides
nav_order: 1
tags:
    - tutorial
summary: >
    Where to start using the Weather API from scratch
---

## Introduction

This is a tutorial on how to use the MET Weather API, using the Locationforecast service as an example. It will present you with many of the most common caveats which you need to understand to use the service correctly, many of which will not be obvious even if you're an experienced programmer. We therefore recommend reading this thoroughly regardless of experience level.

### Read the Terms of Service

First we strongly recommend that you start by reading the [Terms of Service](./TermsOfService),
which will save you a lot of problems and head-scratching later. Every week we get emails
from developers you haven't followed the rules and wonder why their application is not working.
Pay special attention to the sections on User Identification, traffic rate limiting and licensing/attribution.

## General API info

The MET Weather API has several dozen products, which change every month. These typically fall
into two categories from a user viewpoint:

1. Products where you need to download a list of available documents
2. Products where you can construct a valid URL beforehand.

In the following guide we will be focusing on our most popular product, Locationforecast 2.0
which is of the latter category.

## Interacting with the API

### Using the OpenAPI (Swagger) UI

To get aquainted with the API, we suggest trying out the various product features in the browser. This is the Swagger UI for the `compact` version of Locationforecast, which can be found at <https://api.met.no/weatherapi/locationforecast/2.0/>.


![OpenAPI UI](./assets/swagger.png)


### Testing the API from the command line

We assume you are using a UNIX-like shell, and have the `curl` command installed.
For *Powershell* on Windows, use the `Invoke-WebRequest` command instead (read the
docs for use).

**Note:** Even though are are using `https://api.met.no/` in the examples below, you may be told to use a different URL. In that case, just replace this in your requests.

#### A basic request

Let's try to fetch the weather forecast for Greenwich, London, UK, using the `Locationforecast` service.

The `-s` option tells curl not to display the progress bar, while the `json_pp` command
makes the json output readable instead of just one ginormous line.

    $ curl -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0'|json_pp
    {
       "properties" : {
          "meta" : {
             "units" : {
                "relative_humidity" : "%",
                "air_temperature" : "celsius",

This might work, or you may get a 403 Forbidden response instead. This is
because you haven't read the
[Terms of Service](./TermsOfService) as mentioned above, and forgot to identify
yourself. This is done by sending some form of contact information in the `User-Agent`
request header, e.g. your company website or an email address. In curl this is pretty easy to do:

    $ curl -A "MyTestApp/0.1 support@example.com" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0'|json_pp
    {
       "properties" : {
          "meta" : {
             "units" : {
                "relative_humidity" : "%",
                "air_temperature" : "celsius",

#### Status headers

At this point it would be useful to look at the response headers returned by the API. For this we
can use either the `-i` option (which displays both headers and body), or `-I` which only returns
the headers (also known as a HEAD request).

    $ curl -A "MyTestApp/0.1 support@example.com" -I -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0'
    HTTP/1.1 203 Non-Authoritative Information
    Content-Type: application/json
    Expires: Tue, 16 Jun 2020 12:44:18 GMT
    Server: Mojolicious (Perl)
    Content-Length: 38149
    Last-Modified: Tue, 16 Jun 2020 12:13:49 GMT
    Date: Tue, 16 Jun 2020 12:13:49 GMT
    Vary: Accept

The first thing to notice is the *"203 Non-Authoritative Information"* instead of the more normal "200 OK".
This means either the product is in beta, or it has been deprecated (either by a new version or to be removed).
In either case you should be careful about using it, and write a warning in your log.

#### Caching data

The next salient point is the `Expires` header; this tells you how long you should keep the downloaded
data around before making a new request.

Even after this time it is more than likely that the data haven't changed. To avoid downloading
the same data over and over (generating unneccesary bandwith and latency), you should use
the `If-Modified-Since` header, using the value of the Last-Modified header

    $ curl -A "MyTestApp/0.1 support@example.com" -i -H 'If-Modified-Since: Tue, 16 Jun 2020 12:11:59 GMT' \
      -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0'
    HTTP/1.1 304 Not Modified
    Content-Type: application/json
    ...

This will return only the headers and no body, which is much faster than loading the whole document.

**Note: If-Modified-Since does not work with beta or deprecated products.** Products returning a 203 status code will always include body.


#### Coordinates

Most forecast models are fairly course, e.g. using a 1km resolution grid.
This means there is no need to send requests with any higher resulotion coordinates,
in fact doing so will harm performance as the API cache will not be able to match
similar responses to the same URL.

For this reason you should never use more than 4 decimals in lat/lon coordinates anywhere
in the API. In the immediate future this will return a 400 Bad Request, so round off your
GPS coordinates today.

Sometimes you might get a `422 Unprocessable Entity` status code back, e.g. from Nowcast. This usually means that your request is for a location which is not covered by the service.

### Using the Available lists

So far we have been using products which cover a continous range of possible values, like geographic coordinates for the whole globe. For some other products however there is only a distinct set of data which are available for download. To find out which, you need to use the `available`  method. This will return a list in XML (default) or JSON format with links to all available files, which you then can download as previously described.

    $ curl -A "MyTestApp/0.1 support@example.com" -s 'https://api.met.no/weatherapi/radar/2.0/available.json?type=lx_reflectivity&area=central_norway'|json_pp
    [
       {
          "params" : {
             "time" : "2020-06-23T07:25:00Z",
             "area" : "central_norway",
             "type" : "lx_reflectivity",
             "content" : "image"
          },
          "uri" : "https://api.met.no/weatherapi/radar/2.0?area=central_norway&content=image&time=2020-06-23T07%3A25%3A00Z&type=lx_reflectivity"
       },
       {
          "params" : {
             "content" : "image",
             "area" : "central_norway",
             "time" : "2020-06-23T07:30:00Z",
             "type" : "lx_reflectivity"
          },
          "uri" : "https://api.met.no/weatherapi/radar/2.0?area=central_norway&content=image&time=2020-06-23T07%3A30%3A00Z&type=lx_reflectivity"
       },
       ...

As you can see we have limited the results to a specific `area` and `type` to filter out unwanted results. This greatly speeds up download times as the full radar list contains almost 3000 images!

**Note:** While it may seem reduntant that the parameters are repeated in the URL as well as listed separately, this may be different in the future.

## Congratulations!

You have now learned the necessary requirements for writing a client for the
Weather API. Next we suggest you check out the [Locationforecast
HOWTO](./locationforecast/HowTO) and the [General forecast JSON
format](./ForecastJSON) documentation.

In addition you must also choose which programming language to
implement it in, of which there are several hundreds to choose from. As such it
is difficult for us to provide detailed instructions, but we plan to provide
some code examples later.


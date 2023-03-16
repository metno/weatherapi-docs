---
# Note: This document is to be moved to the Yr developer portal.
# As such it may contain absolute URLs to api.met.no, unlike other documentation in weatherapi-docs.
#
title: Locationforecast HOWTO
date: 2020-06-30
author: Geir Aalberg
layout: page
parent: Developer guides
nav_order: 30
tags:
    - guide
    - locationforecast
summary: >
    A step-by-step guide to building a Locationforecast client application
---

## Introduction

The WeatherAPI
[Locationforecast/2.0](https://api.met.no/weatherapi/locationforecast/2.0)
service gives you a short- and medium-range weather forecast for the whole world, up
to nine days into the future. It is by far the most popular product we provide,
and should be of interest to everyone.

We assume you have already gone through the [Getting Started](../GettingStarted)
tutorial, which explains the most important concepts of the API.

## Choosing a format

Locationforecast/2.0 comes in three flavours (endpoints):

- **classic**: This is the same XML format as version 1.9. Use this only if you
  already have a working client which you want to migrate with minimal work.
- **compact**: This is the new forecast in GeoJSON format, which includes enough
  data for most needs
- **complete**: This is the same format as `compact`, but with more data (soon
  it will also include probabilities). It is quite large and should not be
  necessary for most users.

From now on we assume you will be using the `compact` endpoint, which you can
find an example of here:

<https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11>

As you can see you have to specify the location using geocoordinates. If you
need to lookup these from place names we suggest using
[GeoNames](http://www.geonames.org/) or [OpenStreetMap
Nominatim](https://nominatim.org/). Do not use more than 4 decimals to avoid
blocking (this is necessary for effective caching).

You should now read more about [the structure of the JSON format we
use](../ForecastJSON), and the [data model](./datamodel) which explains what the
various variables mean. There is also an [official reference
documentation](https://api.met.no/weatherapi/locationforecast/2.0/documentation)
available, where you can try out the various functions in the OpenAPI interface.

## Writing a locationforecast client

Since there are literally hundreds of different programming languages (791 on
[RosettaCode](http://rosettacode.org/wiki/Category:Programming_Languages) alone)
it is impossible for us to write example code for even the most popular ones
using the Weather API today. Instead we are going to give you just the basic
information you will need to write a client in your chosen language:

You will be needing the following tools in your chosen programming language to
use the Weather API :

- a HTTP useragent library
- a JSON parser
- an [RFC 1123](https://www.ietf.org/rfc/rfc1123.txt) date format conversion library

A list of suggested libraries for various languages are listed in Appendix A.

Once you have the libraries installed and a basic website or mobile app running,
you can start implementing the client interface code.

### Steps to handle a request

1. Initialize a variable `sitename` with the name of your website and some
contact info (e.g. a GitHub URL, a non-personal email address, a working website
or a mobile app store appname). **Do not fake this or you are likely to be
permanently blacklisted!**

2. Construct the Locationforecast URL with the necessary parameters. **Always
use HTTPS**, as lots of unencrypted traffic can make you throttled or blocked.

3. Generate a **Useragent** object, with a custom `User-Agent` request header
using the `sitename` variable as value. **If this is missing or generic, you
will get a `403 Forbidden` response.**

4. Call the request method of the Useragent object with the Locationforecast
URL. For optimal performance, use a callback or promise which will enable you to
continue running while the data is being downloaded (non-blocking I/O).

5. When the download is complete, check the HTTP Status header and handle each
condition separately (see the [Status Code documentation](../StatusCodes) for
specifics). In particular, pay special attention to the 203 (deprecated product)
and 429 (throttling) statuses. Also check the `Expires` and `Last-Modified`
timestamp headers (in RFC 1123 format), parse and store them in variables for
later use.

6. If the result is a success (a 2xx status), send the request body to the JSON
parser, which should return a suitable data structure for your programming
language.

7. Before doing anything else, you should store the returned data structure in
some semi-permanent local storage (e.g. on disk or an in-memory key-value
store), along with the `expires` and `last_modified` timestamp variables above.

8. You can now process the forecast JSON data as necessary and present it to the
user in a suitable fashion.

9. If, at a later time you want to repeat the request (e.g. the user has
refreshed the page, or you want to update the data) you must first check if the
current time is later than the `expires` value stored earlier; if not you must
continue using the stored data. **Do not send a new request every time the GPS
position changes by a meter!**

10. If the `expires` timestamp is in the past, you can repeat the request.
However you should do this using the `If-Modified-Since` HTTP request header
with the stored `last_modified` variable above as value. If the data has not
been updated since your last request you will get a `304 Not Modified` status
code back with no body; you should then continue using the stored data until you
get a `200 OK` response.

If you still want to see some example code in your chosen language we suggest
taking a look at the following third-party libraries for
[Go](https://github.com/jackdoe/go-metno/blob/master/metno.go),
[JavaScript](https://github.com/evanshortiss/yr.no-interface/blob/master/lib/api-request.js),
[C#](https://github.com/mr-raw/metno),
[Perl/Mojolicious](https://github.com/jhthorsen/mojo-yr/blob/master/lib/Mojo/YR.pm)
or [PHP](https://github.com/pionl/METno).

#### Dynamic web pages and CORS

When contacting the API directly from the browser using Javascript, you will run into [CORS issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). For example it is not possible to add your own `User-Agent` header; instead the browser will send an `Origin` header identifying your website by its URL. If this is missing, is `localhost` or a local IP address behind a firewall, you risk being throttled and/or blacklisted. Do not use this in production environments!

## Reminders

Please follow our [mailing list or RSS feed](./support) to get important informasjon about upcoming changes to the API.

## Appendix A - Suggested client libraries

Here is a list of known HTTP libraries which may be useful. More will be added in the future.

| Language   | HTTP useragent                                               | JSON parser                                         |
| ---------- | ------------------------------------------------------------ | --------------------------------------------------- |
| JavaScript | [Fetch](https://javascript.info/fetch)                       | [Fetch](https://javascript.info/fetch)              |
| Python     | [requests](https://requests.readthedocs.io/en/master/) ([example](https://stackoverflow.com/questions/10606133/sending-user-agent-using-requests-library-in-python)) | [json](https://docs.python.org/3/library/json.html) |
| Go         | http-client                                                  | json                                                |
| Perl       | Mojo::Useragent                                              | Mojo::JSON::XS                                      |

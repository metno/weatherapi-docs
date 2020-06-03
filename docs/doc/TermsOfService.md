---
title: Terms of Service
date: 2020-05-25
author: Geir Aalberg
layout: post
toc: 1
state: draft
---

# Conditions for use of the service

In the following you will find guidelines for using the service api.met.no. The
service has good capacity and can handle relatively large volumes of requests,
but the capacity is not unlimited. We encourage all users to respect the
guidelines so that the service will be stable.

Most important rules:

1. You must identify yourself
2. You must not cause unnecessary traffic
3. You must not overload our servers

# Legal stuff

## Identification

All requests must include an identifying User Agent-string (UA) in the request
with the application/domain name, optionally version number.
You should also include a company email address or a link to the company website
where we can find contact information. If we cannot contact you in case of
problems, you risk being blocked without warning. Examples:

    "acmeweathersite.com support@acmeweathersite.com"
    "AcmeWeatherApp/0.9 github.com/acmeweatherapp"

## Attribution

All open data require attribution as specified in the CC BY 4.0 license:

> You must give appropriate credit, provide a link to the license,
> and indicate if changes were made. You may do so in any reasonable manner, but
> not in any way that suggests the licensor endorses you or your use.

For more information, please see our [Licensing and Data Policy](./License).

## GDPR

As a app or site developer, the confidentiality of the users' personal
data are your responsibility. If you call the API directly from an app or
browser, the user's IP address will be stored in our logs, along with
any possible geocoordinates used in requests. To guarantee anonymity we
recommend using a proxy gateway so that the ip addresses of the users
are not revealed to us.

All api.met.no access logs are stored in our own data center in Oslo, Norway.
Company email addresses (used in User-Agent headers) are not considered personal
information for GDPR and other privacy purposes.

# Technical issues

## Traffic

Cache data locally and don't generate unnecessary traffic, e.g. by repeated
requests for data which never change (like CAP warnings).

Do not ask too often, and don't schedule requests every hour on the dot (add a
random number of minutes to the time of the requests as our data are continously
updated). Avoid continuous updating of mobile devices. Applications on
mobile devices must not retrieve new data as long as the application is not in
use.

Use the information found in any cache headers, see RFC 2616. For example, use
If-Modified-Since requests if the Last-Modified header exists. Note that the
If-Modified-Since header should be identical to the previous Last-Modified, not
any random timestamp (and definitely not in the future).

Anything over 20 requests/second per application (total, not per client)
requires special agreement. If you have a mobile app, this means the total
traffic from all installations.

## Protocols

We only support encrypted HTTPS for security reasons. Unencrypted HTTP requests
are redirected to HTTPS, but since this is both a security risk and generates
unnecessary traffic it is not allowed over extended periods of time. If you
don't fix it after a reasonable period we reserve the right to block such traffic.

## Compression

All clients must support redirects and gzip compression (Accept-Encoding: gzip,
deflate) as described in RFC 2616.

## Caching and proxy

Web servers should cache all API responses to avoid repeatedly asking for the
same data.

When using requests with latitude/longitude, truncate all coordinates to max 5
decimals. There is no need to ask for weather forecasts on a subatomic level!

## Direct client-to-API connections

Browsers and mobile apps should not contact the API directly, but use a local
proxy (backend for frontend) server where you can cache data and add
identification/authentication details (this is the canonical way of doing
authentication in React since you cannot store client secrets in Javascript).
CORS is explicitly not supported.

------------------

## Access control

## Throttling

Clients which don't follow the TOS risk being throttled. Check response headers
and limit traffic immediately if you receive 429 status codes from the API.

If we see that there are situations that threaten the operation of our
environment, we would consider throttling clients with unnecessary high loads.
If you set up your service in accordance with our policy it will increase the
probability that the service is not blocked or throttled. At high total load of
the service we met.no prioritize critical products such as the location forecast
and text forecast at the expense of other products such as satellite images,
radar images and weather maps.





## Large pictures and objects, for example animations

Copy animations to your own server if you expect heavy traffic. Do the same for
any other large objects. We have good bandwidth, but sites with heavy traffic
which links directly to our animations, can use more bandwidth than we have
taken into account. It is desirable that you inform your users about the time
you retrieved the data so that they can consider whether they look at outdated
data.

## Abuse

Deliberate breach of our TOS, as well as trying to circumvent traffic rate
limiting measures will result in a permanent ban in the use of our services.

## General information about the service

All weather data on the api are continually updated. New data will be made
available in the service continuously. In order to receive important
notifications about changes to the service we strongly suggest you either
subscribe to either our api-users mailing list or RSS feed.

~~On products marked with "LTS" (longtime support, currently on
locationforecastlts) we guarantee a phase-out period of three months.~~

Other products have varying length of their phase-out period depending on what
we consider to be reasonable.

There are no guarantees of delivery regarding this service, or possibilities to
obtain an SLA.

If you need to get a customized delivery of weather data and products, you can
see what is offered in ECOMET catalogue on [ecomet.eu](https://www.ecomet.eu/ecomet-catalogue).

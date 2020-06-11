---
title: API proxy for backend services
date: 2020-01-09
author: Geir Aalberg
layout: post
tags:
	- internal
---

# How to build backend microservices using WeatherAPI as a proxy

## General terms

Described in the [Operational Level Agreement](./OLA).


## Links

Any links to the API generated on the backend must not use hardcoded values,
since the destination varies according to each environment (public, internal,
staging, testing etc). Instead you must read the following HTTP headers which
are included in all requests from the API:

- `X-Forwarded-Host`
- `X-Forwarded-Proto`

Here is a typical example of the headers sent by a request from the build server:

    {
    
        "Accept-Encoding": "gzip",
        "Content-Length": "0",
        "Host": "edge.api.met.no:8080",
        "User-Agent": "WeatherAPI/edge.api.met.no:8080",
        "X-Forwarded-Host": "edge.api.met.no:8080",
        "X-Forwarded-Proto": "https"
    
    }

## Response

### Body

The returned request body cannot be empty; this is flagged as an error in the API.

### Response headers

- **Content-Type**: This must be an IANA-registered media type. If you invent your own the API conversion routines will fail


## Other

For more information, including technical details, please contact:

- Geir Aalberg (geira@met.no)
- Håvard Futsæter (havardf@met.no)

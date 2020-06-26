---
title: HTTP status codes
date: 2020-06-26
author: Geir Aalberg
layout: page
tags:
    - reference
summary: >
    Explanation of the various HTTP status codes returned in the response from
    the API
---

**200 OK**: On success, the appropriate data will be returned with the HTTP
status code "200 OK". This data may be XML or some other format (like PNG, GIF
or JPEG), but as long as the status code indicates success, they should be
there.

**203 Non-Authorative Information**: The product version you are attempting to
use is deprecated. Please consult the product documentation page for information
on how to use the upgraded product. Deprecated products are EOL's after a
certain period of time - this date is available in the product documentation

**304 Not Modified**: Client Side Caching is supported on our API servers, and
requires the use of the if-modified-since directive to be sent in the client
request header. For more information, please consult the http protocol
specification at http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html for more
information and an example of how to correctly send this request

**400 Bad Request**: On error, the HTTP status code "400 Bad request" is
returned along with an error message formatted as HTML. Other 4XX-codes may be
added in the future to differentiate errors. In other words, a client expecting
binary data (like images) should not attempt to parse, decode or use the data
returned to it if it got a 4XX code.

**401 Unauthorized**: This indicates that you are trying to access a resource
which you are not authorized to. Typical examples would be restricted products
(e.g. satellite images) or administrative services.

**403 Forbidden**: This usually means you have been blacklisted due to a
violation of our Terms of Service. On newer products like Locationforecast/2.0
it can also mean that you have been denied service because of failure to
identify yourself in the User-Agent header.

**404**: If the request is OK as such, but the product handler does not have any
data to offer, you will normally receive a "404" code. However, these are cases
where empty response data (ie. an XML document with no real content) do make
sense. In these cases, it can be impossible for the API to see if the input data
it gets from the weather models is empty because of an error, or because it
really should be empty.

**422 Unprocessable Entity**: The 422 status code might be returned when the
request is syntactically correct, but the semantics of the specified url
parameters make it impossible to return data. E.g when you specify a location
outside the supported geographical area for the product. (Note: In hindsight
this is probably not correct usage of 422 as it is designed for WebDAV, but
sometimes it is more important to be consistent than correct.)

**429 Too Many Requests**: The 429 status code indicates that the user has sent
too many requests in a given amount of time ("rate limiting"). Our Terms of
Service state that over 20 requests/second is defined as heavy traffic, which is
not allowed without permission.

**499 Client Closed Request**: The HTTP status code "499 Client Closed Request"
is actually a client error, indicating that the client terminated the connection
before the response was finished (presumably due to a timeout).

**500 Internal Server Error**: An unspecified error in the API itself. Could
possibly indicate a bug in the code (horror!), but more likely a deployment or
server problem.

**502 Bad Gateway**: The API could not fetch data from the backend, either from
disk or one of several internal webservices.

**503 Service Unavailable**: The service is currently not operational or
functioning properly. Examples include a radar site being down, or a service is
not configured.

**504 Gateway Time-out**: Some backend service took to long to respond to the
API. This is usually caused by heavy traffic.

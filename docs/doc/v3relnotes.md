---
title: WeatherAPI 3.0 Release Notes
date: 2017-06-22
author: Geir Aalberg
layout: post
summary: >
    Differences from the old Weather API, used 2007-2017
---

## New features in WeatherAPI 3.0

The API framework and technology has been mostly rewritten, while
preserving most of the 20K lines of code for the existing 48 products.
In addition to better QA this has also enabled several new features:

### Better security

The API now supports HTTPS everywhere, including internal links (e.g. available lists).

### Better performance

Most products now use non-blocking IO for delivery of data, which means
the web application does not have to wait idle while the backend is delivering
data. This means the capability of handling many more simultaneous requests
than before.

### Swagger API metadata

All products now deliver a Swagger (a.k.a. OpenAPI) feed documenting the interface.

### Better error reporting

All 4xx and 5xx errors now include an X-ErrorClass response header in addition
to the HTTP status code. This makes it easier to identify what kind of situation
is causing the error, instead of just trying to figure out from the status code
(which is ambiguous).

Also, error messages are now delivered as plain text unless the client
sends an "Accept: text/html" header (like all browsers).

## Changes from 2.x

### Unencrypted HTTP is no longer supported

HTTP requests will get a redirect to HTTPS.

### Semicolon no longer parameter separator

All links now use ampersands to separate parameters in the query string.
Requests with such were always handled correctly in 2.x, but all generated
documentation and links (e.g. available) used semicolons whereas we now
only use ampersands.

According to the new HTML5 specification, semicolon is no
longer accepted as a valid parameter separator. The standard states that
implementors should be "strictly splitting the string payload on U+0026
AMPERSAND characters (&)". The use of semicolon separators is hence
deprecated in all new WeatherAPI products and version released from
August 2016 onwards. For compatibility we will try to honor old requests
as long as practically feasible.

Also, the undocumented `uri_delimiter` parameter (which could be used to force
the use of ampersands) is now ignored, *unless* you try to force back to
using semicolons (which are no longer supported).

### Unexpectedmissingdata now 502 instead of 404

Sometimes data from the backend are not available. This used to be
presented as a 404 Not Found, but as it really is an error on our side
and not with the client this has been changed to 502 Bad Gateway.

Other status codes may also be changed if deemed necessary.

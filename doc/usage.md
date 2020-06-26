---
title: General Weather API usage
date: 2020-04-15
author: Geir Aalberg
layout: page
toc: 1
state: draft
tags:
    - reference
summary: >
    This explains the basic concepts about how to fetch data from the API
---

The MET Weather API is loosely based on the [REST](http://en.wikipedia.org/wiki/REST)
style of web service programming.  All queries are done via HTTP GET, and the results are returned
as either JSON, XML or the binary format appropriate for the data, as documented by each module.

## Protocols

<p>Note that we only support encrypted HTTPS calls to the API. Any unencrypted
HTTP calls might result in a 301 redirect (for convenience when typing in URLs
in the browser), but constant HTTP traffic is considered a TOS violation and
can lead to blocking.</p>

## Actions

These are examples of how to fetch data from version 0.3 of a fictiocious
product `dummy` (these are not working links since the product doesn't exist).

### Data

To fetch data, you specify the an endpoint and a query string after the product root URL:

    https://api.met.no/weatherapi/dummy/0.3/precipitation?area=Oslo

For some older products, you specify the query string parameters right after the product root URL,
without any endpoint:

    https://api.met.no/weatherapi/dummy/0.3/?type=precipitation&area=Oslo

*Note: This practice is being phased out in favour of using specific endpoints.*

### Documentation

The product reference documentation can be found using these actions:

    https://api.met.no/weatherapi/dummy/0.3/documentation   # traditional method
    https://api.met.no/weatherapi/dummy/0.3/                # for newer products

### Available lists

Some products supply an ever changing set of data. To find the one(s) you want,
you must first download a list of the available data files.

    https://api.met.no/weatherapi/dummy/0.3/available       (default XML)
    https://api.met.no/weatherapi/dummy/0.3/available.json  (JSON format)

Note that not all function handlers support this action; some because it doesn't
make much sense, and others because it's just not implemented.

Check the documentation of the product handler you're using to see if it is
supported. Trying to call it on a handler which doesn't support it will result
in a *404 Not Found* error.

An empty resulting list means that the product handler doesn't
take any parameters, but has an available product.
*Note: This practice is no longer being followed.*

### Schema

For XML data you can download an XSD or DTD using the following action:

    https://api.met.no/weatherapi/dummy/0.3/schema

Note that the SchemaLocation URL in the XML is usually different,
referring instead directly to the authorative MET API schema source:

<https://schema.api.met.no/schemas/>

## Changelog RSS feed

You can subscribe to notifications of changes to each product in the RSS format:

    https://api.met.no/weatherapi/dummy/0.3/changelog

The same information for all products is also present in the general API changelog feed:

<https://api.met.no/feed/changelog>

## Parameters

Parameters are specified as normal GET request query string parameters.

Note that according to the new HTML5 specification, semicolon is no longer
accepted as a valid parameter separator.
The [standard](https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#url-encoded-form-data)
states that implementors should be

>"...strictly splitting the string payload on U+0026 AMPERSAND characters (&)"

The use of semicolon separators is hence deprecated in all new WeatherAPI products and
version released from August 2016 onwards. For compatibility we will try to honor
old requests as long as practically feasible by rewriting them in the frontend proxy.

## Data type definitions

This is the complete set of data types accepted by the WeatherAPI products, defined
as [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).
The documentation for each product will refer to these data types.
Note that the *only* character set allowed in the input parameters/URLs is
[UTF-8](http://en.wikipedia.org/wiki/UTF-8).

### Integer

One or more occurrences of the number 0-9, possibly with plus or minus in front:

    /[+-]?\d+/

### String

One or more of any alphanumeric character plus underscore (_),
but the first character must be a letter:

    /\p{Alphabetic} [\p{Alphabetic}\d_]*/

### Float

An integer optionally followed by a
dot (.) and one or more integers.  Possibly prefixed with plus or minuses:

    /[+-]?\d+(\.\d+)?/

### Datetime

An <a href="http://en.wikipedia.org/wiki/Iso8601">ISO 8601</a> date string formatted like this example:

    2007-01-01T08:00:00Z

The timezone specifier, <strong>Z</strong>, is mandatory.
Currently, only UTC dates are accepted.  This may change.

    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/

### Content type

Some product handlers can deliver the same product in multiple formats, e.g. both XML data
and an image.  The `content_type` parameter lets the client ask for a specific data type from these.
This value should be a well-formed
[Internet media type](http://en.wikipedia.org/wiki/Internet_media_type).
Which media types are supported by which product handler should be documented by the handler.

*Note: We are gradually phasing out the `content_type` parameter in favour of
specifying the format as a file extension (e.g. `/available.json`).*

## Data compression

Response body data of the following MIME types are gzip encoded, if the client requests this in the HTTP headers.

- text/html
- text/plain
- text/xml
- application/xml
- application/json

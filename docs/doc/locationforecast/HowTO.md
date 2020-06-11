---
title: Locationforecast HOWTO
date: 2020-05-11
author: Håvard Futseter
layout: page
state: draft
---

# Services

You get short and medium meteorological forecast data from
[Locationforecast/2.0](/weatherapi/locationforecast/2.0).
This service has three forecast data endpoints:

 - /compact
 - /complete
 - /classic

## /weatherapi/locationforecast/2.0/complete

This service endpoint will return a response with all available forecast
parameters. As we make new forecast parameters available, they will be added to
the responses for this service endpoint.

Also, some geographical areas will have more forecast parameters available than others.

## /weatherapi/locationforecast/2.0/compact

This service endpoint will return a response with only a core set of forecast
parameters. All forecast parameters in this endpoint will be available for every
location. We will add new parameters to this endpoint as well, but much more
rarely, and the response will not increase much.

## /weatherapi/locationforecast/2.0/classic

This service endpoint exists only for backwards compatibility purposes. The
parameters in this endpoint and the XML format provided are identical with
`/locationforecast/1.9`.

This endpoint will be end-of-lifed in the future **[Why?]**, and clients should
migrate to one of the other two endpoints.

# Requests

Use max 4 decimals in lat/lon coordinates; anything more than that will return a 400 Bad Request.


---
title: Locationforecast HOWTO
date: 2020-05-11
author: Håvard Futseter
layout: page
state: draft
tags:
    - reference
    - locationforecast
summary: >
    A step-by-step guide to building a Locationforecast client application
---

## Choose the endpoint for your needs

[Locationforecast/2.0](https://api.met.no/weatherapi/locationforecast/2.0) gives you a short -and medium weather forecast in a GeoJSON format.

When starting to use this service, you need to figure out which endpoint to use for getting forecast data. The service provides three, described below.

If you are uncertain which to pick, start with `/weatherapi/locationforecast/2.0/compact`.

### /weatherapi/locationforecast/2.0/complete

This service endpoint will return a response with all available forecast
parameters. As we make new forecast parameters available, they will be added to
the responses for this service endpoint.

Also, some geographical areas will have more forecast parameters available than others.

### /weatherapi/locationforecast/2.0/compact

This service endpoint will return a response with only a core set of forecast
parameters. All forecast parameters in this endpoint will normally be available for every
location. We will add new parameters to this endpoint as well, but much more
rarely, and the response will not increase much.

### /weatherapi/locationforecast/2.0/classic

This service endpoint exists only for backwards compatibility purposes. The
parameters in this endpoint and the XML format provided are identical with
`/locationforecast/1.9`.

For most new clients, `compact` or `complete` will be a better fit than this endpoint.

## Start using the service

First, read about [the structure of the JSON format we use](../ForecastJSON.md).

Then, create your client in one of two ways:

- From an example response, e.g <https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11>
- From the api reference documentation: <https://api.met.no/weatherapi/locationforecast/2.0>

If you choose option 1, it would still be a good idea to later look at the api reference documentation to make sure you are not missing anything.

For more information about the meteorological content of the service, please also [read our in-depth description of data sources and forecast parameters](datamodel.md).

## Important notes for client code

* Some parameters are not available for every geographic area, so please make sure your client can handle that.
* In rare cases, a parameter drops out due to an operational issue. Make sure to have error logic to handle missing parameters, for one single time but also for the case when the parameter is missing from the entire timeseries.

## Reminders

Please follow our [mailing list](./MailingList) or [RSS feed](./RSS) to get important informasjon about upcoming changes.
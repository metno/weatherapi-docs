---
title: Discontinuation of text forecasts
date: 2018-12-21
author: Geir Aalberg
layout: post
tags:
  - textforecast
  - textlocation
  - errornotifications
---
As mentioned earlier we are discontinuing some little used
products from api.met.no, here is a complete list:

**On February 1st** we will remove the following products from the
textforecast service:

- the *route_fbno* products (these will still be available for professional
  users via NAIS which everybody seem to use anyway)

- the *landday/long*, *seabankday1* and *metkyst* products (which are used to
  generate more comprehensive forecasts)

- the *iga_fbno43*, *easter* and *miskred* products (which haven't been produced for years)

We have checked the logs and all of these have little or no traffic, so we
don't expect them to be missed. This is the full list of discontinued
forecasts:

> *easter, landday0, landday1, landday2, iga_fbno43, landlong, metkyst0,
> metkyst1, miskred_north, miskred_south, route_fbno69, route_fbno70,
> route_fbno72, route_fbno74, route_fbno75, route_fbno76, route_fbno77,
> route_fbno78, route_fbno79, route_fbno80, seabankday1.*

Also, **on March 1st** the textlocation service will be discontinued. We will
also remove the "land" product from the textforecast service. There will be
another forecast product to replace those two products, details of which are
to follow later.

At the same time, the product "seaoslofjord" containing forecasts for
Skagerrak and for the Norwegian coast from the Swedish border to Hordaland
will be discontinued. Forecasts for Skagerrak can be found in the "seabank"
product, while forecasts for the complete Norwegian coastline can be found
in the "coast" product.

We will soon also remove the errornotifications service, which is no longer
producing any data. This will be replaced by specific status messages for
each product.

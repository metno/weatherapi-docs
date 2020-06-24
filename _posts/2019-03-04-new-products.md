---
title: New API products
date: 2019-03-04
author: Geir Aalberg
layout: post
tags:
    - textforecast
    - airqualityforecast
    - routeforecast
    - textlocation
    - errornotifications
    - extremeswwc
---

We will shortly launching some new products, mainly of interest for
Norwegian users. As described earlier, some obsolete products will also be
removed.

textforecast 2.0
----------------

We have started the process of cleaning up the old text forecasts, with a
new XML format (which can be validated), more consistent data structure and
clearly defined areas. All of new forecasts share the same format and
schema, including:

- landoverview
- coast_en, coast_no
- seabank_en, seabank_no, seabank_wmo
- seahigh_en, seahigh_no, seahigh_wmo

To aid in transition from textlocation, all areas are now identified with an
id, which can be used to look up the corresponding geographical coordinate
polygon. These files can be downloaded from the /areas endpoint, but we hope
eventually to be able to include them directly in the forecast.

Textforecast 1.6
----------------

We have removed the "land" product (use "landoverview in 2.0) as well as
"seaoslofjord" (use "coast_no" and "seabank_no" in 2.0).

Airqualityforecast
------------------

For some time we have been working on air quality forecasts in cooperation
with several other public services. This is expected to go out of beta soon.

Routeforecast 1.0
-----------------

This is a new image service for aviation, primarily offshore helicopter flights.

Textlocation 1.0
----------------

This product will expire March 15th. Please use the "landoverview" product
in textforecast along with the area files.

Errornotifications 1.0
----------------------

This service hasn't delivered any data for months and will expire on March 15th.

ExtremesWWC 1.2
---------------

This product will expire <del>on April 1st, when we are turning off the WSklima service</del>
(delayed until further notice).
There might be a similar service on frost.met.no in the future.

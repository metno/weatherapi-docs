---
title: Changes to MetAlerts
date: 2022-12-14
author: Geir Aalberg
layout: post
tags:
    - MetAlerts
---

MetAlerts
---------

You might notice some changes in the CAP XML format for the warnings.
Up to now, all the CAP files have contained only one area per info block,
and only one polygon per area element. We have now done some changes in how
we produce the CAP files, and some warnings may contain several polygons
per area element.

This has always been allowed according to the CAP standard. Since it
has not been used in the CAP warnings from  MET Norway up to now, we suggest
you check that your systems can handle this.

Note that in case of overlapping polygons, the are covered is the total of all
the polygons, with no holes. According to the CAP standard, "if multiple
<polygon>, <circle> or <geocode> elements are included, the area described by
this <area> block is represented by the union of all the included elements".


Textforecast 3.0 beta
---------------------

We have also been busy making a new version of the Textforecast product, this
time in GeoJSON format which many of you have asked for. This means that the
coordinates are now included in the JSON file, instead of having to be looked up
separately. You can test it here:

<https://api.met.no/weatherapi/textforecast/3.0/documentation>

Currently only the land and coast forecasts are included in the beta, sea
forecasts may follow at a later date.


Other products
--------------

A new version of the Turbulence charts are expected to be released in beta on
Feb 1 2023. We are also working on a new version of Sunrise, this time in native
JSON which many of you have asked for. Stay tuned for more updates.

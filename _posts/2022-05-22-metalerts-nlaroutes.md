---
title: Changes to MetAlerts and NLAroutes
date: 2022-05-22
author: Geir Aalberg
layout: post
tags:
    - nlaroutes
    - metalerts
---


MetAlerts
---------

From 1 June 2022 there will be some changes in the CAP warnings in MetAlerts:

<https://api.met.no/weatherapi/metalerts/1.1/>

Some of the area polygons will now be drawn freehand by the meteorologists,
and will be in better agreement with the actual weather situation.
We will still use geocode "county" and "municipalityId" for the affected
administrative areas, but geocodes NUTS3 and iso will no longer be included in the CAP file.

We suggest that users of CAP warnings make some extra checks after 1 June to
ensure their systems are running as intended. If you should find any
discrepancies, please contact us.


NLAroutes
---------

Next week, the number of available routes will increase from 27 to 86. Also, the
time period covered will decrease from 66 hours to 22. This should result in a
reduction in the number of files in available from 50 to 7-9 per route. Also,
the number of timegraph locations will increase from 55 to 75.

To assist in sorting and filtering images, we will also be adding a new "region"
parameter to the available list, e.g.:

<https://api.met.no/weatherapi/nlaroutes/1.0/available.json?region=middle>

The following regions will be available for both routes and locations:

    north, middle, southeast, southwest, coast, old

After a short grace period to enable you to change your systems, the routes and
locations in the "old" region will be removed. This is planned to be implemented
on *1. July*, and will affect the following routes and locations:

Total of 16 routes: AAL-ENRT, ENAN-ENAT, ENAT-ENSS, ENBO-ENVR, ENLX-ENBG, ENLX-ENFL,
ENLX-ENKH, ENLX-ENRT, ENLX-ENSX, ENLX-ENTS, ENLX-XZFR, ENMS-ENRA, ENRA-ENBO,
ENTC-ENMH, ENTS-ENRT, ENZZ-ENKB

Total of 13 locations: ALVDAL, AURLAND, BLAKSTAD, BYKLE, DALSBYGDA, ELVERUM, GULSVIK,
NORDREISA, NOTODDEN, SPYDEBERG, TANA, ULLENSVANG, VEGGLI

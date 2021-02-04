---
title: Termination of various products
date: 2021-02-04
author: Geir Aalberg
layout: post
tags:
  - extremeswwc
  - locationforecast
  - nowcast

---

All good things must come to an end, hopefully to be replaced by something better.
Here is an update of forthcoming changes to the weather APIs.

Locationforecast and Nowcast
----------------------------

As mentioned previously, the old versions of Locationforecast (1.9),
Nowcast (0.9) and Weathericon (1.1) will terminate on March 1st, 2021.
Incredibly, almost 70 % of the current API traffic is still using version 1.9,
This means a lot of sites and apps will stop working shortly.
We recommend everyone not yet upgraded to start working on this ASAP.
Please see our docs for more information:

<https://docs.api.met.no/doc/>

Yr APIs
-------

The Yr API (forecast,xml and varsel.xml), developed by the Norwegian
Broadcasting Corporation NRK is also set to expire this summer, along
with the old Yr site (retro.yr.no). All Yr API users should port their
applications to use Locationforecast/2.0, noting the following differences:

- Yr API uses XML, we recommend JSON for Locationforecast
- Yr API uses placenames, for Locationforecast you must use lat/lon/altitude
- Locationforecast requires identification in the User-Agent header

For more information on porting from Yr, see the developer site:

<https://developer.yr.no/>

Also, NRK is working on a one-time dump of their location database, which will
give you the correct coordinates and altitude to use with Locationforecast and Nowcast,
as well as the URL to the forecast on the new Yr site. This is expected to be
ready in a few days. Please follow the mailing list or one of the sites above
to get information on where to download it.


ExtremesWWC
-----------

As indicated, this product has long been deprecated, pending new functionality
on Frost for the same purpose. Unfortunately this has not yet materialized, and
now the production chain for ExtremesWWC is no longer supported. As a
consequence we will turn it off tomorrow, February 5th 2021. Since this product
only covers Norway and has only a handful of users, we hope you will forgive us
the short notice.

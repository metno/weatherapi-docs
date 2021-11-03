---
title: New beta version of sigcharts
date: 2021-07-14
author: Geir Aalberg
layout: post
tags:
    - forestfireindex
    - sigcharts
---

A short update, mainly of interest to Nordic users:

Sigcharts 2.0 beta
------------------

We have a new version of Sigcharts which, in addition to the previous
Arctic/Norway also covers the Nordic/Baltic regian (minus Iceland). Also, the
search interface has been made consistent with the rest of the API:

<https://api.met.no/weatherapi/sigcharts/2.0/documentation>

While currently in beta we suggest you start using this after the summer is
over. We're not sure how long the current version 1.0 will live, this depends on
how soon our regular users will take to implement the new version.

Forestfire index
----------------

As mentioned some weeks ago, the Forestfireindex product has been terminated and
replaced with a new, map-based service:

<https://skogbrannfare.met.no/>

For those wishing to download the raw data used for the maps, these can now be
found on our THREDDS server:

<https://thredds.met.no/thredds/projects/fwi.html>

TOS addition
------------

With the ongoing migration of users from the Yr API to api.met.no, we've had to update our Terms of Service with a notice on trademark restrictions:

> You are not allowed to make services/sites that appear to be made by Yr, NRK
> or The Norwegian Meteorological Institute. In other words, you may not use the
> word "yr" as a part of your service name, or attach the yr logo to your
> service.

<https://api.met.no/doc/TermsOfService>

This was previously only stated on the conditions of use on yr.no, but as the
old Yr site (retro.yr.no) is closing down soon we've had to transfer the clause
to the api.met.no TOS (incredibly, some users are still referring to this as the
"Yr API", even though they were two different APIs and Yr is a completely
different site run by the Norwegian Broadcasting Corporation).

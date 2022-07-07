---
title: New version of Routeforecast
date: 2022-06-30
author: Geir Aalberg
layout: post
tags:
    - routeforecast
---

Routeforecast
-------------

Due to changed requirements the horizontal maps will be discontinued on Sept
1st. The only product still available after that date will be the vertical cross
sections (vcross).

Since this is a breaking change and lots of stuff in the interface and
documentation suddenly becoming redundant, we have decided to make a new version
2.0 with only the vcross images as can be found here:

<https://api.met.no/weatherapi/routeforecast/2.0/documentation>

Version 1.0 is now deprecated, and will be removed on 2022-09-01.

From our logs there were hardly anyone using the horizontal maps, but users of
the vcross images must now update their URLs to the new format:

    https://api.met.no/weatherapi/routeforecast/2.0/?route=....

(Also note that the new version is stricter about identification than before, so
if you haven't already set a User-Agent header with contact information this is
a good time to do so.)

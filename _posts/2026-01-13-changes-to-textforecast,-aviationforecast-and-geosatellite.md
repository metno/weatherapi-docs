---
title: Changes to textforecast, aviationforecast and geosatellite
date: 2026-01-13
author: Geir Aalberg
layout: post
tags:
    - textforecast
    - aviationforecast
    - geosatellite
---

textforecast/2.0 EOL on 2025-03-16
----------------------------------

Version 3.0 has been out of beta since March last year, and it's time to retire
the old version. It will expire on 16 March, so please update your systems to
handle the new GeoJSON format instead of the old proprietary XML format. As
previously notified, the landoverview forecast period is now only two days,
instead of three as in earlier versions.


New version of aviationforecast
----------------------------------

After a short period in beta, the new version 2.0 is now officially launched.
This uses the standard TAC format instead of XML. Version 1.6 is now deprecated
and will expire on 16 March 2026.

Changes to geosatellite on 2026-03-01
-------------------------------------

Due to little use we are removing the "small" size geosatellite images on 1
March. Normally this should imply a new version, but since the majority of users
won't be affected it would be inconvenient to force them to update their
systems.

Instead we are increasing the update frequency of some images from hourly to
every 10 minutes. This will affect the infrared images for the global and
atlantic_ocean areas.

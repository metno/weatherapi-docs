---
title: More service disruptions ++
date: 2026-11-24
author: Geir Aalberg
layout: post
tags:
    - gribfiles
    - radar
---

Yesterday, 23 November 2026 we were informed users were getting 503 Server Error responses when trying to download large files (radar animations, GRIB files, MPEG4 polarsatellite animations etc.). After some time this was discovered to be caused by a memory shortage on our cache gateway server.

During 2026, API traffic has increased by 50 % and memory usage quickly approached 80 % of the physical RAM capacity. When trying to tune memory allocation we apparently hit a limit, causing large objects not to fit into the cache. By lowering the retention time in memory this morning it seems the errors have gone away for now. Please let us know if you experience similar problems in the future, apologies for the inconvenience.

Also, we would take the opportunity to announce that some very specialized products made for the Norwegian authorities will be discontinued on 1 March 2027, after which they will be available on our partner portal Værio.no. This included the following products:

- Soundprofile
- MetGM
- MetGC

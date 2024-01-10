---
title: Intermittent disruptions of service
date: 2023-12-07
author: Geir Aalberg
layout: post
tags:
    - weathericons
    - isobaricgrib
---

On Monday afternoon (Dec 4th) we had a severe outbreak of planned maintenance,
which resulted in disruption of most MET services between 15:00 and 18:00 UTC.
To cut a long story short, someone tried to turn off some old DNS servers which
were thought not to be in use, which resulted in DHCP overload and most VMs
becoming unresponsive. From what we can see, api.met.no was unavailable for
about 1 hour and 39 minutes, although delivery varied from product to product.

The admins have identified the problem, and made some adjustments so that
similar incidents should not happen again. Next week they will restart all
services in order, after which they will make another attempt to turn off the
old DNS servers. We don't expect any downtimes on api.met.no, but if you should
experience problems during the following time periods, no action is needed:

- Tuesday, Dec 12th 2023 between 08:00 and 10:30 UTC
- Wednesday, Dec 13th 2023 between 08:30-10:30 UTC

In addition they are also changing some network components which are likely to
cause some short disruptions in our services. We had about 3 mins downtime on
Tuesday (Dec 5th) around 09:30 UTC, although it is difficult to see if it
affected the whole API or just our monitoring systems. More maintenance was
planned for today, but postponed due to critical weather conditions. The current
plan is to upgrade the remaining components on Monday (11th) at 09:00 UTC, when
there might be some short interruptions of service. We're sorry for the
inconvenience, but hopefully things will be stable during the xmas period.

As for the rest of the API, there have only been a few minor changes the last
six months:

* A new product
  **[IsobaricGRIB](https://api.met.no/weatherapi/isobaricgrib/1.0/documentation)**
  is in beta, delivering gridded aviation weather data for parts of Norway (with
  more to follow)
* We're also working on
  **[Subseasonal](https://api.met.no/weatherapi/subseasonal/1.0/documentation)**,
  a new product currently very much in beta delivering 21-day forecasts for the Nordic
  region
* Maritime
  [Gribfiles](https://api.met.no/weatherapi/gribfiles/1.1/documentation) have
  been updated with a new model, where wave directions have been swapped so that
  map plotters should show them correctly
* The weather icons have been moved to
  [GitHub](https://github.com/metno/weathericons), and the WeatherIcon API
  service has been terminated

Plans for next year include migrating to new servers during February, hopefully
with better performance. We are also busy implementing the [OGC API
EDR](https://www.ogc.org/standard/ogcapi-edr/) standard, which is likely to be
the predominant search interface for all MET services in the future and
something you might like to read up on.

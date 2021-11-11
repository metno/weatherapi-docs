---
title: Server park upgrade, changes to aviation products and more
date: 2021-11-08
author: Geir Aalberg
layout: post
tags:
    - routeforecast
    - nlaroutes
    - sigcharts
    - tafmetar
    - aviationforecast
---

New API servers
---------------

On Wednesday 10 Nov we will start moving the API traffic to a new server cluster
which promises much better performance, due to faster processors and extensive
use of SSD disks. Hopefully this will result in shorter response times and a
higher turnaround. We'll start propagating the changes via DNS around 10:00 CET.
We have done extensive testing of the new servers, but since the file
distribution chain is a separate system it could possibly happen that some data
have been forgotten by the backend producers. If there are something you feel is
missing, please let us know ASAP at weatherapi-adm@met.no.

The change will at first only affect traffic going to <https://api.met.no/>. Those
with special arrangements (other domains) will be notified later when it's time
to move their traffic.


Aviation product changes
------------------------

We will shortly be adding 22 new routes (vertical cross sections) to
**Routeforecast**. At the same time we will be reducing the number of time steps
from the current 84 to 22 (as stated in the documentation). This should result
in better performance in generating the available lists.

There will also soon be a similar increase in the number of routes for
**NLAroutes**, as well as a similar reduction in time steps.

The new **sigcharts** version 2.0 with Nordic maps is expected to go out of beta
on 1 December, at which time we will deprecate the current version (don't worry,
you will have time to migrate after the New Year).

We will also soon be launching a new option in **Tafmetar**, giving additional
information such as AMD and COR (for TAFs), as well as COR, SPECI and AUTO (for
METARs). These will prefix the existing messages, and can be enabled by using
the parameter `extended=true`. More information on this later.

Finally, the IGA warnings will be removed from **Aviationforecast** in December.


EOL for the old Yr API
----------------------

As previously mentioned, the "free weather data" API on yr.no is going away, and
will be turned off completely on 1 February 2022. This will affect both the XML
data (varsel.xml and forecast.xml) and the HTML widgets currently used on many
websites. Until then the services will suffer planned outages of increasing
length, informing developers of the need to change to newer services.

For more information, see the Yr Developer docs or contact NRK at support@yr.no.

<https://developer.yr.no/doc/guides/deprecating-old-widgets/>


New version of available?
-------------------------

Finally, we are planning to replace our existing, home-grown "available" method
with something a bit more effective, preferably using existing standards. It has
been more or less unchanged since the launch of the API in 2007, and since then
the amount of available files has grown enormously (we currently deliver over
5000 files for some products). This means the complete list can take several
seconds to generate, which is a problem for the total API performance.

We are looking at some of the new OGC standards, which fully support OpenAPI and
should in time hopefully be supported by standard libraries for the most used
programming languages. If you are interested you can find some documentation
here:

<https://ogcapi.ogc.org/edr/overview.html>

If you have some specific requests for new features in the "available2"
functionality we would very much like to hear from you.
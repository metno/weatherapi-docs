---
title: New version of Oceanforecast, and more
date: 2021-03-26
author: Geir Aalberg
layout: post
tags:
    - oceanforecast
---


Questions to the administrators
-------------------------------

We're always getting a steady stream of questions from API users, and after
terminating Locationforecast/1.9 this has peaked significantly. Unfortunately,
almost all of the questions are variations of two themes:

1. Why am I being blocked with a 403 response?
2. What kind of other data do you have except for the API?

While the first one is easy to answer (read the documentation), it's also the
hardest to solve (people don't read documentation). So again, if you have
problems and must contact us, please make sure you a) have set an identifying
User-Agent header and b) give us you IP address so we can check our logs for
problems.

The other one is more complicated. While we have many products on api.met.no and
several other APIs as well (e.g. Frost), most of the data we produce are really
only meaningful for scientists, and quite complicated to process for people with
only general programming experience. The data are stored as NetCDF files in our
THREDDS archive, which is administered by another team. Us API guys don't really
know much about the data residing there and how to use them, so we can only
forward such questions to the scientists or the thredds admins.

To direct your attention in the right direction, we have made a thredds landing
page which contains a useful starting point in where you can find scientific
data and documentation how to use them. This is now linked in the product list
on api.met.no:

<https://api.met.no/product/THREDDS>

If you have questions regarding those data, please don't use the weatherapi-adm
address as this goes directly to the API admins. Instead send an email to
thredds@met.no to ensure your questions go to the relevant personnel.


Oceanforecast 2.0
-----------------

Some of you have already noticed this, but we have quietly launched a new beta
version of Oceanforecast which now uses the same FORTI backend and JSON format
as the latest Locationforecast and Nowcast. Unlike the others the new version
will only offer JSON output, as the MOX XML format is excessively complicated
and we can no longer find the spec(!).

Also note that the wave direction has been changed from oceanographic convention
("going to", similar to currents) to the more common meteorological convention
("coming from", similar to wind), as shown here:

    0.9 XML:
    <mox:meanTotalWaveDirection uom="deg">89.7</mox:meanTotalWaveDirection>

    2.0 JSON:
    "sea_surface_wave_from_direction": 269.7

Please take a look at the beta and start porting your existing applications shortly.

We'll be polishing up error messages and verifying the data in the 2.0 beta
until May 1st, when version 0.9 will be deprecated. At the same time we will
switch so that both versions use FORTI as backend since the old Nordic-4km model
is going away. This might mean some trivial differences in formatting and some
values might be different due to more detailed simulations. You can get a
preview of the MOX output coming to 0.9 here; note though that this link will be
removed after May 1st:

<https://api.met.no/weatherapi/oceanforecast/2.0/mox?lat=60.10&lon=5>


Changes to the API
------------------

We've made some extensions to the available listings, which can be summarized as follows:

- added labels to JSON (previously only in XML format)
- added endpoints to JSON and XML where applicable

This means the available lists can now support links with endpoints, like we've
been using with /complete.json and /classic.xml in Locationforecast. Also we
have added extra validation of legal parameter values for all products.


Yr API translation table
------------------------

As promised for some time, NRK has made a dump of their placenames database so
that users of the old Yr API (varsel.xml and forecast.xml) can now easily change
from the old Yr API URL to both api.met.no and the correspond pages on the new
Yr site. Note that the api.met.no string can be used with both locationforecast,
nowcast and other products inside the coverage area.

The links are available for all countries in the world, in both English and
Norwegian (bokmål and nynorsk). You can download them as zip archives of CSV
files from here:

<https://developer.yr.no/doc/guides/getting-started-from-forecast-xml/>


MetAlerts archive
-----------------

By popular requests, we have made available archives of historical alerts going
back to January 2019. This means that developers can now easily simulate
different alert types in their apps even when no warnings have been issued
simply by turning back the clock. To use the archive, just specify the desired
year and month with the "period" query parameter. See here for examples:

https://api.met.no/weatherapi/metalerts/1.1/documentation

Also, we have removed the link to the RSS alert feed from the available list, so
it now only lists the CAP files which makes more sense as both basically do the
same thing.


Probabilityforecast nearing EOL
-------------------------------

This is the final product which has not yet been ported to FORTI. Due to changed
requirements for the new Yr.no site we have decided to terminate this as a
separate product, and instead add some more probabilty data to complete.json in
Locationforecast. This is already in testing in-house, and will be launched
publicly after Easter, at which point Probabilityforecast will be deprecated.
Final EOL date is not yet determined, but sometime this summer is our best
guess.

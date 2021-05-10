---
title: Probabilityforecast and old Oceanforecast EOL July 1st
date: 2021-05-10
author: Geir Aalberg
layout: post
tags:
    - oceanforecast
    - probabilityforecast
    - nowcast
---

As mentioned earlier, Oceanforecast 2.0 is now in production and version 0.9 has
been deprecated, to be removed on 2021-07-01. Despite what we said earlier there
will be no change in the XML format for 0.9, as we have extended the EOL of the
backend model to the same date. (The experimental XML version in 2.0 is also
going away, although later in the summer).

The Probabilityforecast product has also been deprecated and will be removed on
2021-07-01. As a replacement we have added the following new variables to
complete.json in Locationforecast/2.0:

    air_temperature_percentile_10
    air_temperature_percentile_90
    wind_speed_percentile_10
    wind_speed_percentile_90

We have also improved the handling of requests outside coverage for Nowcast and
Oceanforecast (2.0). Any requests outside the model area (as defined by the
shapefile which can be downloaded from the /coverage endpoint) will get a 422
error response. Any requests within the model area but which we have no data for
(either due to lack of radar range or ocean forecasts for dry land) will get a
GeoJSON response with an appropriate error or warning message.

Note that we have implemented a "snap" functionality in Oceanforecast so land
points near the coast will return the nearest point at sea (this means the
coordinates in the URL and JSON may be different). The new model areas can be
seen on the maps here:

<https://docs.api.met.no/doc/oceanforecast/datamodel>
<https://docs.api.met.no/doc/nowcast/datamodel>

Finally, as you may know we have not supported unencrypted HTTP for several
years, and all requests to port 80 have been redirected to the corresponding
HTTPS URL. Yet, after several years we still get a lot of traffic from old
systems which has not been updated to use HTTPS, which in some cases could be
considered a privacy liability. As a consequence we have decided to drop this
feature; now all requests to po 80 will be redirected to the front page of the
API.

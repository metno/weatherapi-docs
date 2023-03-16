---
title: Locationforecast FAQ
date: 2020-06-19
author: Ivar Ambjørn Seierstad
layout: page
parent: Locationforecast
grand_parent: Forecasts
#state: draft
nav_order: 3
tags:
    - reference
    - locationforecast
summary: >
    A summary of repeatedly asked questions from the support helpdesk
---

{: .note }
Please also see the [API FAQ](../FAQ) for answers to general API questions.

## Location data

### Q. How do I map place names to geocoordinates?

A. You need a geocoding service. If you are already using a map service this is
usually already built in, e.g. for [Google
Maps](https://developers.google.com/maps/documentation/geocoding/overview).
Otherwise use a separate service like [GeoNames](https://www.geonames.org/)
or [Nominatim](https://nominatim.org/).

Remember to truncate the results to max 4 decimals to facilitate caching.

### Q. What is the altitute parameter for?

A. This is used to adjust temperature according to elevation (and nothing else).
While we have a built-in topographical model in locationforecast this is rather
coarse, so to get the most precise answer you should add the surface altitude
(meters above sea level) of the location for the forecast.

## Data format

### Q. The `nextrun` parameter seems to have gone in locationforecast 2.0?!

A. The forecast is now updated at different times depending on location. You
should instead use the common caching headers in the HTTP response and use an
`If-Modified-Since` header in your request. For more information, see the
[Locationforecast HowTo Guide](./HowTO).

### Q. Why are symbols and precipitation in other time elements than the other weather parameters?

A. The JSON (and XML) contains two different types of data, most data are valid for a exact
time and place. Temperature, cloudiness, pressure, wind are all examples of this
kind of data, and are listed in JSON under `instance` (in XML, the from and to attributes are equal).

Precipitation and weather symbols are computed for a period of time. It doesn't
make sense to talk about how much it rains at 12:00, but how much it will be
raining between 12:00 and 13:00. In JSON this is indicated typically as
`next_1_hours` or `next_6_hours`. Precipitation is given for set intervals (one,
six or twelve hours), if you need precipitation for other periods, you must
compute it by yourselves.

Weather symbols are just calculated using the other parameters (cloud,
temperature and precipitation) and is mainly a way of showing many parameters in
one symbol. These must be computed for the interval the symbol is going to
represent, you can't just add them. This is the reason why you find some periods
with only symbols and no precipitation.

### Q. Why are the timestamps in UTC and not local time?

A. We have tried earlier to calculate local time from geo coordinates, but
this is exceedingly difficult and created a huge amount of problems. To sum
up, the following steps are necessary to get the correct result:

1. Find the correct country from the coordinates by using detailed polygons
for borders, including territorial waters (local time at sea is even more
[complicated](https://en.wikipedia.org/wiki/Nautical_time)).

2. Find the relevant timezone inside the country, which often change due to
politics (e.g. Russia and Venezuela in recent times).

3. Figure out if daylight savings time is in effect (in USA this can vary
from [county to county](https://en.wikipedia.org/wiki/Daylight_saving_time_in_the_United_States)).

4. Compute local time from UTC + timezone + DST.

While the localtime libraries in the OS can help with 2 and 4, it is much
easier to use a place name database which usually contains all the
necessary information (this is what we do at Yr.no with GeoNames).

### Q. What happened to the Beaufort scale attributes from 1.9?

A. The Beaufort scale data has been removed to make the output language
independent. It's trivial to translate from windspeed to Beaufort in your own
language by using the standard table, e.g. from Wikipedia:

<https://en.wikipedia.org/wiki/Beaufort_scale>

### Q. How can I calculate the apparent ("feels like") temperature as used on Yr?

A. The "feels like" temperature on Yr is based on the heat index and wind chill
factor, both of which can be calculated from the existing data in
locationforecast:

- [Heat index](https://en.m.wikipedia.org/wiki/Heat_index) is only used when the
temperature is > 26°C and humidity > 40 %, otherwise the real temperature is
used.
- [Wind chill factor](https://en.m.wikipedia.org/wiki/Wind_chill) is only used
when the temperature is < 10°C and the wind speed is > 1.33 m/s, otherwise
the real temperature is used.

Note however that there is no standard formula for apparent temperature, but
[varies from website to website](https://en.m.wikipedia.org/wiki/Apparent_temperature).
Ideally, solar radiation should be part of the calculation, however this is not
usually included in meteorological observations and will have to be obtained
elsewhere.

## Symbol codes

### Q. What do the symbol codes mean? Where can I find the corresponding icons?

A. See the Weathericon 2.0 product for a list of meanings in various languages,
plus a set of icon files you can download and use in your applications.

### Q. How do you calculate the different symbol code conditions?

A. This is mentioned in the [WeatherIcon docs](https://api.met.no/weatherapi/weathericon/2.0/documentation):

> You can potentially try to reconstruct the weather icons in the API from the
> locationforecast data. A description of the symbolalgorithms is too long to
> document and support officially, but you can have a look at the [source code](https://github.com/metno/weather_symbol)
> if you are interested.


## Visibility

### Q. Is there a known mapping from the fog value predictions given by the MET public API to  visibility in meters?
A. The only information on visibility from the fog value is to use the
definition of fog (visibility less than 1 km)


## Data sources

### Q: Where do you get your forecast model data from?

A: The source for the global weather forecasts is the HRES model from ECMWF:

<https://www.ecmwf.int/en/forecasts/datasets/set-i>

The only adjustment is interpolation from model grid points to the specific
location and an adiabatic height adjustment of air temperature. We use local
observations and do extensive post-prosessing of the forecast for the Nordic
countries and in the Arctic region. But being a service funded by the
Norwegian government we do not have the resources to do this for Australia.

The data used in locationforecast at api.met.no is available from thredds
only for the Nordic countries and the Arctic. We are not allowed to
distribute freely the global gridded files from ECMWF.

Source for the Nordic countries:

Temperature forecasts :

<https://thredds.met.no/thredds/dodsC/metpplatest/met_forecast_1_0km_nordic_latest.nc>

Other parameters:

<https://thredds.met.no/thredds/dodsC/meps25files/meps_det_pp_2_5km_latest.nc>

Arctic region:

<https://thredds.met.no/thredds/dodsC/aromearcticlatest/arome_arctic_pp_2_5km_latest.nc>

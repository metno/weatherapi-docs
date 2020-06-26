---
title: Locationforecast FAQ
date: 2020-06-19
author: Ivar Ambjørn Seierstad
layout: page
state: draft
tags:
    - reference
    - locationforecast
summary: >
    A summary of repeatedly asked questions from the support helpdesk
---

## Data format

### Q. Why are symbols and precipitation in other time elements than the other weather parameters?

The JSON (and XML) contains two different types of data, most data are valid for a exact
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

## Symbol codes

### Q. What do the symbol codes mean? Where can I find the corresponding icons?

A. See the Weathericon 2.0 product for a list of meanings in various languages,
plus a set of icon files you can download and use in your applications.

## Data format and parameters

### Visibility

### Q. Is there a known mapping from the fog value predictions given by
the MET public API to  visibility in meters?

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

<http://thredds.met.no/thredds/dodsC/metpplatest/met_forecast_1_0km_nordic_latest.nc>

Other parameters:

<http://thredds.met.no/thredds/dodsC/meps25files/meps_det_pp_2_5km_latest.nc>

Arctic region:

<http://thredds.met.no/thredds/dodsC/aromearcticlatest/arome_arctic_pp_2_5km_latest.nc>
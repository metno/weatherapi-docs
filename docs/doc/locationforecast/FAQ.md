---
title: Locationforecast FAQ
date: 2020-06-19
author: Geir Aalberg
layout: page
state: draft
tags:
	- reference
	- locationforecast
summary: >
    A summary of repeatedly asked questions from the support helpdesk
---

## Data format and parameters

### Visibility

Q. Is there a known mapping from the fog value predictions given by
the MET public API to  visibility in meters?

A. The only information on visibility from the fog value is to use the
definition of fog (visibility less than 1 km)


## Data sources

*Q: Where do you get your forecast model data from?*

A: The source for the global weather forecasts is the HRES model from ECMWF:
https://www.ecmwf.int/en/forecasts/datasets/set-i

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
http://thredds.met.no/thredds/dodsC/metpplatest/met_forecast_1_0km_nordic_latest.nc

Other parameters:
http://thredds.met.no/thredds/dodsC/meps25files/meps_det_pp_2_5km_latest.nc

Arctic region:

http://thredds.met.no/thredds/dodsC/aromearcticlatest/arome_arctic_pp_2_5km_latest.nc

### Solar energy

*Q. Are historic measurements or historic predictions for the solar
energy that reaches the earth surface and if yes how can we access them?*

A: Historic predictions of solar energy are available from the archive of our
weather prediction model. The radiation parameters are available in NetCDF
format on [THREDDS](http://thredds.met.no/thredds/catalog/meps25epsarchive/catalog.html).

Choose the files with the following name: `meps_mbr0_extracted_2_5km_XXXXX`.



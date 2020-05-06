---
title: Locationforecast data model
date: 2020-04-30
author: Ivar Ambjørn Seierstad
layout: post
toc: 1
state: draft
---

# Data model

## Data sources

The source for the global weather forecasts is [the HRES model from
ECMWF](https://www.ecmwf.int/en/forecasts/datasets/set-i).
The only adjustment is interpolation from model grid points to the specific
location and an adiabatic height adjustment of air temperature. We use local
observations and do extensive post-prosessing of the forecast for the Nordic
countries and in the Arctic region. But being a service funded by the
Norwegian government we do not have the resources to do this for Australia.

The data used in locationforecast at api.met.no is available from thredds
only for the Nordic countries and the Arctic. We are not allowed to
distribute freely the global gridded files from ECMWF.

Source for the Nordic countries:

- [Temperature forecasts](http://thredds.met.no/thredds/dodsC/metpplatest/met_forecast_1_0km_nordic_latest.nc)
- [Other parameters](http://thredds.met.no/thredds/dodsC/meps25files/meps_det_pp_2_5km_latest.nc)
- [Arctic region](http://thredds.met.no/thredds/dodsC/aromearcticlatest/arome_arctic_pp_2_5km_latest.nc)

## Resolution and topography

Oppløsningen på EC modellen er nå ca 9km. Vi bruker så interpolerte data til
et 0.125 graders regulært lat/lon grid i locationforecast. Når man spør
etter et punkt så blir det interpolert forskjellig videre for de ulike
parameterene. For nedbør brukes nærmeste nabo interpolasjon (så da er det
liten vits å spørre tettere enn 0.125 grader) mens for temperatur brukes
bilineær interpolasjon og høydejustering (så da får du et bedre varsel om
man spør for det faktiske stedet).

EC modellen har en egen topografi men den er på veldig grov oppløsning.
Derfor er det en fordel å sende inn høyde i requesten.

(Er den nye topografien implementert? FIXME)

## Thunder

Vi har en statistisk modell for å beregne sannsynligheten for
lyn/torden. Prediktorer i modellen er diverse stabilitetsindekser fra
værvarslingsmodellen. De indikerer om det er sannsynlig med sterk
konvektiv aktivitet. Så hvis sannsynligheten er over en viss terskel og
det er nedbør i symbolet så blir lyn ikonet valgt. Sannsynligheten for
lyn er ikke tilgjengelig i locationforecast.

# Parameters


All parameters are defined in the OpenAPI (Swagger) spec.

## Temperature

The values are predicted for a height of 3 m above ground. (??? FIXME)

## Wind

Ja wind speed er gjennomsnitt over 10min. Vindkast er midlet over 3s og vi
oppgir maks vindkast i løpet av en time.

The values are predicted for a height of 10 m above ground.
Wind direction denote where the wind is coming from, where 0° is north, 90° east, etc.


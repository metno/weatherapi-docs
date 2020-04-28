---
title: Frequently Asked Questions
date: 2020-04-15
author: Geir Aalberg
layout: post
toc: 1
state: draft
---

# Locationforecast

## Model data

### Data sources

The source for the global weather forecasts is the HRES model from ECMWF:
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

### Resolution and topography

Oppløsningen på EC modellen er nå ca 9km. Vi bruker så interpolerte data til
et 0.125 graders regulært lat/lon grid i locationforecast. Når man spør
etter et punkt så blir det interpolert forskjellig videre for de ulike
parameterene. For nedbør brukes nærmeste nabo interpolasjon (så da er det
liten vits å spørre tettere enn 0.125 grader) mens for temperatur brukes
bilineær interpolasjon og høydejustering (så da får du et bedre varsel om
man spør for det faktiske stedet).

EC modellen har en egen topografi men den er på veldig grov oppløsning.
Derfor er det en fordel å sende inn høyde i requesten.

### Thunder

Vi har en statistisk modell for å beregne sannsynligheten for
lyn/torden. Prediktorer i modellen er diverse stabilitetsindekser fra
værvarslingsmodellen. De indikerer om det er sannsynlig med sterk
konvektiv aktivitet. Så hvis sannsynligheten er over en viss terskel og
det er nedbør i symbolet så blir lyn ikonet valgt. Sannsynligheten for
lyn er ikke tilgjengelig i locationforecast.

### XML Format explanation

Q.  We use the weather prognosis data from the URL “Locationforecast 1.9”.
In the information that we get, we find some time information as there are
“nextrun”, “created”, “runended”, “termin”. Can you please provide an
explanation what these time information elements mean?

A.
termin: This is the time when the weather prediction model was initialized
(when the weather analysis was made)
runended: This is when the processing ended for a given run of the weather
prediction model
nextrun: A new run of the weather prediction model should normally be
available by this time

For Norway the short term forecasts are updated every 6 hours with the
exception of air temperature which is updated every hour. The long term
forecasts (day 3 to 10)  are updated every 12 hours.

### Weather icons

You can potentially reconstruct the weather icons in the API from the
forecast in these files. A description of the symbolalgorithms is beyond
the scope of an email but you can have a look at the source code here if
you are interested: https://github.com/metno/weather_symbol

### Solar energy

Q. Are historic measurements or historic predictions for the solar
energy that reaches the earth surface and if yes how can we access them.

A: Historic predictions of solar energy are available from the archive of our
weather prediction model. The radiation parameters are available in NetCDF
format here:
http://thredds.met.no/thredds/catalog/meps25epsarchive/catalog.html

Choose the files with the following name: meps_mbr0_extracted_2_5km_XXXXX

### Visibility

Q. Is there a known mapping from the fog value predictions given by
the MET public API to  visibility in meters?

A. The only information on visibility from the fog value is to use the
definition of fog (visibility less than 1 km)

# Observational data

> Noen som vet om vi interpolerte observasjonsdata eksternt tilgjengelig noe
> sted, fx på thredds? Kan ikke finne noe der, men mener å ha sett det som
> WMS. Det finnes også på SeNorge, hvor jeg antar det er vi som leverer data:
>
> http://www.senorge.no/index.html?p=senorgeny&st=weather

Ja det er vi som leverer som leverer til senorge og dataene finnes på
thredds. I hvilken sammenheng er dette?

Se svar fra Christian Lussana hos oss om tilgang til interpolerte data:

Hi,
real-time data are available here (PREC1d=daily precipitation; TEMP1d=daily
averaged temperature; data for day D encompass the time interval from day
D-1 0600 UTC to day D 0600 UTC):
http://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/provisional_archive/catalog.html

Here you find the archives :
http://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/archive/catalog.html

Here archives of seNorge2 based on MET Norway data + ECA&D data:
http://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2_download_datasets/release_17.08/catalog.html

xgeo.no and senorge.no are also possible options.

Cheers,
Cristian

---
title: THREDDS dataset archive landing page
date: 2021-03-23
author: Geir Aalberg
layout: product
state: draft
nav_exclude: true
tags:
    - reference
    - thredds
summary: >
    Dataset archive including model runs and observation timeseries
meta:
    name: THREDDS
    baseurl: https://thredds.met.no/thredds/catalog.html
    responsible: arildb
    category:
        - weather
        - marine
        - observations
        - images
        #- satellite
        #- lightning
    coverage: Nordic, Arctic
    currentversion: 1.0
    driftsdok: thredds
---

## General information

The [THREDDS Data Server](https://www.unidata.ucar.edu/software/tds/current/)
(TDS) is a web server that provides metadata and data access for scientific
datasets, using OPeNDAP, OGC WMS and WCS, HTTP, and other remote data access
protocols.

[thredds.met.no](https://thredds.met.no/thredds/catalog.html) is an archive
service operated by MET Norway for publishing historical and current research
data. All datasets can be downloaded in NetCDF format or extracted using the
OPeNDAP protocol. Some datasets can also be visualized using the WMS protocol.

Examples of the datasets available include:

- Weather forecasts
- Climate Modelling
- Air Pollution forecasts
- Radioactivite fallout simulations
- Volcanic Ash drift models
- Observations
    - Nordic Gridded Climate Dataset
    - OSI SAF
    - seNorge
    - Remotesensing archive
    - Lightning events
- Ocean and Ice observations and forecasts
- Satellite images

## MET Norway Numerical Weather Prediction products

These are the models operated by MET Norway for our forecasting services
(locationforecast, nowcast and so on). Note that the long-term and global
forecasts are produced by ECMWF and not available for download due to licensing
terms.

The NWP datasets can be found in the [Weather forecasts](https://thredds.met.no/thredds/metno.html)
folder on thredds.met.no.

Documentation for the various models can be found on the [Numerical Weather
Prediction wiki](https://github.com/metno/NWPdocs/wiki).

For a general overview of the different simulation models used in our forecasts,
please see the respective data model documentation page:

- [Locationforecast](https://docs.api.met.no/doc/locationforecast/datamodel)
- [Nowcast](https://docs.api.met.no/doc/nowcast/datamodel)
- [Oceanforecast](https://docs.api.met.no/doc/oceanforecast/datamodel)

More information:

- [The MetCoOp Ensemble Prediction System (MEPS)](https://drive.google.com/file/d/0B-SaEtrDE91WWEJoNkJiUm5TNzg/view) - PDF
- [Changes from MEPS to CMEPS, Feb 2020](https://thredds.met.no/thredds/metno.html)
- [The AROME-Arctic weather model](https://www.met.no/en/projects/The-weather-model-AROME-Arctic/data_access)
- [Old forecasts](https://drive.google.com/file/d/0B-SaEtrDE91WWDkzY3dpZlU1V00/view) - PDF
    - MET AROME MetCoOp
    - MET AROME Norway
    - MET AROME-Arctic_Svalbard

## Accessing data from THREDDS

A short summary on how to access datasets with a selection of tools can be found at <https://docs.api.met.no/doc/thredds>.

For more information, see the section "Data Access" on the [Numerical Weather
Prediction wiki](https://github.com/metno/NWPdocs/wiki/Data-access)

## Support and questions

thredds.met.no is a separate service from api.met.no. Please do not use the
weatherapi-adm email for questions regarding THREDDS or what kind of data
are available, instead send all enquieries to <thredds@met.no>.

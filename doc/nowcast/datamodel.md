---
title: Nowcast data model
date: 2020-09-17
author: Ivar Ambjørn Seierstad
layout: page
toc: 1
tags:
    - reference
    - nowcast
---

## Data sources

The nowcast service covers Norway, Sweden, Finland and Denmark. The extent of the domain is shown in the illustration below.  Forecasts are updated every 5 minutes. 



![Nordic region](../assets/nordic.png)



The nowcast is our best estimate of the current weather conditions. To create the nowcast a wide range of data sources is used. The most important are: 

#### Weather forecasting model 

The weather forecasting model for the Nordic area is the MetCoOp Ensemble Prediction System (**MEPS**). MetCoOp is the Meteorological Cooperation on Operational Numeric  Weather Prediction (NWP) between Finnish Meteorological Institute (FMI), MET Norway, Swedish Meteorological and Hydrological Institute (SMHI) and Estonian Weather Service. It has a horizontal resolution of 2.5 kilometers. More scientific details about this forecasting system can be found here: [MEPS article](https://doi.org/10.1002/qj.3525) 

Extensive post-processing is used to correct for errors in the weather model output caused by  unresolved features such as cold pools, inversions, urban heat islands,  and an intricate coastline. This is  one of the reasons why our forecasts may differ from other forecast providers using MEPS.

MEPS is the background information for our nowcast. If no better information is available to us for a given location the nowcast delivers forecasts based on MEPS. 

#### Weather radars 

Weather radars in Norway, Sweden and Finland are used to create a forecast of precipitation rate for the next two hours.  An optical-flow algorithm extrapolates the precipitation by estimating the motion vectors from the last two observations.  Note that this algorithm can therefore only move existing precipitation.  Where the radar coverage is good this technique generally outperforms precipitation forecasts from MEPS for the next two hours. 

#### Webcams 

Web cameras in Norway are used to correct the weather symbol in near real time. Currently approx 80 cameras from MET Norway and Norsk Luftambulanse are used. This number is expected to increase as other sources become  available. 

#### Observations (crowdsourced)

A dense network of citizen observations from providers such as Netatmo and Holfuy are used together with professional stations to improve current estimates of air temperature and precipitation. The dense network covers the whole nowcast domain. 



## Variables

|Name|XML tag|Unit|Description|
|-----|----|------|-----|
|symbol_code|symbol|string|see WeatherIcon service|
|air_temperature|temperature|celsius| air temperature at 2m above the ground |
|precipitation_amount|precipitation|mm| expected precipitation amount for period |
|**precipitation_rate**|precipitation|mm/h| instant precipitation rate for given time |
|relative_humidity|humidity|%| relative humidity at 2m above the ground |
|wind_from_direction|windDirection|degrees| direction the wind is coming from (0° is north, 90° east, etc.) |
|wind_speed|windSpeed|m/s| wind speed at 10m above the ground (10 min average) |
|wind_speed_of_gust|windGust|m/s| maximum gust for period at 10m above the ground. Gust is wind speed averaged over 3s. |

Note that the **precipitation rate** variable is only included for locations where the radar coverage is of sufficient quality. So make sure your client can handle that. The other parameters are available for the whole geographical extent of the nowcast. 

The variable names are based on the international [CF Standard Name](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html) vocabulary, which is mandatory for all governmental scientific institutions under the EU INSPIRE directive.

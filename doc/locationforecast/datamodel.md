---
title: Locationforecast data model
date: 2020-04-30
author: Ivar Ambjørn Seierstad
layout: post
toc: 1
state: draft
tags:
    - reference
    - locationforecast
---

## Data sources







## Variables

|Name|XML tag|Unit|Description|
|-----|----|------|-----|
|**symbol_code**|symbol|string|see WeatherIcon service|
|**air_pressure_at_sea_level**|pressure|hPa| air pressure at sea level |
|**air_temperature**|temperature|celsius| air temperature at 2m above the ground |
|air_temperature_max|maxTemperature|celsius| maximum air temperature over period |
|air_temperature_min|minTemperature|celsius| minimum air temperature over period |
|**cloud_area_fraction**|cloudiness|%| total cloud cover for all heights |
|cloud_area_fraction_high|highClouds|%| cloud cover higher than 5000m above the ground |
|cloud_area_fraction_low|lowClouds|%| cloud cover lower than 2000m above the ground |
|cloud_area_fraction_medium|mediumClouds|%| cloud cover between 2000 and 5000m above the ground |
|dew_point_temperature|dewpointTemperature|celsius| dew point temperature 2m above the ground |
|fog_area_fraction|fog|%| amount of surrounding area covered in fog (horizontal view under a 1000 meters) |
|**precipitation_amount**|precipitation|mm| expected precipitation amount for period |
|precipitation_amount_max|@maxvalue|mm| maximum likely precipitation for period |
|precipitation_amount_min|@minvalue|mm| maximum likely precipitation for period |
|probability_of_precipitation||%| chance of precipitation during period |
|**relative_humidity**|humidity|%| relative humidity at 2m above the ground |
|ultraviolet_index_clear_sky||1| ultraviolet index for cloud free conditions, 0 (low) to 11+ (extreme) |
|**wind_from_direction**|windDirection|degrees| direction the wind is coming from (0° is north, 90° east, etc.) |
|**wind_speed**|windSpeed|m/s| wind speed at 10m above the ground (10 min average) |
|wind_speed_of_gust|windGust|m/s| maximum gust for period at 10m above the ground. Gust is wind speed averaged over 3s. |



Variables in **bold** are included in `compact.json`, others only in `complete.json`.

The variable names are based on the international [CF Standard Name](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html) vocabulary, which is mandatory for all governmental scientific institutions under the EU INSPIRE directive.



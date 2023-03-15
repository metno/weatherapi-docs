---
title: General point forecast JSON format
date: 2020-05-03
author: Håvard Futseter
layout: page
parent: Formats
nav_order: 20
tags:
    - reference
    - locationforecast
    - nowcast
    - oceanforecast
summary: >
    Description of the JSON format used in Locationforecast, Nowcast and others
todo:
    - extension for percentiles
---

This JSON format is meant for encoding meteorological and oceanographic forecast
timeseries data for a specific geographical point on earth.

This documentation has two parts. The first part describes the structure of the
JSON format. The second part describes how this format is used in our services
to represent forecast data.

## Format

The format has three main parts:

 - Geographical description
 - Forecast metadata
 - Forecast timeseries.

Here is an excerpt of a forecast response:

    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          60.1,
          267
        ]
      },
      "properties": {
        "meta": {
          "updated_at": "2020-06-10T13:04:26Z",
          "units": {
            "air_pressure_at_sea_level": "hPa",
            "air_temperature": "celsius",
            "air_temperature_max": "celsius",
            "air_temperature_min": "celsius",
            "cloud_area_fraction": "%",
            "cloud_area_fraction_high": "%",
            "cloud_area_fraction_low": "%",
            "cloud_area_fraction_medium": "%",
            "dew_point_temperature": "celsius",
            "fog_area_fraction": "%",
            "precipitation_amount": "mm",
            "precipitation_amount_max": "mm",
            "precipitation_amount_min": "mm",
            "probability_of_precipitation": "%",
            "probability_of_thunder": "%",
            "relative_humidity": "%",
            "ultraviolet_index_clear_sky": "1",
            "wind_from_direction": "degrees",
            "wind_speed": "m/s",
            "wind_speed_of_gust": "m/s"
          }
        },
        "timeseries": [
          {
            "time": "2020-06-10T13:00:00Z",
            "data": {
              "instant": {
                "details": {
                  "air_pressure_at_sea_level": 1020.5,
                  "air_temperature": 20.7,
                  "cloud_area_fraction": 58.0,
                  "cloud_area_fraction_high": 47.7,
                  "cloud_area_fraction_low": 17.7,
                  "cloud_area_fraction_medium": 1.7,
                  "dew_point_temperature": 9.5,
                  "fog_area_fraction": 0.0,
                  "relative_humidity": 48.6,
                  "ultraviolet_index_clear_sky": 4.7,
                  "wind_from_direction": 151.8,
                  "wind_speed": 2.5,
                  "wind_speed_of_gust": 6.6
                }
              },
              "next_12_hours": {
                "summary": {
                  "symbol_code": "partlycloudy_day"
                },
                "details": {
                  "probability_of_precipitation": 2.2
                }
              },
              "next_1_hours": {
                "summary": {
                  "symbol_code": "partlycloudy_day"
                },
                "details": {
                  "precipitation_amount": 0.0,
                  "precipitation_amount_max": 0.0,
                  "precipitation_amount_min": 0.0,
                  "probability_of_precipitation": 0.0,
                  "probability_of_thunder": 0.0
                }
              },
              "next_6_hours": {
                "summary": {
                  "symbol_code": "partlycloudy_day"
                },
                "details": {
                  "air_temperature_max": 20.7,
                  "air_temperature_min": 18.4,
                  "precipitation_amount": 0.0,
                  "precipitation_amount_max": 0.0,
                  "precipitation_amount_min": 0.0,
                  "probability_of_precipitation": 1.1
                }
              }
            }
          },
        [..]

You can get a complete forecast response using the `/complete` method, e.g.

- <https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=60.10&lon=10>

### Geographical description

    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        10,
        60.1,
        267
      ]
    },

We use the [GeoJSON](https://geojson.org/) standard to structure our format,
see our [documentation](./GeoJSON) for more details.
Coordinates are in the EPSG:4326 system, on the form "longitude, latitude, altitude".

All forecast data are listed under the GeoJSON attribute called `properties`.

### Forecast metadata

    "meta": {
      "updated_at": "2020-06-10T13:04:26Z",
      "units": {
        "air_pressure_at_sea_level": "hPa",
        "air_temperature": "celsius",
         "air_temperature_max": "celsius",
        "air_temperature_min": "celsius",
        "cloud_area_fraction": "%",
        "cloud_area_fraction_high": "%",
        "cloud_area_fraction_low": "%",
        "cloud_area_fraction_medium": "%",
        "dew_point_temperature": "celsius",
        "fog_area_fraction": "%",
        "precipitation_amount": "mm",
        "precipitation_amount_max": "mm",
        "precipitation_amount_min": "mm",
        "probability_of_precipitation": "%",
        "probability_of_thunder": "%",
        "relative_humidity": "%",
        "ultraviolet_index_clear_sky": "1",
        "wind_from_direction": "degrees",
        "wind_speed": "m/s",
        "wind_speed_of_gust": "m/s"
      }
    },

Currently we have only two pieces of metadata in our forecast data.

The first bit is `updated_at`. This specifies the most recent time when we
updated the forecast data.

The second piece of metadata is `units`. The unit of all forecast parameters
listed in the forecast data are listed in this block. The units are listed in
each forecast document, but the unit for e.g `air_temperature` will be same for
all locations. We will notify you about any change in unit values for a
parameter.

### Forecast timeseries

The forecast timeseries is structured as an array of forecast objects. The array
is always sorted with increasing time. All timestamps are in UTC.

The time resolution for a timeseries can vary. E.g the first half of a timeseries can have time values with one hour intervals,
while the last half of the timeseries can have time values with six hour intervals.

Each forecast object contains a `time` attribute and a number of forecast
parameters for that time. We have two main types of forecast parameters:

- parameters for a time instant
- parameters for a time period

#### Parameters for a time instant

These parameters are found under the `instant` object. These parameters, e.g
`air_temperature` has a value that describes the state at that exact time
instant.

#### Parameters for a time period

These parameters are found under a number of objects: `next_1_hours`,
`next_6_hours`, `next_12_hours`. These parameters, e.g `precipitation_amount`
describe a period of time. E.g `precipitation_amount` under the object
`next_1_hours` describe the amount of forecasted precipitation for the period
`time` + 1 hour.

The parameters under the object `summary` describes the weather situation based
on many of the other parameters. E.g `symbol_code` will describe the weather
situation for period of time, and includes information about clouds,
precipitation and more. It is also used as the basename of the weathericon
filename, by appending the desired extension (`.png`, `.svg` or similar).

Please note that there will typically be multiple period objects for any given time value, e.g one forecast object
can have `next_1_hours`, `next_6_hours` and `next_12_hours`. There will never be a period object with shorter period
than the current time resolution in the timeseries. So, if its 6 hours until the next time value, the current forecast object
will NOT have a `next_1_hours` period object.
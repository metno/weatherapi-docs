---
title: Sunrise 3.0
date: 2023-02-21
author: Geir Aalberg
layout: page
toc: 1
tags:
    - reference
    - sunrise
---

## Sunrise 3.0 data format


### Properties

|Body|Name|Description|
|----|----|-----------|
|Sun |sunrise|when the upper limb of the sun becomes visible over the horizon*|
|Sun |sunset|when the upper limb of the sun no longer is visible over the horizon*|
|Sun |solarnoon|when the moon centre crosses the meridian|
|Sun |solarmidnight|when the moon centre crosses the antimeridian|
|Moon|moonrise|when the upper limb of the moon becomes visible over the horizon*|
|Moon|moonset|when the upper limb of the moon no longer is visible over the horizon*|
|Moon|high_moon|when the moon centre crosses the meridian|
|Moon|low_moon|when the moon centre crosses the antimeridian|
| -  |azimuth|horizontal angle from north to the horizontal component of the disc centre angle from the horizon
|Moon|phase|degrees, 0 being new moon and 180 being full moon|

*) Technically defined as when the sun is 0.8333 degrees below the horizon.
This is an approximation given the average apparent
radius of the sun and average refraction (both which can vary slightly due to
irregular planetary orbits and atmospheric conditions).

#### Moon phases

|Degrees |Descripton|
|--------|----------|
|  0     |New moon|
|  0..90 |Waxing crescent|
| 90..180|Waxing gibbous |
| 180    |Full moon      |
|180..270|Waning gibbous |
|270..360|Waning crescent|

### Example outputs

#### Sun

    {
       "type" : "Feature",
       "copyright" : "MET Norway",
       "licenseURL" : "https://api.met.no/license_data.html",
       "geometry" : {
          "coordinates" : [
             10.716667,
             59.933333
          ],
          "type" : "Point"
       },
       "when" : {
          "interval" : [
             "2022-12-17T23:17:00Z",
             "2022-12-18T23:17:00Z"
          ]
       },
       "properties" : {
          "body" : "Sun",
          "solarmidnight" : {
             "disc_centre_elevation" : -53.47,
             "time" : "2022-12-19T00:13+01:00",
             "visible" : false
          },
          "solarnoon" : {
             "disc_centre_elevation" : 6.67,
             "time" : "2022-12-18T12:13+01:00",
             "visible" : true
          },
          "sunrise" : {
             "azimuth" : 140.12,
             "time" : "2022-12-18T09:16+01:00"
          },
          "sunset" : {
             "azimuth" : 219.87,
             "time" : "2022-12-18T15:10+01:00"
          }
       }
    }

#### Moon

    {
      "copyright": "MET Norway",
      "licenseURL": "https://api.met.no/license_data.html",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.716667,
          59.933333
        ]
      },
      "when": {
        "interval": [
          "2022-12-17T23:17:00Z",
          "2022-12-18T23:17:00Z"
        ]
      },
      "properties": {
        "body": "Moon",
        "moonrise": {
          "time": "2022-12-18T02:01+01:00",
          "azimuth": 98.49
        },
        "moonset": {
          "time": "2022-12-18T13:01+01:00",
          "azimuth": 255.99
        },
        "high_moon": {
          "time": "2022-12-18T07:41+01:00",
          "disc_centre_elevation": 23.89,
          "visible": true
        },
        "low_moon": {
          "time": "2022-12-18T20:03+01:00",
          "disc_centre_elevation": -39.17,
          "visible": false
        },
        "moonphase": {
          "value": 288.54
        }
      }
    }




## Additional notes

### Calculating the sun and moon elevations

As the sun elevation describes an almost perfect sine curve on the sky,
the position at a given time can be calculated from the four fixed points
given in the `sunrise`, `solarnoon`, `sunset` and `solarmidnight` elements.
Similarly, the `moonrise`, `high_moon`, `moonset` and `low_moon` elements
can be used to calculate moon elevation. If any of the elements are missing,
it means the object is not visible or does not go below the horizon.

You can download a [PDF document](/doc/assets/PoleSunZenith.pdf) explaining
the formulas in detail.

### Sources

Sunrise 3 uses the [Skyfield](https://rhodesmill.org/skyfield/almanac.html) Python
library for the calculations. If you have more advanced needs than is covered by
this service we recommend downloading this or a similar library and do your
calculations locally.
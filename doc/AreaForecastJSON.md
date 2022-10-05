---
title: General area forecast JSON format
date: 2022-10-05
author: Geir Aalberg
layout: page
status: draft
tags:
    - reference
    - textforecast
summary: >
    Description of the JSON format used in Textforecast
---

This JSON format is meant for encoding meteorological and oceanographic forecast
data for specific geographical areas and time periods.

**Note that the specification is a work in progress and very likely to change
until the end of 2022.**


## Format

The area forecast uses the [GeoJSON](./GeoJSON) standard format, with
additions from GeoJSON-T and JSON-FG for temporal dimension.

The forecasts for each are are grouped under a FeatureCollection as
separate Features:

```json
    {
        "type" : "FeatureCollection",
        "lang" : "no",
        "lastChange" : "2022-09-16T12:00:00Z",
        "features" : [
            {
                "type" : "Feature",
                 "geometry" : {
                    "type" : "Polygon",
                    "coordinates" : [
                        [
                            [ 10.5443, 57.7603 ],
                            [ 11.5058, 57.8628 ],
                            [ 11.1707, 58.3362 ],
                            [ 10.9042, 58.9392 ],
                            [ 10.6532, 59.0437 ],
                            [ 10.2247, 58.9727 ],
                            [ 10.0482, 58.9565 ],
                            [ 9.7847, 58.93 ],
                            [ 9.595, 58.8522 ],
                            [ 9.3692, 58.7597 ],
                            [ 9.1537, 58.629 ],
                            [ 8.8087, 58.3963 ],
                            [ 10.5443, 57.7603 ]
                        ]
                    ]
                },
                "when": {
                   "interval": [
                        "2022-09-16T12:00:00Z",
                        "2022-09-17T00:00:00Z"
                   ]
                },
                "properties" : {
                    "forecasttype" : "sea",
                    "name" : "Indre Skagerrak",
                    "text" : "Nordlig periodevis frisk bris 10 m/s. Oppholdsvær og god sikt. I kveld kan hende enkelte regnbyger med moderat sikt."
                }
            }
        ]
    }
```
The `lastChange` attribute indicates when the forecast set was generated.
Most forecast sets are produced in Norwegian and English as separate files,
except for the land forecast which is only in Norwegian. The language
is specified by the `lang` attribute.

Each separate forecast covers an area defined by a single Polygon with no holes.
The name of the area (as used by MET Norway in our forecasts) is listed
under properties in the `name` attribute.
MultiPolygons might be used in a later version of Textforecast.

The interval which the forecast is valid for is specified in the `when`
attribute, as (more or less) defined by the GeoJSON-T and JSON-FG standards.

Each forecast has a `forecasttype` attribute, which is one of the following:

- **normal**: used for most forecasts under normal condition
- **sea**: used for critical conditions at sea (???)

The actual forecast then follows in the `text` attribute, using UTF-8 encoding.

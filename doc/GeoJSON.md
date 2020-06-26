---
title: GeoJSON
date: 2020-06-23
author: Geir Aalberg
layout: page
state: draft
tags:
    - reference
    - locationforecast
    - nowcast
    - oceanforecast
---

## What is GeoJSON?

GeoJSON is a format for encoding a variety of geographic data structures.

    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [125.6, 10.1]
      },
      "properties": {
        "name": "Dinagat Islands"
      }
    }

See the [official documentation](https://geojson.org/) for general information.

## Use on WeatherAPI

We only use a small subset of the GeoJSON specification. For locationforecast
this means the GeoJSON type `Feature`, and the geometry type `Point`.
Other products may use additional geometry types in the future.

All other data (e.g. weather parameters) in our format are defined under the
GeoJSON attribute called `properties`.



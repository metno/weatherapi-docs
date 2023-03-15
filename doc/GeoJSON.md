---
title: GeoJSON
date: 2022-10-05
author: Geir Aalberg
layout: page
parent: Formats
nav_order: 1
tags:
    - reference
    - locationforecast
    - nowcast
    - oceanforecast
    - textforecast
---

## What is GeoJSON?

GeoJSON is a format for encoding a variety of geographical data structures.

Each GeoJSON object has a type, and usually also a geometry and some properties.
The `type` and `geometry` attributes are defined in the
[GeoJSON standard](https://geojson.org/); a short summary will follow below.
All other data (e.g. weather parameters) in our formats are listed under the
`properties` attribute, and is not defined by the GeoJSON standard.

### Geometries

This is a short example describing a point on the globe:

```json
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
```

All coordinates in GeoJSON use longitude and latitude in the WGS84 projection.
Note that the coordinates are in **x,y** format, which is opposite of the usual lat/lon order
(there seems to be [no agreement](https://macwright.com/2015/03/23/geojson-second-bite.html#polygons)
on which is the correct order here).

Multiple feature objects are often grouped together in a `FeatureCollection` array.
This illustrates using the "Polygon" geometry type to describe an area:

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [8.215333,58.089167], [8.525500,58.246167], [8.808833,58.396500] ...
                    ]
                ]
            },
            "properties": { ... }
        },
        { ...
```

Note that the coordinate pairs are an array of arrays inside an array(!). This is
because GeoJSON allows for the definition of hollow arrays. In this case, the
first item of the `coordinates` array is the outer ring and the second item the hole.

It is also allowed to specify more than one polygon for a feature, which adds another array
to the stack. This can be used e.g. to specify that a forecast covers several counties.

```json
"geometry": {
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [22.666667,69.699833], [22.883167,69.650000], ...
            ]
        ],
        [
            [
                [17.759833,69.687167], [16.458667,69.425667], ...
            ]
        ]
    ]
},
```

(Currently we are using neither MultiPolygons nor hollow Polygons in our forecasts,
but that may change in the future.)

See the [official documentation](https://geojson.org/) for general information.

### What is GeoJSON-T?

Since GeoJSON doesn't define any temporal dimensions, some initiatives have cropped
up on how to solve this. One of these is [GeoJSON-T](https://github.com/kgeographer/geojson-t),
which adds a `when` attribute to each Feature object, which then includes one or more
`timespans`. There is some [discussion](https://github.com/kgeographer/geojson-t/issues/3)
on how to specify this further, but seems to have died.

As it is not yet an established standard there are currently [several
suggestions](http://kgeographer.org/geojson-t-adding-time-to-geojson/)
on how to specify time periods in everything from paleological eras to milliseconds.
Here is one example of setting a validity range of one day:

```json
{
    "type":"Feature",
    "when": {
        "timespans": [
            {
                "start": { "in": "2021-09-29T12:00:00Z" },
                "end": { "in": "2021-09-30T12:00:00Z" },
            }
       ]
},
```

As the proposal seems to have had little traction during the 6-7 years after it
was published, we do not recommend using GeoJSON-T.

### What is JSON-FG?

This is a [new initiative](http://docs.opengeospatial.org/per/21-017r1.html#toc31)
which is currently being worked upon but is likely to end up as an official
[OGC](https://www.osgeo.org/) standard, which we are required to follow. It seems to
be almost GeoJSON but not quite, as it reintroduces concepts like alternate
projections which have been removed in GeoJSON (which now only use WGS-84).

The standards draft is somewhat of a sluggish read, and seems to use [yet another
proprietary definition](http://docs.opengeospatial.org/per/21-017r1.html#toc23)
for temporal dimensions. It also has a `when` attribute but instead of
`timespans` uses `instant` or `interval` subunits:

```json
{
    "type": "Feature",
    "when": {
        "interval": [ "2021-09-29T12:00:00Z", "2021-09-30T12:00:00Z" ]
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [ 8.709204563652449, 51.50352856284526, 100 ],
                [ 8.709312860802727, 51.503457005181794, 100 ],
                [ 8.709391968693081, 51.50350306810203, 100 ],
                [ 8.709283757429898, 51.503574715968284, 100 ],
                [ 8.709204563652449, 51.50352856284526, 100 ]
            ]
        ]
    },
    "properties": {
        "lastChange": "2014-04-24T10:50:18Z",
        ...
    }
}
```

Since this seems to end up like a standard as good as any, we have decided to use
the `when/interval` notation in our [General Area Forecast JSON](./AreaForecastJSON) format.

## Use on WeatherAPI

We only use a small subset of the GeoJSON specification in our data formats.

Textforecast uses a FeatureCollection of Features with Polygon geometries and `when` intervals.
We try to follow both the GeoJSON and JSON-FG standards where they agree.

Locationforecast, Nowcast and Oceanforecast use only a single Feature of the Point geometry type.
Since the data timeseries is part of the `properties` element, we have to define our own
temporal attributes for each timeseries element:

```json
"timeseries": [
    {
        "time": "2020-06-10T13:00:00Z",
        "data": {
```

To implement this in JSON-FG we would have to make each element in the timeseries a
separate Feature in a FeatureCollection with repeated, identical coordinates, which
seemed wasteful at the time (plus there was no standards for temporal dimensions at
the time).

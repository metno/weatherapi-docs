---
title: Map libraries for WeatherAPI
date: 2020-08-18
author: Geir Aalberg
layout: page
state: draft
tags:
    - reference
summary: >
    An overview of map services and how to integrate MET APIs with them
---


## Map services


### Protocols

- WMS
- KML


### Recommended providers

|Name | License | Protocols |
| OpenStreetMap | Open | WMS |
| QGIS | Open | WMS |
| Kartverket | Partly open | WMS |
| Google Maps | Closed | KML |
| [Apple MapKit](https://developer.apple.com/documentation/mapkit) | Closed | ? |
| MapBox | Closed | WMS |
| ArcGIS | Closed | WMS |



## GeoCoding services

Geocoding is the process of converting addresses (like "1600 Amphitheatre
Parkway, Mountain View, CA") into geographic coordinates (like latitude
37.423021 and longitude -122.083739), which you can use to place markers on a
map, or position the map.


### Recommended providers

|Name | License |
| [GeoNames](https://www.geonames.org/) | Open |
| [Nominatim](https://nominatim.org/) | Open |
| [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) | Closed |
| MapBox | Closed |
| ArcGIS | Closed |
| QGIS plugins | Open |
| Kartverket? | Partly open |

## Altitude databases

### Recommended providers

|Name | License |
| OpenCycleMap | Open |
| [Open-Elevation](https://open-elevation.com/) | Open |

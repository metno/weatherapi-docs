---
title: Yr-maps
date: 2025-03-12
author: Geir Aalberg
layout: page
parent: Maps
nav_exclude: true
state: draft
tags:
    - guide
summary: >
    Getting started with Yr-maps
---

## Demo


<script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" rel="stylesheet" />

<div id='map' style="width: 100%; height: 800px;"></div>
<script>
    var map = new maplibregl.Map({
        container: 'map',
        style: 'http://157.249.72.12/styles/basic-preview/style.json',
        center: [15, 65],
        zoom: 4
    });
</script>


## Datakilder

- <https://beta.yr-maps.met.no/> - kart-API med dokumentasjon

Kartilene bruker WebMercator-projeksjon, som er default i de fleste kartklienter.

## Ressurser

### Yr-maps

- [Dokumentasjon fra NRK](https://nrkno.github.io/yr-map-docs/) på tile rendering med [kildekode](https://github.com/nrkno/yr-map-docs)
- [TileConvert](https://github.com/metno/tileconvert) - Go-kode for proxy server for produksjon av tiles som kan leses direkte inn i kartbibliotek
- [Yr-maps demo client](https://client.yr-maps.met.no/)

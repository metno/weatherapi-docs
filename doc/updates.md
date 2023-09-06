---
title: Update frequencies
date: 2020-01-09
author: Geir Aalberg
layout: page
parent: Internal use
nav_order: 4
tags:
  - internal
summary: >
    Timing values for caching and data updates
---

Denne oversikten viser tidsintervaller for caching og healthz-sjekk for alle produkter
på api.met.no. Hva som faktisk sjekkes varierer mye, men er primært en stat() av api-list.txt, sekundert av datakatalogen dersom førstnevnte ikke finnes.

Online-tjenester har ingen kriterier, men kontakter backend for å høre om tjenesten er "frisk".

|Produkt|Versjon|Kilde|Cache TTL|Forventet|Terskel|
|-------|-------|-----|---------|---------|-------|
|Airqualityforecast|0.1|online|5m|?|?|
|Aviationforecast|1.6|medusa|1m|24h|25h|
|CBRN|1.0|medusa|1-2m|12h|15h|
|Epsogram|2.0|medusa|5m|24h|25h|
|FMIroutes|0.1|medusa|9m|6h|7h|
|Geosatellite|1.4|medusa|3-5m|?|2h|
|Gribfiles|1.1|medusa|5m|-|-|
|Icemap|1.0|medusa|6m|hverdager|72d|
|Locationforecast|2.0|online|30m|?|?|
|MetAlerts|1.1|medusa|1-15m|5m|7m|
|Metgc|1.0|medusa|9m|3h|4h|
|Metgm|1.0|medusa|9m|3h|4h|
|NLAroutes|1.0|medusa|9m|6h|7h|
|Nowcast|2.0|online|3m|?|?|
|Oceanforecast|2.0|online|30m|?|?|
|Offshoremaps (beta)|1.0|medusa|5m|-|-|
|Oslofjord (beta)|0.1|projects|15m|-|-|
|Polarsatellite|1.1|medusa|5m|15m|20m|
|Radar|2.0|medusa|2-40m|5m|5m|
|Routeforecast|2.0|medusa|5m|6h|7h|
|Sigcharts|2.0|medusa|15m|6h|7h|
|Sigmets|2.0|medusa|5m|24h|25h|
|Soundprofile|1.0|medusa|5m|25h|30h|
|Spotwind|1.1|medusa|8-10m|6h|7h|
|Subjectiveforecast|1.0|medusa|10m|6h|7h|
|Sunrise|2.0|online|5m|?|?|
|Sunrise (beta)|3.0|online|5m|?|?|
|Tafmetar|1.0|online|20s|?|?|
|Textforecast|2.0|medusa|5m|24h|25h|
|Textforecast (beta)|3.0|medusa|5m|24h|25h|
|Tidalwater|1.1|medusa|5m|6h|7h|
|Turbulence|2.0|medusa|8m|3h|4h|
|VerticalProfile|1.1|online|5m|?|?|
|Volcanicashforecast|0.1|online|0-5m|?|?|
|Vtkbriefing|1.0|medusa|2m|24h|30h|

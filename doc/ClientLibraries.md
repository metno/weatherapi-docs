---
title: API client libraries
date: 2020-04-14
author: Geir Aalberg
layout: page
tags:
    - reference
summary: >
    A list of external, third party interfaces for using api.met.no
---

Several independent developers have made third-party client libraries for
the various met.no APIs. We take no responsibility for the functionality
of these (in fact we know some of them are broken!). Also, at the time of
writing all of these using Locationforecast depend on the deprecated 1.9 version;
these must be updated to 2.0 before 2021 to continue working.
Please contact the developers directly if you have any issues.

The official MET Norway code repo can be found at <https://github.com/metno>.

Also note that the use of the YR brand is not allowed in third party software
as per the Terms of Use.

## WeatherAPI third-part client libraries

Note that most of these use the deprecated Locationforecast/1.9 which will be removed
by the end of 2020, and need to be updated to use Locationforecast/2.0.

### Go

- <https://github.com/jackdoe/go-metno>

### C# (C-Sharp)

- <https://github.com/mr-raw/metno>

### Javascript/Node

- <https://github.com/evanshortiss/yr.no-forecast>
- <https://github.com/evanshortiss/yr.no-interface>
- <https://github.com/mitica/metno-client-js>
- <https://github.com/mitica/metno-symbols>
- <https://wiki.gnome.org/Projects/LibGWeather> - The GNOME Weather library (currently the largest user after Yr)

### Python

- <https://github.com/Rory-Sullivan/metno-locationforecast> - Python library for locationforecast/2.0
- <https://github.com/toringer/home-assistant-metnowcast> - HomeAssistant Nowcast plugin

### Perl

- <https://metacpan.org/pod/Mojo::YR> (Mojolicious, obsolete)
- <https://github.com/jhthorsen/mojo-yr> (Mojolicious, obsolete)
- <https://metacpan.org/pod/Weather::YR> (broken)

### PHP

- <https://github.com/pionl/METno> (must be updated to work with locationforecast/2.0)

### Haskell

- <https://gitlab.com/spisemisu/>

### EMACS Lisp

- <https://github.com/ruediger/weather-metno-el>

## Frost API (observations)

### Python

- <https://github.com/ArcticPuffin/frost_api_metno> (Jupyter Notebook)
- <https://github.com/andehen/MetNoPy> (deprecated, uses eklima.met.no which has been replaced by Frost)

### R

- <https://cran.r-project.org/package=frostr>

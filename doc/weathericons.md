---
title: Weather Icons
date: 2023-04-11
author: Geir Aalberg
layout: page
parent: Forecasts
#nav_order: 999
tags:
  - locationforecast, nowcast
summary: >
    Weather icons documentation
---



The icons are meant to be downloaded as archive files and bundled with
your application. There is no need for an api to fetch single icons
individually on demand.

## Weather forecast icons

This is a redesigned set of icons, meant to be used in conjunction
with version 2.0 of Locationforecast, Nowcast and Oceanforecast.
They are available in PNG, SVG and PDF formats.

{: .note }
There is a typing error in `lightssleetshowersandthunder` and
`lightssnowshowersandthunder` (an extra "s" after "light"). Unfortunately,
correcting this would mean breaking existing applications, so it has been
postponed to the next version of locationforecast/nowcast.

### Variants

Some symbols come in three different variants, for day, night and [polar
twilight](https://en.wikipedia.org/wiki/Polar_night#Polar_twilight)
respectively. Others (the ones without sun or moon) are constant during the
day. Locationforecast/2.0 will specify the correct variant to use for each
hour.

### Legend

You can find translations for the various symbols (in English and Norwegian)
inside the icon archives as a CSV file.

Symbol ID                      |English                          |Bokmål                         |Nynorsk                       |Variants
-------------------------------|---------------------------------|-------------------------------|------------------------------|--------
`clearsky`                     |Clear sky                        |Klarvær                        |Klårvêr                       |yes
`fair`                         |Fair                             |Lettskyet                      |Lettskya                      |yes
`partlycloudy`                 |Partly cloudy                    |Delvis skyet                   |Delvis skya                   |yes
`cloudy`                       |Cloudy                           |Skyet                          |Skya                          |no
`lightrainshowers`             |Light rain showers               |Lette regnbyger                |Lette regnbyer                |yes
`rainshowers`                  |Rain showers                     |Regnbyger                      |Regnbyer                      |yes
`heavyrainshowers`             |Heavy rain showers               |Kraftige regnbyger             |Kraftige regnbyer             |yes
`lightrainshowersandthunder`   |Light rain showers and thunder   |Lette regnbyger og torden      |Lette regnbyer og torevêr     |yes
`rainshowersandthunder`        |Rain showers and thunder         |Regnbyger og torden            |Regnbyer og torevêr           |yes
`heavyrainshowersandthunder`   |Heavy rain showers and thunder   |Kraftige regnbyger og torden   |Kraftige regnbyer og torevêr  |yes
`lightsleetshowers`            |Light sleet showers              |Lette sluddbyger               |Lette sluddbyer               |yes
`sleetshowers`                 |Sleet showers                    |Sluddbyger                     |Sluddbyer                     |yes
`heavysleetshowers`            |Heavy sleet showers              |Kraftige sluddbyger            |Kraftige sluddbyer            |yes
`lightssleetshowersandthunder` |Light sleet showers and thunder  |Lette sluddbyger og torden     |Lette sluddbyer og torevêr    |yes
`sleetshowersandthunder`       |Sleet showers and thunder        |Sluddbyger og torden           |Sluddbyer og torevêr          |yes
`heavysleetshowersandthunder`  |Heavy sleet showers and thunder  |Kraftige sluddbyger og torden  |Kraftige sluddbyer og torevêr |yes
`lightsnowshowers`             |Light snow showers               |Lette snøbyger                 |Lette snøbyer                 |yes
`snowshowers`                  |Snow showers                     |Snøbyger                       |Snøbyer                       |yes
`heavysnowshowers`             |Heavy snow showers               |Kraftige snøbyger              |Kraftige snøbyer              |yes
`lightssnowshowersandthunder`  |Light snow showers and thunder   |Lette snøbyger og torden       |Lette snøbyer og torevêr      |yes
`snowshowersandthunder`        |Snow showers and thunder         |Snøbyger og torden             |Snøbyer og torevêr            |yes
`heavysnowshowersandthunder`   |Heavy snow showers and thunder   |Kraftige snøbyger og torden    |Kraftige snøbyer og torevêr   |yes
`lightrain`                    |Light rain                       |Lett regn                      |Lett regn                     |no
`rain`                         |Rain                             |Regn                           |Regn                          |no
`heavyrain`                    |Heavy rain                       |Kraftig regn                   |Kraftig regn                  |no
`lightrainandthunder`          |Light rain and thunder           |Lett regn og torden            |Lett regn og torevêr          |no
`rainandthunder`               |Rain and thunder                 |Regn og torden                 |Regn og torevêr               |no
`heavyrainandthunder`          |Heavy rain and thunder           |Kraftig regn og torden         |Kraftig regn og torevêr       |no
`lightsleet`                   |Light sleet                      |Lett sludd                     |Lett sludd                    |no
`sleet`                        |Sleet                            |Sludd                          |Sludd                         |no
`heavysleet`                   |Heavy sleet                      |Kraftig sludd                  |Kraftig sludd                 |no
`lightsleetandthunder`         |Light sleet and thunder          |Lett sludd og torden           |Lett sludd og torevêr         |no
`sleetandthunder`              |Sleet and thunder                |Sludd og torden                |Sludd og torevêr              |no
`heavysleetandthunder`         |Heavy sleet and thunder          |Kraftig sludd og torden        |Kraftig sludd og torevêr      |no
`lightsnow`                    |Light snow                       |Lett snø                       |Lett snø                      |no
`snow`                         |Snow                             |Snø                            |Snø                           |no
`heavysnow`                    |Heavy snow                       |Kraftig snø                    |Kraftig snø                   |no
`lightsnowandthunder`          |Light snow and thunder           |Lett snø og torden             |Lett snø og torevêr           |no
`snowandthunder`               |Snow and thunder                 |Snø og torden                  |Snø og torevêr                |no
`heavysnowandthunder`          |Heavy snow and thunder           |Kraftig snø og torden          |Kraftig snø og torevêr        |no
`fog`                          |Fog                              |Tåke                           |Skodde                        |no

### Algorithm

You can potentially try to reconstruct the weather icons in the API from the
locationforecast data. A description of the symbol algorithms is too long
to document and support officially, but you can have a look at the [source code
on GitHub](https://github.com/metno/weather_symbol) if you are interested.

## Alerting icons

You can download alerting icons in SVG format (which can be converted to PNG) from the Yr GitHub page.

### Variants

Each warning icon includes a yellow, orange, and red variant.
You can find descriptions of what the icons represent on the Yr help pages
in [English](https://hjelp.yr.no/hc/en-us/articles/360014052634)
and [Norwegian](https://hjelp.yr.no/hc/no/articles/360014052634).

Event type|Icon id
----------|--------
Avalanches|`icon-warning-avalanches`
BlowingSnow|`icon-warning-snow`
DrivingConditions|`icon-warning-drivingconditions`
Flood|`icon-warning-flood`
ForestFire|`icon-warning-forestfire`
Gale|`icon-warning-wind`
Ice|`icon-warning-ice`
Icing|`icon-warning-generic`
Landslide|`icon-warning-landslide`
PolarLow|`icon-warning-polarlow`
Rain|`icon-warning-rain`
RainFlood|`icon-warning-rainflood`
Snow|`icon-warning-snow`
StormSurge|`icon-warning-stormsurge`
Lightning|`icon-warning-lightning`
Wind|`icon-warning-wind`
Unknown|`icon-warning-generic`

In addition there is an extreme warning icon, `icon-warning-extreme`, which only is available in red.


## License

The original icons as used on yr.no can be found on GitHub:
- [weather icons](https://github.com/YR/weather-symbols/)
- [alert icons](https://github.com/nrkno/yr-warning-icons)

The icons are copyright (c) 2015-2017 Yr and licensed under the [MIT
License](https://github.com/YR/weather-symbols/blob/master/LICENSE).

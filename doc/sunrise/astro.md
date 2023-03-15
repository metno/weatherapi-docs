---
title: Sunrise 2.0
date: 2021-10-26
author: Frank Thomas Tveter
layout: page
parent: Sunrise
grand_parent: Forecasts
toc: 1
tags:
    - reference
    - sunrise
---

This service is being deprecated soon. New projects should look into using version 3.0 which is currently in beta.
{: .warning }

## Sunrise 2.0

The `Sunrise` service at `api.met.no` comes with no warranty, but it is still associated with high quality and reliability.
The `Sunrise` service typically processes about 50.000 requests an hour,
and has been operational for about 15 years.
The `Sunrise` service runs the [`astro-api`](#astro-api) software on a set of internal nodes at met.no.
The `astro-api` softare is based on [JPL ephemerides DE405](https://ssd.jpl.nasa.gov/planets/eph_export.html), which is designed for
spacecraft navigation and astronomy, and uses the [SOFA](http://www.iausofa.org/) library along with standard and efficient search algorithms.
If you plan for massive amounts of requests or need full control of the production,
we recommend that you [download](https://github.com/FrankThomasTveter/astro-api) and run the `astro-api` stand-alone web-service on your own production platforms.

A typical request to `Sunrise` may look like this
[https://api.met.no/weatherapi/sunrise/2.0?lat=59.93&lon=10.71&date=2018-05-11&offset=+01:00&days=1](https://api.met.no/weatherapi/sunrise/2.0?lat=59.93&lon=10.71&date=2018-05-11&offset=+01:00&days=1)
and will yield a result as listed below.

      <astrodata xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://schema.api.met.no/schemas/astrodata-2.0.xsd">
       <meta licenseurl="https://api.met.no/license_data.html"/>
       <location latitude="59.9" longitude="10.7" height="0">
        <time date="2018-05-11">
         <moonphase time="2018-05-11T00:00:00+01:00" value="83.993572055" desc="LOCAL MOON STATE * MOON PHASE= 84.0 (waning crescent)"/>
         <moonshadow time="2018-05-11T00:00:00+01:00" elevation="-32.253419319" azimuth="271.240110393" desc="LOCAL MOON STATE * SHADOW ANGLES (azi=271.2,ele=-32.3)"/>
         <moonposition time="2018-05-11T00:00:00+01:00" elevation="-25.292219567" azimuth="56.463357595" range="392862.617327444" phase="83.993572055" desc="LOCAL MOON POSITION Elv: -25.292 deg, Azi: 56.463, Rng: 392862.6 km"/>
         <solarmidnight time="2018-05-11T00:13:14+01:00" elevation="-12.302065552" desc="LOCAL DIURNAL MINIMUM SOLAR ELEVATION (Min= -12.30207)"/>
         <moonrise time="2018-05-11T03:26:16+01:00" desc="LOCAL DIURNAL MOON RISE"/>
         <sunrise time="2018-05-11T03:50:17+01:00" desc="LOCAL DIURNAL SUN RISE"/>
         <high_moon time="2018-05-11T09:03:02+01:00" elevation="25.068004232" desc="LOCAL DIURNAL MAXIMUM MOON ELEVATION (Max= 25.06800)"/>
         <solarnoon time="2018-05-11T12:13:47+01:00" elevation="48.027224701" desc="LOCAL DIURNAL MAXIMUM SOLAR ELEVATION (Max= 48.02722)"/>
         <moonset time="2018-05-11T14:44:05+01:00" desc="LOCAL DIURNAL MOON SET"/>
         <sunset time="2018-05-11T20:38:32+01:00" desc="LOCAL DIURNAL SUN SET"/>
         <low_moon time="2018-05-11T21:15:32+01:00" elevation="-32.765758277" desc="LOCAL DIURNAL MINIMUM MOON ELEVATION (Min= -32.76576)"/>
        </time>
        <time date="2018-05-12">
         <moonposition time="2018-05-12T00:00:00+01:00" elevation="-25.461222292" azimuth="43.257240123" range="387473.27169227" phase="87.326858603" desc="LOCAL MOON POSITION Elv: -25.461 deg, Azi: 43.257, Rng: 387473.3 km"/>
        </time>
       </location>
      </astrodata>

The met.no policy is to make as few changes to the original format as possible.
However, changes may sometimes be inevitable in order to add new information for our partners.

The latest version of `Sunrise` which is currently being testet is available at a public [node](http://157.249.72.176/astro/cgi-bin/small.pl?lat=59.93&lon=10.71&date=2018-05-11&offset=+01:00&days=1).
This version is not intended for production, but is available for development purposes.
The test-version will currently yield a result as listed below.

      <astrodata xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://schema.api.met.no/schemas/astrodata-2.0.xsd">
       <meta licenseurl="https://api.met.no/license_data.html"/>
       <location latitude="59.93" longitude="10.71" height="0">
        <time date="2018-05-11">
         <sunposition time="2018-05-11T00:00:00+01:00" elevation="-12.225" azimuth="356.703" range="151077491.3" visible="false" polar="none"/>
         <moonposition time="2018-05-11T00:00:00+01:00" elevation="-25.271" azimuth="56.461" range="392860.5" cangle="271.3" iangle="-32.3" phase="84.0" visible="false" polar="none"/>
         <solarmidnight time="2018-05-11T00:13:12+01:00" elevation="-12.272" azimuth="359.918" range="151077817.9" visible="false"/>
         <moonrise time="2018-05-11T03:26:16+01:00" azimuth="101.138" illumination="22.0"/>
         <high_moon time="2018-05-11T09:03:00+01:00" elevation="24.779" azimuth="181.448" range="385450.5" illumination="20.4" visible="true"/>
         <solarnoon time="2018-05-11T12:13:45+01:00" elevation="47.997" azimuth="180.081" range="151089192.0" visible="true"/>
         <moonset time="2018-05-11T14:44:01+01:00" azimuth="263.052" illumination="18.7"/>
         <sunset time="2018-05-11T20:38:42+01:00" azimuth="309.956"/>
         <low_moon time="2018-05-11T21:15:30+01:00" elevation="-32.992" azimuth="358.503" range="388842.9" illumination="16.3" visible="false"/>
        </time>
        <time date="2018-05-12">
         <sunposition time="2018-05-12T00:00:00+01:00" elevation="-11.97" azimuth="356.717" range="151112270.1" visible="false" polar="none"/>
         <moonposition time="2018-05-12T00:00:00+01:00" elevation="-25.436" azimuth="43.258" range="387470.7" cangle="278.2" iangle="-44.1" phase="87.3" visible="false" polar="none"/>
        </time>
       </location>
      </astrodata>

The information in the `Sunrise` product can be used to estimate other astronomical information.
Below follows a list of suggested algorithms:

 *   [Refraction](../assets/UpperLimbElevation.pdf) (PDF)
 *   [Twilight times](../assets/PoleSunZenith.pdf) (PDF)
 *   [The Moon shadow](../assets/MoonShadow.pdf) (PDF)

### astro-api

The stand-alone `astro-api` web-service software is available at [github](https://github.com/FrankThomasTveter/astro-api).
The latest version is documented in the [wiki](https://github.com/FrankThomasTveter/astro-api/wiki).
Changes to the `met.no` production are also [listed there](https://github.com/FrankThomasTveter/astro-api/wiki/notifications).

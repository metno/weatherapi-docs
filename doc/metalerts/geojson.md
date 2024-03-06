---
title: MetAlerts GeoJSON format
date: 2024-03-05
author: Geir Aalberg
state: draft
layout: page
parent: MetAlerts
grand_parent: Formats
nav_order: 3
toc: 1
tags:
    - reference
    - metalerts
summary: >
    Description of the GeoJSON format used in metalerts/2.0
---

## Overview

The output is a normal GeoJSON FeatureCollection, with each alert as an item
in the `Features` array.

Each feature (alert) has three main parts:

- geometry: either a Polygon or a MultiPolygon, describing the geographical extent covered
- properties: various information pertaining to the alert, see below
- when: time interval when the alert is valid

## Properties

All the fields have been extracted from the CAP files unchanged unless noted. For more detail, see the [CAP v1](.//CAP-v1-profile) and [v2 profile](.//CAP-v2-profile) docs. All properties indicated in **bold** should always be present; most of the others are usually not available in CAP v1.

|Property|Description|
|--------|-----------|
|**altitude_above_sea_level**|lower boundary height over mean sea level (WGS84 geoid), in meters †|
|**area**|general name for the geographical area affected (same as `areaDesc` in CAP)|
|**awareness_level**|awareness level, including color|
|**awarenessResponse**|text describing recommended action/awareness (dependent on severity/certainty)|
|awarenessSeriousness|Text describing seriousness of the situation (dependent on severity/certainty)|
|**awareness_type**|type of phenomena, according the Meteoalarm classification|
|**ceiling_above_sea_level**|lower boundary height over the WGS84 geoid, in meters †|
|**certainty**|one of "Observed", "Likely" or "Possible"|
|consequences|consequences of the forecasted weather (related to instructions)|
|**contact**|URL to a contact information|
|**county**|an array of county codes (fylkesnr) ‡|
|**description**|an extended human readable description of the hazard or event|
|eventAwarenessName|Name given severity, certainty and eventType|
|eventEndingTime|the expected end time of the subject event in the alert message|
|**event**|types of phenomena, see `eventCode` in the [CAP v2 profile](.//CAP-v2-profile) for a complete list|
|**geographicDomain**|area affected, either "land" or "marine"|
|**id**|the CAP id of the alert (same as `identifier` in CAP)|
|**instruction**|recommended actions|
|municipality|an array of municipality codes (kommunenr) ‡|
|**resources**|additional files available for download, see below|
|**riskMatrixColor** §|a combinationan of `severity` and `certainty`, either Green", ‘Yellow", "Orange" or ‘Red"|
|**severity**|"Extreme", "Severe", "Moderate" or "Minor"|
|**status**|"Actual" or "Test", indicating if the alert is real or just dummy data|
|**title**|Short summary of the entire message, giving info about eventType, awareness_level (color), area and valid time (same as `headline` in CAP)|
|triggerLevel|observed weather will exceed the value specified here during? the indicated time period and area.|
|**type**|either "Alert" (for new alerts) or "Update" (for replacing existing alerts)|
|**web**|link to additional or reference information regarding this alert|

† Note that this is different from CAP, where the altitude and ceiling is in feet<br>
‡ Same as `administrativeId` and `MunicipalityId` in CAP, but formatted for clarity. Only applicable for geographicDomain "land"<br>
§ Only present in CAP v2 profile

Additional properties may be added in the future without further notice.

### Resources

The `resources` field links to various external documents with additional data.
There will always be a resource named "CAP file" which links to the original data.
Other possible resources include maps and other graphics.

|Property|Description|
|--------|-----------|
|description|caption describing the content of the external resource|
|mimeType|"application/xml" for CAP, usually "image/png" for others|
|uri|link to resource|

## Example output

```
{
  "type": "FeatureCollection"
  "lang": "no",
  "lastChange": "2024-03-05T14:08:36+00:00",
  "features": [
    {
      "geometry": {
        "coordinates": [
          [
            [ 6.3025, 58.2 ],
            [ 6.4088, 58.3058 ],
            [ 6.3185, 58.3302 ],
            [ 6.2137, 58.3592 ],
            [ 6.0827, 58.3988 ],
            [ 5.9707, 58.4442 ],
            [ 5.8422, 58.4987 ],
            [ 5.6927, 58.5687 ],
            [ 5.5955, 58.6587 ],
            [ 5.5248, 58.6458 ],
            [ 5.632, 58.5455 ],
            [ 5.633, 58.5447 ],
            [ 5.635, 58.5432 ],
            [ 5.6767, 58.5157 ],
            [ 5.6777, 58.5152 ],
            [ 5.8387, 58.4185 ],
            [ 5.8398, 58.4178 ],
            [ 5.8508, 58.4118 ],
            [ 5.8527, 58.411 ],
            [ 6.0673, 58.3112 ],
            [ 6.3025, 58.2 ],
            [ 6.3025, 58.2 ]
          ]
        ],
        "type": "Polygon"
      },
      "properties": {
        "altitude_above_sea_level": "0",
        "area": "Åna-Sira - Obrestad",
        "awarenessResponse": "Følg med",
        "awarenessSeriousness": "Utfordrende situasjon",
        "awareness_level": "2; yellow; Moderate",
        "awareness_type": "1; Wind",
        "ceiling_above_sea_level": "900",
        "certainty": "Observed",
        "consequences": "Sjøen bygger seg opp og det kan være farlig å være ute i småbåt Grov sjø og hvitt skum fra bølgetopper som brekker. ",
        "contact": "https://www.met.no/kontakt-oss",
        "county": [],
        "description": " I dag, tirsdag, fortsatt øst og sørøst stiv kuling 15 m/s, minkende i ettermiddag.",
        "event": "gale",
        "eventAwarenessName": "Kuling",
        "eventEndingTime": "2024-03-05T15:00:00+00:00",
        "geographicDomain": "marine",
        "id": "2.49.0.1.578.0.20240305051538.094",
        "instruction": "Vurder å la båten ligge. ",
        "resources": [
          {
            "description": "CAP file",
            "mimeType": "application/xml",
            "uri": "http://localhost:3000/weatherapi/metalerts/2.0/current?cap=2.49.0.1.578.0.20240305051538.094"
          }
        ],
        "riskMatrixColor": "Yellow",
        "severity": "Moderate",
        "status": "Actual",
        "title": "Kuling, gult nivå, Åna-Sira - Obrestad, 2024-03-04T17:00:00+00:00, 2024-03-05T15:00:00+00:00",
        "triggerLevel": "13.9m/s",
        "type": "Update",
        "web": "https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/kuling-stormvarsel-for-kyst-og-naere-fiskebanker"
      },
      "type": "Feature",
      "when": {
        "interval": [
          "2024-03-04T17:00:00+00:00",
          "2024-03-05T15:00:00+00:00"
        ]
      }
    }
  ],
}
```

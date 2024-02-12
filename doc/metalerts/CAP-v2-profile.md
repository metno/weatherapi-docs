---
title: CAP v.2 Profile
date: 2023-11-27
author: Helen Korsmo
state: draft
layout: page
parent: MetAlerts
grand_parent: Formats
nav_order: 1
toc: 1
tags:
    - reference
    - metalerts
summary: >
    Description of the CAP profile used in metalerts/2.0
---

This document describes the variant of the XML format known as the **Common Alerting Protocol**, used in MetAlerts XML version 2.0.
The profile is fully [OASIS CAP 1.2](http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html) compatible.
It it also compliant with the [MetCoOp CAP profile](https://git.smhi.se/metcoop/metcoop-cap-profile/blob/master/metcoop-cap-profile.md)
defined together by SMHI, FMI and MET Norway.

Time formats for the `<sent>`, `<effective>`, `<onset>` and `<expires>` elements follows the OASIS CAP 1.2/ISO 8601 standard.

## CAP Elements

Following defines how each element is used in the profile.

### \<alert\>
Parent: none<br>
OASIS: Mandatory

One alert message, specifying CAP OASIS standard with XML namespace.
The `<alert>` segment contains one individual warning for one area. For the same warning in different
languages different `<info>` segments have to be specified.

CAP warnings from MET contain one Norwegian and one English info block.
The following elements are identical in the info blocks for both languages:

- `<onset>`
- `<expires>`
- `<severity>`
- `<urgency>`
- `<certainty>`

Some elements, like `<description>` and `<event>` are language dependent.

### \<identifier\>
Parent: alert<br>
OASIS: Mandatory

Unique string, in time and space, for an alert message identifying the message/document.
MET constructs the identifier the following way:

    WMO organisation ID.YYYYMMDDHHMMSS.WARNINGID

- WMO organization ID for CAP alerts issued by MET Norway is "2.49.0.1.578.0"
- "YYYYMMDDHHMMSS" is the UTC time of issue.
- "WARNINGID" is an internal identifier

#### Example
    <identifier>2.49.0.1.578.0.20230724084526.007</identifier>

The identifier should not be used to convey/extract information about the message except the identity of the message.

### \<sender\>
Parent: alert<br>
OASIS: Mandatory

The identifier of the sender of the alert message. The email address from the organisation with a public contact for emergency situations

#### Example
    <sender>meteorologi@met.no</sender>

### \<sent\>
Parent: alert<br>
OASIS: Mandatory

The time the message was produced (UTC).
Follows  the ISO 8601 standard

#### Example
    <sent>2023-07-16T09:49:16+00:00</sent>

### \<status\>
Parent: alert<br>
OASIS: Mandatory

`Actual` for real messages, `Test` for test messages.

### \<msgType\>
Parent: alert<br>
OASIS: Mandatory

`Alert` for a new message, `Update` to update one or more messages,  `Cancel` to cancel one or more messages.
`Update` and `Cancel` must always include a reference element, denoting which messages are updated/cancellled.

### \<source\>
Parent: alert<br>
Not used

### \<scope\>
Parent: alert<br>
OASIS: Mandatory

Always `Public`

### \<restriction\>
Parent: alert<br>
Not used

### \<code\>
Parent: alert<br>
OASIS: Optional<br>
MetCoOp: Mandatory

Identifies the message as following MetCoOP CAP Standard, versioned.

Format: Link to the versioned specification document starting with profile:cap:.
Profile specification is maintained in the [MetCoOp Git repository](https://git.smhi.se/metcoop/metcoop-cap-profile).

#### Example
    <code>profile:cap:https://git.smhi.se/metcoop/metcoop-cap-profile/blob/version-1.0/metcoop-cap-profile.md</code>

### \<note\>
Parent: alert<br>
Not used

### \<references\>
Parent: alert<br>
OASIS: Mandatory for Update and Cancel messages.
Not allowed for msgType Alert.

The extended message identifier(s) (in the form sender,identifier,sent) of
an earlier CAP message or messages referenced by this one.

UPDATE and CANCEL msgTypes refers to all previous still valid messages that it updates (excluding already expired messages).

#### Example
    <references>
    urn:oid:2.49.0.0.578.0,2.49.0.1.578.0.20230707073744.015,2023-07-07T07:41:23+00:00 urn:oid:2.49.0.0.578.0,2.49.0.1.578.0.20230630062115.065,2023-06-30T06:24:06+00:00 urn:oid:2.49.0.0.578.0,2.49.0.1.578.0.20230621114131.059,2023-06-21T11:41:45+00:00 urn:oid:2.49.0.0.578.0,2.49.0.1.578.0.20230621103238.011,2023-06-21T10:33:11+00:00 urn:oid:2.49.0.0.578.0,2.49.0.1.578.0.20230621075106.074,2023-06-21T07:51:19+00:00 urn:oid:2.49.0.0.578.0,2.49.0.1.578.0.20230615123705.088,2023-06-21T07:18:03+00:00
    </references>

### \<incidents\>
Parent: alert<br>
Optional

Used to collate multiple messages referring to different aspects of the same incident.
Used for a spesific weather incident, for example a spesific storm/extreme weather incident.

#### Example
    <incidents>0000050690</incidents>

### \<info\>
Parent: alert<br>
OASIS: Optional<br>
MetCoOp: Mandatory

Only a single info container pr. language. So, if multiple info containers, it is exact same information translated into multiple languages.
Each info container gives a warning for one area in one language.

### \<language\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

Language for this info-element.  MET uses `no` and `en-GB`

#### Example
    <language>no</language>

### \<category\>
Parent: info<br>
OASIS: Mandatory

MET always use `Met`.
Other categories are used as appropriate

#### Example
    <category>Met</category>
    <category>Fire</category>

### \<event\>
Parent: info<br>
OASIS: Mandatory

Text denoting type of event

MET are currently (July 2023) using the following events (11 in total):

|   Norwegian | English |
| ----------  | --------|
| Vindkast | Wind gust  |
| Kuling | Gale |
| Regn | Rain |
| Snø | Snow |
| Styrtregn| Rain flood|
| Snøfokk| Blowing snow |
|  Vannstand langs kysten og i fjordene| Water level at the coast and in the fjords |
| Polart lavtrykk| Polar low  |
| Skogbrannfare| Forest fire danger  |
| Ising| Icing  |
| Mye lyn| Lightning   |
| Is | Ice |

### \<responseType\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

MET use `Monitor`, except when downgrading warnings. In this case `AllClear` is used with msgType `Update`.
`Cancel` message have responseType `None`

### \<Urgency\>
Parent: info<br>
OASIS: Mandatory

MET normally use `Future`

### \<Severity\>
Parent: info<br>
OASIS: Mandatory

`Extreme`, `Severe`, `Moderate` or `Minor`.
Minor is only used for downgrade and Cancel warnings.

### \<Certainty\>
Parent: info<br>
OASIS: Mandatory

One of `Observed`,`Likely` or `Possible`


### \<audience\>
Parent: info<br>
Not used

### \<eventCode\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Optional<br>
MET/NVE: Mandatory `eventCode` with valueName `eventType`<br>
MET: Mandatory `eventCode` with valueName `OET:v1.0``

MET uses the following values for eventType:
- wind
- gale
- rain
- snow
- ice
- rainFlood
- blowingSnow
- stormSurge
- polarLow
- forestFire
- icing
- lightning

The values for the OET:v1.0 is as defined in the [OASIS eventCode
list](https://docs.oasis-open.org/emergency/etl/v1.0/etl-v1.0.html).

#### Example
    <eventCode>
        <valueName>eventType</valueName>
        <value>rainFlood</value>
    </eventCode>
    <eventCode>
        <valueName>OET:v1.0</valueName>
        <value>OET-080</value>
    </eventCode>

### \<effective\>
Parent: info<br>
MET/NVE: Optional<br>
MET: Not used

### \<onset\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

The expected time of the beginning of the subject event of the alert message

### \<expires\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Optional<br>
MET/NVE: Mandatory

The alert is valid until expired or cancelled, NOT denoting the time when the weather is getting better.

### \<senderName\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

The human-readable name of the agency or authority issuing this alert.

Meteorologisk Institutt/MET Norway

#### Example
    <senderName>Meteorologisk Institutt</senderName>

### \<headline\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

Short summary of the entire message, giving info about event type, awareness level (color) , area and valid time.

#### Example
    <headline>
       Forest fire danger, yellow level, Parts of Troms and Nordland, 2023-07-28T00:00:00+00:00, 2023-08-06T00:00:00+00:00
    </headline>

### \<description\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

An extended human readable description of the hazard or event that occasioned this message.

#### Example
    <description>Local forest fire danger until significant precipitation</description>

### \<instruction\>
OASIS: Optional
MetCoOp: Optional
MET/NVE: Mandatory

Recommended actions

#### Example
    <instruction>Be careful with open fire. Follow the instructions from the local authorities. Emergency services should assess a necessary level of alertness. </instruction>

### \<web\>
OASIS: Optional
MetCoOp: Mandatory

Link to additional or reference information regarding this alert

#### Example
    <web>https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/styrtregn</web>

### \<contact\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

Url to a contact information.

#### Example
    <contact>https://www.met.no/kontakt-oss</contact>

### \<parameter\>
Parent: info<br>
OASIS: Optional

MetCoOp: The following parameter is mandatory:
- **riskMatrixcolor** Value of the risk matrix color, value one of('Green', 'Yellow','Orange', 'Red').

MET/NVE: The following parameters are mandatory:
- **consequences:** Consequences of the forecasted weather (related to instructions)
- **awarenessResponse:** Text describing recommended action/awareness (dependent on severity/certainty)
- **awarenessSeriousness:** Text describing seriousness f the situation (dependent on severity/certainty)
- **eventAwarenessName:** Name given severity, certainty and eventType
- **awareness_level:** Awareness level, including color. Used by Meteoalarm
- **awareness_type:** Type of phenomena, according the Meteoalarm classification


MET/NVE: The following parameters are mandatory in some circumstamces:
- **incidentName:** Name of the weather incident (Only used for extreme weather alerts)
- **evendEndingTime:** The expected end time of the subject event in the alert message. This is the time at
which the hazard conditions of the subject event are no longer expected. This is the counterpart to the
`<onset>` element.
- **administrativeId:** Administrative areas affected by the warning - denoted as `county:county-code` for example `county:54`. This means that all or parts of this county is inside the polygon in the area-element.
- **MunicipalityId:** Ids of Norwegian municipalities affected by the warning.

[Norwegian counties and municipalities](https://www.kartverket.no/til-lands/fakta-om-norge/norske-fylke-og-kommunar)

MET/NVE: The following parameters are optional:

- **geographicDomain:** Type of area (marine, land)
- **triggerLevel:** Observed weather will exceed the value specified here during? the indicated time period and area.

Additional parameters may be used.

#### Examples

Forest-fire danger, no eventEndingTime, since the end time is uknown.

    <parameter>
        <valueName>consequences</valueName>
        <value>Vegetation is very easily ignited and very large areas may be affected. </value>
    </parameter>
    <parameter>
        <valueName>eventAwarenessName</valueName>
        <value>High forest fire danger</value>
    </parameter>
    <parameter>
        <valueName>awareness_level</valueName>
        <value>3; orange; Severe</value>
    </parameter>
    <parameter>
        <valueName>riskMatrixColor</valueName>
        <value>Orange</value>
    </parameter>
    <parameter>
        <valueName>awarenessSeriousness</valueName>
        <value>Severe situation</value>
    </parameter>
    <parameter>
        <valueName>awareness_type</valueName>
        <value>8; forest-fire</value>
    </parameter>
    <parameter>
        <valueName>awarenessResponse</valueName>
        <value>Be prepared</value>
    </parameter>
    <parameter>
        <valueName>geographicDomain</valueName>
        <value>land</value>
    </parameter>
    <parameter>
        <valueName>administrativeId</valueName>
        <value>county:46</value>
    </parameter>
    <parameter>
        <valueName>MunicipalityId</valueName>
        <value>4601;4602;4611;4612;4613;4614;4615;4616;4617;4618;4619;4620;4621;4622;4623;4624;4625;4626;4627;4628;4629;4630;4631;4632;4633;4634;4635;4636;4637;4638;4639;4640;4641;4642;4643;4644;4645;4646;4647;4648;4649;4650;4651</value>
    </parameter>

Extreme weather Gyda, expected to end at January 13th 2022.

    <parameter>
        <valueName>eventEndingTime</valueName>
        <value>2022-01-13T20:00:00+00:00</value>
    </parameter>
    <parameter>
        <valueName>consequences</valueName>
        <value>Risk of flooding of low-lying densely populated areas. Check varsom.no for more information. Locally difficult driving conditions, especially at waterways. Roads can be closed. Many journeys will have longer travel time. Road conditions affected with road spray and hydroplaning in a few places. Some places may temporarily lose the road connection, often several days. Buildings and structures can collapse as a result of the rainfall. Danger to life in fast flowing/deep water. Danger of long power outages. </value>
    </parameter>
    <parameter>
        <valueName>eventAwarenessName</valueName>
        <value>Extremely heavy rain ongoing</value>
    </parameter>
    <parameter>
        <valueName>awareness_level</valueName>
        <value>4; red; Extreme</value>
    </parameter>
    <parameter>
        <valueName>riskMatrixColor</valueName>
        <value>Red</value>
    </parameter>
    <parameter>
        <valueName>awarenessSeriousness</valueName>
        <value>Extreme situation</value>
    </parameter>
    <parameter>
        <valueName>awareness_type</valueName>
        <value>10; rain</value>
    </parameter>
    <parameter>
        <valueName>triggerLevel</valueName>
        <value>20 mm/12t</value>
    </parameter>
    <parameter>
        <valueName>awarenessResponse</valueName>
        <value>Take action</value>
    </parameter>
    <parameter>
        <valueName>incidentName</valueName>
        <value>Gyda</value>
    </parameter>
    <parameter>
        <valueName>geographicDomain</valueName>
        <value>land</value>
    </parameter>
    parameter>
        <valueName>administrativeId</valueName>
        <value>county:46</value>
    </parameter>
    <parameter>
        <valueName>MunicipalityId</valueName>
        <value>4601;4602;4611;4612;4613;4614;4615;4616;4617;4618;4619;4620;4621;4622;4623;4624;4625;4626;4627;4628;4629;4630;4631;4632;4633;4634;4635;4636;4637;4638;4639;4640;4641;4642;4643;4644;4645;4646;4647;4648;4649;4650;4651</value>
    </parameter>

### \<resource\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Optional<br>
MET/NVE: Optional

Refers to an additional file with supplemental information related to this
`<info>`element; e.g., an image or audio file.
At MET this is typically used to link to a png file with an illustration of the warning (often a map of the affected area).

### \<resourceDesc\>
Parent: resource<br>
OASIS: Required in the `<resource>`  element

Text describing the resource

### \<mimeType\>
Parent: resource<br>
OASIS: Required in the `<resource>`  element

MIME content type and subtype of the resource

### \<uri\>
Parent: resource<br>
OASIS: Required in the `<resource>`  element

Hyperlink to the resource file

#### Example of the resource element

    <resource>
        <resourceDesc>Kart over Stor skogbrannfare, oransje niv�, Deler av Troms, 2023-07-31T09:00:00+00:00, 2023-08-21T22:00:00+00:00</resourceDesc>
        <mimeType>image/png</mimeType>
        <uri>https://slaps.met.no/cap-images/1ddf98a8-4df1-40dd-bace-5a7ec720d529.png</uri>
    </resource>

### \<area\>
Parent: info<br>
OASIS: Optional<br>
MetCoOp: Mandatory

The `<area>` segment describes a geographic area to which the `<info>` segment
in which it appears applies. MET uses only one area block for each info block and an altitude or altitude range, expressed in standard
latitude/longitude/altitude terms in accordance with a specified geospatial datum.

### \<areaDesc\>
Parent: area<br>
OASIS: Mandatory

Text describing the area

### \<polygon\>
Parent: area<br>
OASIS: Optional
MetCoOp: Mandatory

The paired values of points defining a polygon that delineates the affected area of the alert message.

1. Code Values: The geographic polygon is represented by a whitespace-delimited list of WGS 84 coordinate pairs.
2. A minimum of 4 coordinate pairs MUST be present and the first and last pairs of coordinates MUST be the same.
3. Multiple instances MAY occur within an `<area>` block.

Coastlines and country borders should be followed as accurately as possible.
However, polygons may extend country borders although alerts are only valid in
the issuing country.

Resolution of the polygons should be defined conservatively reducing number of
points so that the polygons can be processed in a reasonable time.

###  \<geocode\>
Parent: area<br>
OASIS: Optional<br>
MetCoOp: Optional<br>
MET: not used

### \<circle\>
Parent: area<br>
Not used

### \<altitude\>
Parent: area<br>
Optional

Minimum altitude of the affected area of the alert message (in feet above mean sea level)

### \<ceiling\>
Parent: area<br>
Optional

Maximum altitude of the affected area of the alert message (in feet above mean sea level)

#### Example
    <area>
        <areaDesc>Parts of S-Norway</areaDesc>
        <polygon>
            61.5329,5.24557 60.3308,5.64294 59.2396,6.24904 58.2631,6.33293
            57.9566,7.26079 58.0995,8.37604 58.5239,9.05849 59.0371,9.74866
            59.3151,10.1703 59.6916,10.6379 59.9564,11.0743 60.5819,11.7377
            61.3107,13.0594 61.8388,12.1671 63.0558,12.2677 63.3914,11.4368
            62.7406,9.02713 62.2523,7.11171 62.1304,6.41532 61.8829,5.6736
            61.5329,5.24557 61.5329,5.24557
        </polygon>
        <altitude>0</altitude>
        <ceiling>9000</ceiling>
    </area>

## Implementation notes

UPDATE and CANCEL events follow the [Google Public
Alerts](https://developers.google.com/public-alerts/reference/cap-google) rules.

### Update/Cancel practice as used at MET

msgType `Cancel` is used to abort an alert message containing incorrect data
(that was sent by mistake). Cancel messages will have `responseType=None`,
`severity=Minor` and `expires` one hour after the `sent`/`onset` time.
The `references` element identifies the warning that was sent by mistake.

We also send "AllClear" messages to indicate that the hazard conditions of the
subject event in the referenced warnings are no longer expected. They will have
`responseType=AllClear`, `severity=Minor` and `expires` one hour after the
`sent/onset` time.

The `references` element identifies the downgraded  warning.

## Changes from CAP Profile v.1

Work in progress
{: .note }

### sender

The current

    <sender>noreply@met.no</sender>

will be changed  to

    <sender>meteorologi@met.no</sender>


### code

The current

    <code>CAP-V12.NO.V1.0</code>

will be changed to

    <code>profile:cap:https://git.smhi.se/metcoop/metcoop-cap-profile/blob/version-1.0/metcoop-cap-profile.md</code>.

### references

`<references>`  will  refer to all previous still valid messages that it
updates (excluding already expired messages), rather than just the previous
alert..

### event codes

OET event codes added, according to [OASIS event terms list](https://docs.oasis-open.org/emergency/etl/v1.0/etl-v1.0.html).

#### Example:

    <eventCode>
        <valueName>OET:v1.0</valueName>
        <value>OET-160</value>
    </eventCode>

### category

A CAP-alert can contain several categories instead of just "Met".
For example blowingSnow will have categories "Met" and  "Transport", while
lightning  will have categories "Met", "Health" and "Infra".

### effective

`<effective>` will no longer be used.

### area

We will no longer use the `<geocode>` element.

### parameters

Mandatory `<parameter>` "riskMatrixcolor" now same color as in "awareness_level".

#### Example
    <parameter>
        <valueName>awareness_level</valueName>
        <value>3; orange; Severe</value>
    </parameter>
    <parameter>
        <valueName>riskMatrixColor</valueName>
        <value>Orange</value>
    </parameter>

Counties affected by the warning will be listed in parameter "administrativeId".
This means that all or parts of this county is inside the polygon in the area-element.

#### Example
    <parameter>
        <valueName>administrativeId</valueName>
        <value>county:03</value>
    </parameter>
    <parameter>
        <valueName>administrativeId</valueName>
         <value>county:30</value>
     </parameter>

The parameter MunicipalityId: lists Ids *(kommunenummer)* of Norwegian municipalities affected
by the warning.

#### Example
    <parameter>
        <valueName>MunicipalityId</valueName>
        <value>0301;3001;3002;3003;3004;3005;3006;3007;3011;3012;3013;3014;3015;3016;3017;3018;3019;3020;3021;3022;3023;3024;3025;3026;3027;3028;3029;3030;3031;3032;3033;3034;3035;3036;3037;3038;3039;3040;3041;3042;3043;3044;3045;3046;3047;3048;3049;3050;3051;3052;3053;3054</value>
    </parameter>

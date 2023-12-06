---
title: CAP v.1 Profile
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
    Description of the CAP profile used in metalerts/1.1
---

This document describes the variant of the XML format known as the **Common Alerting Protocol**, used in MetAlerts XML version 1.1.
The profile is fully [OASIS CAP 1.2](http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html) compatible.

## CAP Elements

Following defines how each element is used in the profile.

### \<alert\>
Mandatory, root element

One alert message, specifying CAP OASIS standard with xml namespace.
The `<alert>` segment contains one individual warning for one area. For the same warning in different
languages, different `<info>` segments have to be speciﬁed.

CAP warnings from MET contain one Norwegian and one English info block.
The following elements are identical in the info blocks for both languages:

- `<effective>`
- `<onset>`
- `<expires>`
- `<severity>`
- `<urgency>`
- `<certainty>`

Some elements, like `<description>` and `<event>` are language dependent.

### \<identifier\>
Mandatory, child of `<alert>`

Unique string, in time and space, for an alert message identifying the message/document.
MET constructs the identifier in one of the following ways:

1. WMO​ ​organisation​ ​ID.YYMMDDHHMMSS.​WARNINGID
2. WMO​ ​organisation​ ​ID.YYYYMMDDHHMMSS.​WARNINGID

where

- WMO organization ID for CAP alerts issued by MET Norway is ​2.49.0.1.578.0
- YYYYMMDDHHMMSS​ ​is​ ​the​ ​UTC​ ​time​ ​of​ ​issue.
- WARNINGID​ ​is​ ​an​ ​internal​ ​identifier

#### Example
    <identifier>2.49.0.1.578.0.20230724084526.007</identifier>

The identfier should not be used to convey/extract information about the message except the identity of the message.

### \<sender\>
Mandatory, child of `<alert>`

Email address of sender, `noreply@met.no`.

#### Example
    <sender>noreply@met.no</sender>

### \<sent\>
Mandatory, child of `<alert>`

The time the message was produced (UTC). Follows OASIS standard.

#### Example
    <sent>2023-07-16T09:49:16+00:00</sent>

### \<status\>
Mandatory, child of `<alert>`

`Actual` for real messages, `Test` for test messages.

### \<msgType\>
Mandatory, child of `<alert>`

`Alert` for a new message, `Update` to update one or more messages,  `Cancel`to cancel one or more messages.
`Update` and `Cancel` must always include a reference element, denoting which messages are updated/cancellled.

### \<source\>
Not used, child of `<alert>`

### \<scope\>
Mandatory, child of `<alert>`

Always `Public`

### \<restriction\>
Not used, child of `<alert>`

### \<code\>
Mandatory, child of `<alert>`

Identifies the message as following  MET/NVE CAP-profile

#### Example
    <code>CAP-V12.NO.V1.0</code>

### \<note\>
Not used, child of `<alert>`

### \<references\>
Mandatory for Update and Cancel messages. Not allowed for msgType Alert. Child of `<alert>`

The​ ​extended​ ​message​ ​identifier(s)​ ​(in​ ​the​ ​form​​ ​sender,identifier,sent)​ ​of
an​ ​earlier​ ​CAP​ ​message​ ​or​ ​messages​ ​referenced​ ​by​ ​this​ ​one.

#### Example
    <references>noreply@met.no,2.49.0.1.578.0.20230727070844.041,2023-07-27T07:35:28+00:00</references>

### \<incidents\>
Optional, child of `<alert>`

Used​ ​to​ ​collate​ ​multiple​ ​messages​ ​referring​ ​to​ ​different​ ​aspects​ ​of​ ​the same​ ​incident

Used for a spesific weather incident, for example a spesific storm/extreme weather incident

#### Example
    <incidents>0000050690</incidents>

### \<info\>
Mandatory, child of `<alert>`

Only a single info container pr. language. So, if multiple info containers, it is exact same information translated into multiple languages.
Each info container gives a warning for one area in one language.

### \<language\>
Mandatory, child of `<info>`

Language for this info-element MET uses `no` and `en-GB`.

#### Example
    <language>no</language>

### \<category\>
Mandatory, child of `<info>`

Always `Met` (meaning "meteorological")

#### Example
    <category>Met</category>

### \<event\>
Mandatory, child of `<info>`

Text denoting type of event. MET is currently (July 2023) using the following events (11 in total):

|   Norwegian | English |
| ----------  | --------|
| Vindkast | Vindkast  |
| Kuling | Gale |
| Regn | Rain |
| Snø | Snow |
| Styrtregn| Rain flood|
| Snøfokk| Blowing snow |
| Vannstand langs kysten og i fjordene | Water level at the coast and in the fjords |
| Polart ​lavtrykk| Polar low  |
| Skogbrannfare| Forest fire danger  |
| Ising| Icing  |
| Mye lyn| Lightning   |
| Is | Ice |

### \<responseType\>
Mandatory, child of `<info>`

MET use `Monitor`, except when downgrading warnings. In this case `AllClear` is used with msgType `Update`.
`Cancel` message have responseType `None`

### \<Urgency\>
Mandatory, child of `<info>`

MET normally use `Future`

### \<Severity\>
Mandatory, child of `<info>`

`Extreme`, `Severe`, `Moderate` or `Minor`.
Minor is only used for downgrade and Cancel warnings.

### \<Certainty\>
Mandatory, child of `<info>`

`Observed`,​ ​`Likely` or `Possible`

### \<audience\>
Not used, child of `<info>`

### \<eventCode\>
Mandatory `eventCode` with valueName `eventType`, child of `<info>`

MET uses the following event types:
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

#### Example

    <eventCode>
        <valueName>eventType</valueName>
        <value>rainFlood</value>
    </eventCode>

### \<effective\>
Mandatory, child of `<info>`

The effective time of the information of the alert message.
For messages from MET this is always the same as `<onset>`

### \<onset\>
Mandatory, child of `<info>`

The expected time of the beginning of the subject event of the alert message

### \<expires\>
Mandatory, child of `<info>`

The alert is valid until expired or cancelled, *NOT* denoting the time when the weather is getting better.

### \<senderName\>
Mandatory, child of `<info>`

The human-readable name of the agency or authority issuing this alert (Meteorologisk Institutt/MET Norway).

#### Example

    <senderName>Meteorologisk Institutt</senderName>

### \<headline\>
Mandatory, child of `<info>`

Short summary of the entire message, giving info about event type, awareness level (color) , area and valid time.

#### Example

    <headline>
        Forest fire danger, yellow level, Parts of Troms and Nordland, 2023-07-28T00:00:00+00:00, 2023-08-06T00:00:00+00:00
    </headline>

### \<description\>
Mandatory, child of `<info>`

An extended human readable description of the hazard or event that occasioned this message.

#### Example
    <description>Local forest fire danger until significant precipitation</description>

### \<instruction\>
Mandatory, child of `<info>`

Recommended actions

#### Example
    <instruction>Be careful with open fire. Follow the instructions from the local authorities. Emergency services should assess a necessary level of alertness. </instruction>

### \<web\>
Mandatory, child of `<info>`

Link to additional​ ​or reference​ ​information​ ​regarding​ ​this​ ​alert

#### Example
    <web>https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/styrtregn</web>

### \<contact\>
Mandatory, child of `<info>`

URL to contact information

#### Example
    <contact>https://www.met.no/kontakt-oss</contact>

### \<parameter\>
Mandatory, child of `<info>`

The following parameters are mandatory:
- **awareness_level:** Awareness level, including color. Used by Meteoalarm
- **awareness_type:** Type of phenomena, according the Meteoalarm classification

The following parameters are optional
- **incidentName:** Name of the weather incident (Only used for extreme weather alerts):
- **geographicDomain:** Type of area (marine, land)
- **triggerLevel:** Observed weather will exceed the value specified here​ ​during​ ​the​ ​indicated time period and area.
- **evendEndingTime:** The expected end time of the subject event in the alert message. This is the time at
which the hazard conditions of the subject event are no longer expected. This is the counterpart to the
`<onset>` element.
- **consequences:** Consequences of the forecasted weather (related to instructions)
- **awarenessResponse:** Text describing recommended action/awareness (dependent on severity/certainty)
- **awarenessSeriousness:** Text describing seriousness f the situation (dependent on severity/certainty)
- **eventAwarenessName:** Name given severity, certainty and eventType

Additional parameters may be used.

#### Examples

Forest-fire danger, no eventEndingTime, since the end time is unknown:

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

Extreme weather Gyda, expected to end at January 13th 2022:

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

### \<resource\>
Optional, child of `<info>`

Refers​ ​to​ ​an​ ​additional​ ​file​ ​with​ ​supplemental​ ​information​ ​related​ ​to​ ​this
`<info>`​ ​element;​ ​e.g.,​ ​an​ ​image​ ​or​ ​audio​ ​file.
At MET this is typically used to link to a png file with an illustration of the warning (often a map of the affected area).

### \<resourceDesc\>
Required in the `<resource>` element

Text describing the resource

### \<mimeType\>
Required in the `<resource>` element

MIME content type and subtype of the resource

### \<uri\>
Required in the `<resource>` element

Hyperlink to the resource file

#### Example

    <resource>
        <resourceDesc>Kart over Stor skogbrannfare, oransje nivå, Deler av Troms, 2023-07-31T09:00:00+00:00, 2023-08-21T22:00:00+00:00</resourceDesc>
        <mimeType>image/png</mimeType>
        <uri>https://slaps.met.no/cap-images/1ddf98a8-4df1-40dd-bace-5a7ec720d529.png</uri>
    </resource>

### \<area\>
Mandatory, child of `<info>`

The​ `​<area>`​ ​segment​ ​describes​ ​a​ ​geographic​ ​area​ ​to​ ​which​ ​the​ `​<info>`​ ​segment
in​ ​which​ ​it​ ​appears​ ​applies.​ ​ MET uses only one area block for each info block and​ ​an​ ​altitude​ ​or​ ​altitude​ ​range,​ ​expressed​ ​in​ ​standard
latitude​/​longitude​/​altitude​ ​terms​ ​in​ ​accordance​ ​with​ ​a​ ​specified​ ​geospatial datum.

### \<areaDesc\>
Mandatory, child of `<area>`

Text describing the area

### \<polygon\>
Mandatory, child of `<area>`

The paired values of points defining a polygon that delineates the affected area of the alert message:

1. Code​ ​Values: The​ ​geographic​ ​polygon​ ​is​ ​represented​ ​by​ ​a whitespace-delimited​ ​list​ ​of​ ​WGS​ 84​​ ​coordinate​ ​pairs.​ (See​ ​WGS​ ​84​ ​Note​ ​at end​ ​of​ ​this​ ​section)
2. A​ ​minimum​ ​of​ ​4​ ​coordinate​ ​pairs​ *​MUST​* ​be​ ​present​ ​and​ ​the​ ​first​ ​and​ ​last pairs​ ​of​ ​coordinates​ *​MUST​* ​be​ ​the​ ​same.
3. Multiple​ ​instances​ ​MAY​ ​occur​ ​within​ ​an​ `​<area>`​ ​block.

Coastlines and country borders should be followed as accurately as possible.
However, polygons may extend country borders although alerts are only valid in the issuing country.

Resolution of the polygons should be defined conservatively reducing number of points so that the polygons can be processed in a reasonable time.

### \<geocode\>
Optional, child of `<area>`

Code to describe the norwegian administrative areas affected by the warning, MET use "county" and "MunicipalityID".

### \<circle\>
Not used, child of `<area>`

### \<altitude\>
Optional, child of `<area>`

Minimum altitude of the affected area of the alert message (in feet above mean sea level)

### \<ceiling\>
Optional, child of `<area>`

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
            61.5329,5.24557 61.5329,5.2455
        </polygon>
        <geocode>
            <valueName>county</valueName>
            <value>46</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>11</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>15</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>42</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>38</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>34</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>50</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>03</value>
        </geocode>
        <geocode>
            <valueName>county</valueName>
            <value>30</value>
        </geocode>
        <geocode>
            <valueName>MunicipalityId</valueName>
            <value>
                0301;1108;1111;1112;1114;1122;1133;1134;1135;1506;1525;1539;1563;1577;1578;3005;3006;3007;3020;3022;3023;3024;3025;3029;3030;3031;3032;3033;3034;3035;3036;3037;3038;3039;3040;3041;3042;3043;3044;3045;3046;3047;3048;3049;3050;3051;3052;3053;3054;3403;3405;3407;3411;3412;3413;3414;3419;3420;3421;3422;3423;3424;3425;3426;3427;3428;3429;3430;3431;3432;3433;3434;3435;3436;3437;3438;3439;3440;3441;3442;3443;3446;3447;3448;3449;3450;3451;3452;3453;3454;3802;3803;3804;3805;3806;3807;3808;3812;3813;3814;3815;3816;3817;3818;3819;3820;3821;3822;3823;3824;3825;4201;4202;4203;4204;4205;4206;4207;4211;4212;4213;4214;4215;4216;4217;4218;4219;4220;4221;4222;4223;4224;4225;4226;4227;4228;4602;4611;4617;4618;4619;4620;4621;4622;4623;4624;4628;4629;4630;4631;4634;4635;4637;4638;4639;4640;4641;4642;4643;4644;4645;4646;4647;4648;4649;4650;4651;5021;5022;5025;5026;5027;5028;5032;5033;5034
            </value>
        </geocode>
        <altitude>0</altitude>
        <ceiling>9000</ceiling>
    </area>


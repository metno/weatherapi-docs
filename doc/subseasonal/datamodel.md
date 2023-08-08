---
title: Subseasonal data model
date: 2023-08-08
author: Ivar Ambjørn Seierstad
layout: page
parent: Forecasts
toc: 1
state: draft
tags:
    - reference
    - nowcast
---

## Data sources

The subseasonal service covers Norway, Sweden, Finland and Denmark. The extent
of the domain is shown in the illustration below.

![Nordic region](../assets/nordic.png)

## Variables

{:.note}
The list of variables is currently fluctuating and will not be finalized until
the product is out of beta.

|Name|XML tag|Unit|Description|
|-----|----|------|-----|
|air_temperature_max †|maxTemperature|celsius| maximum air temperature over period |
|air_temperature_min †|minTemperature|celsius| minimum air temperature over period |

More stuff to come...

The variable names are based on the international [CF Standard Name](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html) vocabulary, which is mandatory for all governmental scientific institutions under the EU INSPIRE directive.

---
title: WeatherAPI RSS Feeds
date: 2020-04-17
author: Geir Aalberg
layout: post
---

This describes the use of news feeds for operational changes
on api.met.no.


# Types

## News

News articles are listed on [/weatherapi/news]

## Changelog

Change logs for all products are found in [/weatherapi/changelog]

# Extensions

The RSS 1.0 format does not define more than a few terms, preferring
instead to delegate this issue to external ontologies in different namespaces
like Dublin Core.

Since we have not found any suitable ontology for some metadata, we are
forced to roll our own. These will be using the
`https://api.met.no/weatherapi/doc/RSS` namespace.

## `category`

No simple corresponding term to the RSS 2.0 "category" exists for 1.0,
so we have to define our own. Sadly this means there is no way to filter
on categories directly in off-the-shelf feed readers when using RSS 1.0.

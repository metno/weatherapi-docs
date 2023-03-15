---
title: RSS Feeds
date: 2020-04-17
author: Geir Aalberg
layout: page
parent: Formats
state: draft
tags:
    - guide
summary: >
    How to use RSS feeds from api.met.no
---

## The RSS format

The saga of the different versions of RSS is a long and tragic story,
with no less than 4 (Atom included) common, competing formats in use
today. Luckily most clients support them all, so normal users should
not need to worry.

Currently we use the following versions in WeatherAPI:

- [RSS 1.0](http://www.zvon.org/xxl/RSSreference/Output/) - used by our news and changelog feeds
- [RSS 2.0](https://cyber.harvard.edu/rss/rss.html) - used by the MetAlerts service

## RSS clients

RSS is normally not parsed manually, but using a software client of which there are many.
My personal favourite is [NewsBlur](https://www.newsblur.com/), but you can find
many others on the app stores for different platforms.


## Extensions

The RSS 1.0 format does not define more than a few terms, preferring
instead to delegate this issue to external ontologies in different namespaces
like Dublin Core.

Since we have not found any suitable ontology for some metadata, we are
forced to roll our own. These will be using the
`https://api.met.no/doc/RSS` namespace.

### `category`

No simple corresponding term to the RSS 2.0 "category" exists for 1.0,
so we have to define our own. Sadly this means there is no way to filter
on categories directly in off-the-shelf feed readers when using RSS 1.0.

---
title: Service disruptions, revised Terms of Service
date: 2026-11-05
author: Geir Aalberg
layout: post
tags:
    - locationforecast
    - oceanforecast
    - nowcast
    - ncagalewarnings
    - TOS
---

Disruption of service, 4-5 Nov
------------------------------

Yesterday, on 4 Nov around 06 UTC we started noticing problems with our
Locationforecast service, after several reports from users (some including very
helpful technical details). This manifested itself as a large amount of `502 Bad
Gateway` and `503 Server Error` status codes, but also a lot of `200 OK` responses
with truncated data when using chunked transfer encoding from the
Locationforecast backends. Unfortunately the latter got cached by Varnish, resulting
in persistent invalid JSON and XML for many locations even though most of the
traffic was fine.

It did not help that the problem seemed to be specific only to servers in one
of our data centers, not that an influx of TCP errors initially led us to
suspect infrastructure or network malfunctions. AI wasn't of much help either,
blaming the HTTP useragent in the API framework. Finally, 3 out of 4 team
members were on the road on various work assignments, leaving only Lars with
access to the servers, trying to troubleshoot while simultaneously cat-herding
electricians rummaging around the wiring at his home.

In the end the problem was finally pinpointed to a buggy release of HAproxy,
installed via an unattended upgrade from Ubuntu while most of us were asleep.
Once discovered, the problem was quickly fixed this morning by upgrading to
HAproxy 3.0 from PPA.

> After upgrading from .2 to .3, a large share (roughly 50-70%) of requests
> through HAProxy started failing with HTTP 502. It affected every HTTP/1.1
> backend that sends chunked responses (Apache/PHP, Node.js, and a git smart-HTTP
> server in our case). The backends themselves were unchanged and healthy.
> Downgrading to 2.4.30-0ubuntu0.22.04.2 fixed it immediately.

<https://bugs.launchpad.net/ubuntu/+source/haproxy/+bug/2172897>

We are very sorry for the disruptions, but this time the blame lies outside our
control. It seems many HomeAssistant users woke up to very cold homes this
morning; may we suggest implementing more graceful fallbacks in case of failure
to download weather forecasts from the Internet.

Revised Terms of Service
------------------------

In the last weeks we have received a minor flood of lengthy AI-generated tickets,
outlining in great detail their planned implementations and asking us to
"confirm" they are within our Terms of Service. Unfortunately we don't have the
manpower to answer such enquieries from developers who don't read the
documentation and rely on AI to do the work, so such requests will only get a
canned response linking to our FAQ and documentation.

However, from the correspondence (as such) it has become clear that our Terms
of Service were inconsistent with regards to how long data should be cached on
the client side. We have therefore added some clarifications to the TOS, stating
that the response cache headers should be followed as an absolute minimum, but
that the various services might have other requirements. These clarifications
are indicated with "new" or "changed" labels in the TOS:

<https://docs.api.met.no/doc/TermsOfService.html>

Furthermore, for Locationforecast the caching rules have been updated as follows:

- For locations in the Nordic region: Minimum 30 mins caching time
- For the rest of the world: Minimum 3 hours caching time

<https://docs.api.met.no/doc/locationforecast/FAQ>
<https://api.met.no/weatherapi/locationforecast/2.0/documentation>

These TOS changes are effective immediately, however caching rules for other
products may be revised continuously in the near future, and might only be
announced in the product changelogs:

<https://api.met.no/changelog> <br>
<https://api.met.no/changelog.rss>

"Feels like" temperature added
------------------------------
In September, a new parameter 'apparent_air_temperature' was added to
Locationforecast and Nowcast. This means you no longer have to calculate this
yourself, as described in the Locationforecast FAQ:

<https://docs.api.met.no/doc/locationforecast/FAQ.html#q-how-can-i-calculate-the-apparent-feels-like-temperature-as-used-on-yr>

Termination of MOX format for Oceanforecast
-------------------------------------------

Over 5 years ago, when Oceanforecast 2.0 was released we issued a warning that
the MOX XML format was being deprecated and would be removed soon. As we still
are seeing some traffic using this format we strongly urge users to migrate
from XML to JSON ASAP as this time we might actually mean it.

In other news...
-----------------

- New product NCAgalewarnings added in April
- New areas "svalbard" and "scandinavia" added to gribfiles in March

Also, we have made some changes to the /locations endpoint for all API services.
`title` has been renamed `name` and `id` moved from `properties` to the
root feature level. For compatibility reasons they will remain duplicated in the
old places for some time (at least until Easter 2027). If you rely on parsing
these data (looking at you, NLA), please update your systems to use the new
fields in the next months.

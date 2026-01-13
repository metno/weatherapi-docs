---
title: Textforecast 3.0 officially released
date: 2025-03-12
author: Geir Aalberg
layout: post
tags:
    - textforecast
---

After a long development time, all textforecast products have finally been
ported to GeoJSON. Version 3.0 is now officially out of beta, including some
minor corrections in the "lastChange" format to make it ISO 8601 compatible. The
old XML version will continue to work until further notice.

<https://api.met.no/weatherapi/textforecast/3.0/documentation>

Also, starting on 1 April, the "landoverview" text forecast will be shortened
from 3 days ahead to 2 days ahead. More precisely the 00 and 06 terms will
contain days 0 and 1, whereas the 12 and 18 terms will include days 0 to 2. This
was announced on the website in December, but continued delays in the 3.0 launch
meant that email notification wasn't sent out earlier. We apologise for the
inconvenience.

---
title: Sunrise 3.0 FAQ
date: 2023-08-02
author: Geir Aalberg
layout: page
parent: Sunrise
grand_parent: Forecasts
toc: 1
tags:
    - faq
    - sunrise
---

## Astronomical calculations

### Q. The values seem to differ by 1 minute compared to similar services. Why is that?

A. The 1 minute difference may actually be as little as 1 second in the
computations, but magnified when rounded up/down to the nearest whole minute
(we discussed returning seconds in timestamps, but as we feel the algorithms
aren't precise enough it's better to round off).

## Data format

### Q. Do you plan to add an option to request moon data for several days?

A. We have decided to return only one day per request, both to optimize
caching but also keep the response time as low as possible. Since the
calculations are quite CPU intensive, a 7-day forecast might cause
unacceptably high response times and impact other services on the API. This
is also why the sun and moon events are separate requests, as many don't need
the latter and it's a waste of resources.


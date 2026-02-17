---
title: More about MetAlerts + removal of Verticalprofile
date: 2024-04-19
author: Geir Aalberg
layout: post
tags:
    - metalerts
    - verticalprofile
---

As promised, here are some more details about the new version 2.0 of MetAlerts,
which will be officially launched on **7 May 2024**. At the same time we will be
deprecating version 1.1, which is planned EOL on 2 Sept.

As mentioned the new version is using a new CAP profile (v2), which means more
data in the GeojSON feed. Since all previous CAP and GeoJSON alerts in the
archive are using profile v1, these are not so good for development and testing
until the archive is populated with v2 profiles some time next year.

To compensate, we have added an `/example` endpoint which works just like the
others, except that the alerts will remain in effect for the next 10 years.
Currently the event types `forestFire`, `blowingSnow`, `rainFlood`, `lightning` and
`rainFlood` are supported, more will be added later.

We must also stress the importance of handling **redirects** correctly! This is
mandatory for the whole API, but we will shortly (starting next week) be serving
most CAP files with a redirect to our object store, so make sure your systems
are compatible before 7 May.

Moving on, the **Verticalprofile** product will be terminated on 31 May 2024. This
is mainly being used by our Halo site (for the public service sector), but as
this is being replaced by Værio it is no longer needed. If you are a current
user, please contact us and describe your requirements for an eventual
replacement.

Finally, we would like to apologize for the intermittent service disruptions on
10 April between 14 and 16 UTC, which was caused by a malfunctioning spine
switch causing one of the file servers to be unresponsive. We're not sure if
this was noticable for external users, but the graphs show some dropouts.

---
title: Migration completed
date: 2018-02-26
author: Geir Aalberg
layout: post
---

As most of you probably have noticed, we upgraded api.met.no about A
week ago to the new version. After some initial performance problems we
managed to tune the caches so it is now handling traffic well.

Some users have reported problems accessing the API, mostly related to
not handling HTTPS and/or redirects. If you are getting *"Failed to get
data from weather api. Reason: end tag name `</body>` must match start tag
name `<hr>` from line 5"* this means you are trying to parse the HTML
message as XML instead of following the 301 redirect. We are also
working on recommendations for users using HTTPS via local proxies.

In order to ensure stability of our own services, we have also
introduced traffic rate limiting (and in some extreme cases, blocking)
for some users not abiding by our [terms of use]. If you are
receiving 429 status codes it means you are being throttled, either due
to a missing/generic User-Agent header and/or excessive traffic
(>20r/s).

Finally, we have noticed there is a lot of production traffic against
beta.api.met.no (which was only to be used for testing) as well as
api.yr.no (which has been deprecated for years). We would like to inform
you that these hostnames will be removed within a few months, so please
update your applications accordingly.

[terms of use]: /conditions_service.html

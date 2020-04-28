---
title: Migration of api.met.no
date: 2017-12-12
author: Geir Aalberg
layout: post
---

As previously mentioned on the mailing list, we will shortly be migrating
the api.met.no domain to version 3. This has already been done for some users
and should be relatively painless, provided you follow the [documentation]
and [terms of use]. In particular we ask you to notice the following:

- Use HTTPS only! Unencrypted requests are no longer supported
- Honor redirects (301 and 303), which is used e.g. from HTTP to HTTPS
- Semicolon as parameter separator is now deprecated, use ampersand instead
- Make sure you have a unique, identifiable User-Agent string


Otherwise the main difference is a lot of new features and bugs that have been fixed.
For more information on the changes to the interface, please see the [release notes] for version 3.

The migration is scheduled to take place some time during the first half of January 2018.

[documentation]: /weatherapi/documentation
[terms of use]: /conditions_service.html
[release notes]: /weatherapi/doc/v3relnotes

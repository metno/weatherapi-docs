---
title: Product versions
date: 2020-06-26
author: Geir Aalberg
layout: page
toc: 1
state: draft
tags:
    - reference
summary: >
    Explanation of how the version numbers and deprecation works
---


We recommend reading the section about error handling.

Since a product can change its API, there is a version number as part of every
product URL. If you try to use a product version which is deprecated, you will
get the data you expect, but with the HTTP status code 203 Non-Authoritative
Information. It is important for client software to accept 203-responses, but
you should implement appropriate checks or alarms on the return codes.

After a period of being deprecated, versions will be end-of-lifed. When this
happens, asking for these versions will be treated as an error, as described in
the section about errors. See the changelog for each particular product to find
information about the end-of-life date for a deprecated version.

The purpose of the version number scheme is to provide a stable interface for
devices and software to use, since we are able to handle the changes we can't
avoid making in a graceful manner. The goal is not to change the interface often
or indeed at all.

For information regarding API updates, changes to our terms of service, and
other important notifications, please sign up for our [developer mailing list](./support).


## FAQ

### What's the deal with the versions? Isn't this a stable interface?

The purpose of the API is to present a stable machine-to-machine interface.
Nevertheless, we sometimes find shortcomings or even errors in our products, and
the versions are intended to let us fix such problems without breaking
compatibility

With the versions, we can introduce version 1.1 of a product without removing or
breaking version 1.0; instead, we can have a transitional period where both
work, and our users can update their client software in their own good time.
Versions will only be deprecated after our users have had time to update their
client software.

Adding elements/nodes to a JSON or XML format is generally considered as a
compatible change so we will not introduce new versions for this.

### Why isn't there any last version?

We only change the version number when there are changes in the interface, which
means that you probably need to change your code anyway. That said, you can access
parts of the service (e.g. documentation) without knowing the version number, by
using an underscore ("_") instead of the number.

### Will the version number change frequently?

No, we try to keep the API as stable as possible. Also new versions will be
announced on the mailing list.

All versions will be deprecated, but still working, for some period of time
after an upgrade. Details about this are given in the documentation for each
product.

### How to check for new versions?

Check your status codes!

The returned status code for the products will let you know if you aren't using
the supported one by returning a `203 Non-authorative` header.
Read the [documentation](./StatusCodes) for further details.

You can also keep yourself up to date on new versions by following our
[mailing list or RSS feed](./support).

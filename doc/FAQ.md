---
title: Frequently Asked Questions
date: 2020-04-15
author: Geir Aalberg
layout: page
parent: General
nav_order: 90
toc: 1
#state: draft
tags:
    - faq
summary: >
    A summary of repeatedly asked questions from the support helpdesk
---

{: .note }
For specific questions about Locationforecast, see the [Locationforecast FAQ](./locationforecast/FAQ).

<details markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Use of AI tools &#x1F195;

### I can't be bothered to read documentation. Can I use AI to contact you so that you can explain the Terms of Service to it?

**Absolutely not!** We get several such requests each day and don't have resources
to spare so that you can save time by not reading the documentation. Our [Terms of Service](./TermsOfService)
is a legally binding agreement which you as a developer must accept in order to
use our services; this process can't be delegated to an AI (although it might be
useful in navigating through the documentation).

### I still want to explore using an AI to talk to your services

We are currently experimenting with an MCP service which allows AI agents to
discover some of our APIs in a machine-readable manner. If someone has valuable
experience in this field we might be open to allowing limited beta-testing.
If you feel qualified, please send a (human-generated) email to the regular channels.

### Even after reading the terms and FAQ there are still some points that seem unclear to me.

Send us a SHORT email listing ONLY the parts you don't understand (along with your
interpretations) and we will try to rewrite or explain them better.

## General API use

### Is this API free, even for commercial use?

**Yes!** You can use our data (and within reason, our services) for any purpose
you like, as described in the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
license. This includes paid-for apps or services, including advertising revenue.
If you become a millionaire by serving the public accurate weather forecasts,
that's totally fine by us!

### How do I identify myself in the User-Agent request header?

This is already explained in the [TOS](./TermsOfService), but to add more detail:

#### Requirement 1: You must provide contact information!

This is so that we can contact you in case of problems, otherwise you risk being
blocked without warning. Valid contact options are:

- email address (preferably non-personal)
- website with contact details to tech staff (forms are ok)
- link to github repo with possibility to open issues

Forums, private repos and other channels which require additional registration
are not acceptable, we don't have time for unnecessary steps when trying to
contact you.

#### Requirement 2: You must identify your website/app+version

- **For apps:** Enter the name and version of the app in the User-Agent header,
  optionally with a link to the app store. The version number is useful so that
  we can block misbehaving older versions after a fix has been released.
- **For website backends:** Just enter the domain name in the User-Agent header,
  optionally noting if it's a test or production installation.
- **For JS framework-driven websites (React, Vue et al):** Most browsers don't
allow changing the User-Agent header; instead it sends an Origin request header
with the website domain name which is acceptable. (During development it is also
ok to send small amounts of traffic using localhost.)

### Can the client apps contact the API directly, or do I need a central proxy backend?

It depends. We always recommend using a proxy for privacy reasons, as individual
IP addresses plus geocoordinates are personal data which we rather not be
dealing with. However we understand that this might be difficult for non-commercial
developers with little or no budget.

For moderate traffic amounts it is ok to contact the API directly, as
it would not benefit much from caching in your backend. However if you begin
approaching the 20 reqs/sec limit you will need to start optimizing your traffic,
in which case a central cache would be useful (after making sure you're not repeating
identical requests too often).

### My app/website is rapidly approaching the 20 reqs/sec limit. What must I do?

You need to contact us and apply for a custom subdomain. This will allow us to
monitor your traffic in real time and advise you on how to avoid unnecessary
requests. So far there are only 3 apps with > 20 reqs/sec (excluding Yr), so it
is very rare that a properly designed app should need to go over the limit.

### How do I give credit to MET Norway for using your data?

See our [Licensing and crediting](https://www.met.no/en/free-meteorological-data/Licensing-and-crediting)
instructions. For more details, see the [Creative Commons recommended practices
for attribution](https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution).
Yes, you can show it on a separate page as long as that is easy to find and
navigate to. You may translate the wording to any language(s) that is suitable for
your audience.

### Do you have a pricing model for high-volume sites?

No. This is a public service funded by Norwegian taxpayers, primarily to assist
in our mission to protect life and property in Norway, but also globally.
In fact api.met.no has been [approved as a digital public
good](https://www.met.no/en/archive/weather-data-from-met-norway-approved-as-digital-public-goods)
by the UN-led Digital Public Goods Alliance, as the first of its kind.

While we believe our data should be free and accessible to all, our human and
technological resources are not unlimited. As a non-commercial operation we
cannot really offer any higher levels of service to paying customers; instead
we try to share out our services evenly while giving priority to partners
we consider giving the most benefits to the general public. If you feel your
service is amongst those, please contact us.

### How long should we wait before repeating requests with identical parameters?

Depends on the product. For Locationforecast, please read the [Locationforecast FAQ](./locationforecast/FAQ).

### Is it OK to mix your forecast data with those from other providers?

Yes, but you must make it clear to the user which provider is the origin of the
data shown at the current time. We don't want to be held responsible for forecasts
from other providers.

### Can I process your data and use them in my own calculations?

Yes, but you must make it clear to the user that the data shown are a derived
product and not the responsibility of MET Norway.

### What does restrictions on some data mean?

Some data referred to in the documentation is not freely available, mostly
because the data is not ours. We have the right to use the data, but not to
distribute them. This is marked in the documentation for each product in a
section called Restrictions. For more information regarding this issue, please
see our [Licensing and Data Policy](.License).

Currently there are no longer any restricted data served via api.met.no.

## Technical problems

### Help! I am getting *429 Too Many Requests*! What am I doing wrong?

You are probably using a blank User-Agent header, or a generic one like
"wget/1.12" or (for apps) "Dalvik/2.1.0".
The [Terms of Service](./TermsOfService) clearly states that you **must
identify yourself** in the User-Agent header. If this is generic or missing
you will be throttled (for old products) or blocked (for new products from 2020
onwards).

If you're still getting 429s, you are probably hitting us with too much traffic
and have been permanently throttled. Please [contact us](./support) for advice
on how to enhance your calm. Make sure to include your IP address and User-Agent
in your message.

### Now I'm suddenly getting "403 Forbidden"! Why am I blocked?

Newer services like Locationforecast/2.0 have stricter rules and will
block instead of throttle if the User-Agent is missing or generic.
Again, read the [Terms of Service](./TermsOfService) before contacting us.

On the other hand it can also mean you have been found to break the
[TOS](./TermsOfService) in other ways and have been blacklisted, e.g.
by pretending to be another website or client, or slamming us with too
much traffic. In some cases this might be reversed when the problem is fixed,
but deliberate breaches of the TOS will result in a permanent ban.

### I was getting "403 Forbidden", but recently it changed to "405 Method Not Allowed"?

You seem to be sending POST requests. We have only every supported GET as per the
[documentation](./usage), and by implication, HEAD. POST should have been disabled
by default, but when we discovered it wasn't we blocked it as a security measure.

### Do you support unencrypted HTTP requests?

No, since version 3 we only support HTTPS for security reasons,
[as required by Norwegian law](https://lovdata.no/dokument/SF/forskrift/2013-04-05-959).
Since this is somewhat inconvenient when using the site we will redirect
legitimate HTTP requests from browsers to HTTPS on an experimental basis.
However, if we detect traffic where every HTTPS call is preceded by a HTTP call,
this is likely to be blocked.

### How can I access WeatherAPI data via QGIS (or any other GDAL-based application)?

GDAL by default does not send a User-Agent header, which causes a 403 Forbidden response.
You must set this explicitly in an environment variable (we presume you are using a
UNIX/Linux based platform here). Add the following line to your environment (e.g. `.bashrc`,
`.profile` or similar):

    $ export GDAL_HTTP_USERAGENT="QGIS vXXX/YYY (email@example.com)"

The email address is to fulfil the requirement for contact information in case you
exceed the traffic limits; without you will be blocked without warning. Also note
that trying to mimic browser User-Agent headers is in violation of the TOS which
can lead to blocking.

### Do you support content negotiation (using the `Accept` header)?

We tried to support this experimentally a short time after launching
version 3.0 of the API, but it generated a lot of problems and had to
be abandoned. Specifically, it does not work with caching proxies who
tend to serve XML to requests for JSON unless the Accept header is part
of the cache key. Since there are literally thousands of different
permutations of format in the various Accept headers, this would defeat
the point of having a cache.

Also, setting the Accept header is not allowed in "simple"
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests;
instead you must for that use a "preflight" and configure the server
to recognize each client (something which is not possible with the hundreds
of thousands of users of our API).

Content negotiation was a good ide in principle, but has been an absolute
failure in practice. Unfortunately it is still part of the Swagger/OpenAPI
spec, which is why you will see some fields in the API UI where you can
specify content type; this is ignored by the API.

### Do you support gzip compression of HTTP data?

Yes. We will serve gzip compressed data of appropriate MIME types.
See [General Usage](./usage) for more information.

### Earlier you used semicolons as parameter separators in the query string, now you're using ampersands. What's the deal?

Semicolons were introduced as an optional alternative to ampersands
after requests from developers using poorly suited tools for parsing
and generating XML. Since the semicolon did not need to be escaped in
XML (unlike the ampersand which had to be coded as `&amp;`), this made
generating URLs easier, completely ignoring that semicolons should instead
be url-encoded as `%3B` instead (and thus opening another kind of worms
when these two cases had to be handled differently).

According to the new [HTML5 specification](https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#url-encoded-form-data),
semicolon is no longer accepted as a valid parameter separator.
This actually means that a request using unescaped semicolons
in the query string must be processed differently for a HTML5
server than for HTML 4.x. For this reason we have reverted to
the standard usage.

## Ocean forecasts

### Q. What does the wave direction mean? Is it "coming from" or "going to"?

For Oceanforecast/0.9 and Gribfiles/1.1 we have used oceanographic convention
for waves (i.e. where they are "going to"), just as we do for currents. Example:

    <mox:meanTotalWaveDirection uom="deg">45.2</mox:meanTotalWaveDirection>
    <mox:seaCurrentDirection uom="deg">131.4</mox:seaCurrentDirection>

Unfortunately, a lot of software (e.g. navigation systems) expect the opposite,
so that when reading the GRIB files with a map plotter the wave arrows will be
shown the wrong way. Therefore, for Oceanforecast/2.0 and newer products (2021
onwards) we will be using meteorological convention for waves (i.e. where they
are "coming from"), just as we do for wind.
Please see the [Oceanforecast Data Model](./oceanforecast/datamodel) documentation.

## Solar energy

### Q. Do you have data on incoming solar energy in your API?

A: We plan to add this to Locationforeacast some time in the future, but
don't hold your breath.

### Q. Are historic solar energy data available?

A: Historic predictions of the solar energy that reaches the earth surface is
available from the archive of our weather prediction model on THREDDS.

The radiation parameters are available in NetCDF
format on [THREDDS](https://thredds.met.no/thredds/catalog/meps25epsarchive/catalog.html).
Choose the files with the following name: `meps_mbr0_extracted_2_5km_XXXXX`.

----------------------------------------

## Observational data

### Q. Do you have interpolated observational data available for download?

Yes. Real-time data are available here (PREC1d=daily precipitation; TEMP1d=daily
averaged temperature; data for day D encompass the time interval from day
D-1 0600 UTC to day D 0600 UTC):

<https://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/provisional_archive/catalog.html>

Here you find the archives:

<https://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/archive/catalog.html>

Here archives of seNorge2 based on MET Norway data + ECA&D data:

<https://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2_download_datasets/release_17.08/catalog.html>

xgeo.no and senorge.no are also possible options.

Contact [Christian Lussana](mailto:cristian.lussana@met.no) for more information.

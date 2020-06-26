---
title: Frequently Asked Questions
date: 2020-04-15
author: Geir Aalberg
layout: page
toc: 1
state: draft
tags:
    - reference
summary: >
    A summary of repeatedly asked questions from the support helpdesk
---

## General API use

### Help! I am getting *429 Too Many Requests*! What am I doing wrong?

You are probably using a blank User-Agent header, or a generic one like
"wget/1.12" or (for apps) "Dalvik/2.1.0". Use something unique and identifying
instead, like your domain name, company email or name/version of app in the
store. Also, please read the Terms of Use where this is described explicitly.

If you're still getting 429s, you are probably hitting us with too much traffic
and have been blacklisted. Please contact us for advice on how to enhance your
calm.

### Now I'm suddenly getting "403 Forbidden"! Why am I blocked?

Newer services like Locationforecast/2.0 have stricter rules and will
block instead of throttle if the User-Agent is missing or generic.

On the other hand it can also mean you have been found to break the
[TOS](./TermsOfService) in other ways and have been blacklisted, e.g.
by pretending to be another website or client.

### Do you support unencrypted HTTP requests?

No, since version 3 we only support HTTPS for security reasons. Since this is
somewhat inconvenient when using the site we will redirect legitimate HTTP
requests from browsers to HTTPS on an experimental basis. However, if we detect
traffic where every HTTPS call is preceded by a HTTP call, this is likely to be
blocked.

### What does restrictions on some data mean?

Some data referred to in the documentation is not freely available, mostly
because the data is not ours. We have the right to use the data, but not to
distribute them. This is marked in the documentation for each product in a
section called Restrictions. For more information regarding this issue, please
see our [Licensing and Data Policy](.License).

### Do you support gzip compression of HTTP data?

Yes. We will serve gzip compressed data of the following MIME types if the
client requests this in the HTTP request headers:

- text/html
- text/plain
- text/xml
- application/xml
- application/json

## Solar energy

### Q. Are historic measurements or historic predictions for the solar energy that
reaches the earth surface and if yes how can we access them?

A: Historic predictions of solar energy are available from the archive of our
weather prediction model. The radiation parameters are available in NetCDF
format on [THREDDS](http://thredds.met.no/thredds/catalog/meps25epsarchive/catalog.html).

Choose the files with the following name: `meps_mbr0_extracted_2_5km_XXXXX`.

----------------------------------------

## Observational data (FIXME)

> Noen som vet om vi interpolerte observasjonsdata eksternt tilgjengelig noe
> sted, fx på thredds? Kan ikke finne noe der, men mener å ha sett det som
> WMS. Det finnes også på SeNorge, hvor jeg antar det er vi som leverer data:
>
> http://www.senorge.no/index.html?p=senorgeny&st=weather

Ja det er vi som leverer som leverer til senorge og dataene finnes på
thredds. I hvilken sammenheng er dette?

Se svar fra Christian Lussana hos oss om tilgang til interpolerte data:

Hi,
real-time data are available here (PREC1d=daily precipitation; TEMP1d=daily
averaged temperature; data for day D encompass the time interval from day
D-1 0600 UTC to day D 0600 UTC):
http://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/provisional_archive/catalog.html

Here you find the archives :
http://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/archive/catalog.html

Here archives of seNorge2 based on MET Norway data + ECA&D data:
http://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2_download_datasets/release_17.08/catalog.html

xgeo.no and senorge.no are also possible options.

Cheers,
Cristian

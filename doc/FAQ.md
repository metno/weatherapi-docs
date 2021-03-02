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

Yes. We will serve gzip compressed data of appropriate MIME types.
See [General Usage](./usage) for more information.

### Earlier you used semicolons as parameter separators in the query string, now you're using ampersands. What's the deal?

Semicolons were introduced as an optional alternative to ampersands
after requests from developers using badly designed tools for parsing
and generating XML. Since the semicolon did not need to be escaped in
XML (unlike the ampersand which had to be coded as `&amp;`), this made
generating URLs easier, completely ignoring that they should instead
be url-encoded as `%3B` instead (and thus opening another kind of worms
when these two cases had to be handled differently).

According to the new [HTML5 specification](https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#url-encoded-form-data),
semicolon is no longer accepted as a valid parameter separator.
This actually means that a request using unescaped semicolons
in the query string must be processed differently for a HTML5
server than for HTML 4.x. For this reason we have reverted to
the standard usage.

## Ocean forecasts (FIXME)

### Q. Wave direction

> Lurte på om dere kan svare på et spørsmål angående bølgeretning og
> havstrømsretning som kan leses ut fra Oceanforecast 0.9 (gjelder også Gribfiles).
> Vi lurer på hvordan retningene skal tolkes da vi ser et ganske stort avvik
> fra egne sensorer og meldingene fra Oceanforecast.
>
> Den normale konvensjonen for bølge- og strømretning er at bølgeretning
> tolkes «kommer fra» (på samme måte som vind) og strømretning skal tolkes
> «setter til».
>
> Eksempel på datarespons fra Oceanforecast:
>
>     <mox:meanTotalWaveDirection uom="deg">45.2</mox:meanTotalWaveDirection>
>
>     <mox:seaCurrentDirection uom="deg">131.4</mox:seaCurrentDirection>
>
> Om vi bruker den normale konvensjonen for bølge- og strømretning tolker vi
> dette til følgende:
>
> - Bølgeretning (45,2 grader kommer fra nord-øst og er på vei mot sør-vest.
> - Strømretning (131,4 grader) kommer fra nord-vest og er på vei mot sør-øst.
>
> Har vi da tolket retningene korrekt?

Jeg kan bekrefte at deres forståelse av retning for strøm er korrekt. Når det
gjelder bølgeretning bruker oseanografisk konvensjon som er samme som strøm,
dvs. at retningen er motsatt av det du beskriver (45 grader går mot nordøst). De
fleste (?) andre, ihvertfall mye software, bruker meteorologisk konvensjon, som
altså er omvendt.

## Solar energy

### Q. Are historic measurements or historic predictions for the solar energy that
reaches the earth surface and if yes how can we access them?

A: Historic predictions of solar energy are available from the archive of our
weather prediction model. The radiation parameters are available in NetCDF
format on [THREDDS](https://thredds.met.no/thredds/catalog/meps25epsarchive/catalog.html).

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
https://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/provisional_archive/catalog.html

Here you find the archives :
https://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2/archive/catalog.html

Here archives of seNorge2 based on MET Norway data + ECA&D data:
https://thredds.met.no/thredds/catalog/metusers/senorge2/seNorge2_download_datasets/release_17.08/catalog.html

xgeo.no and senorge.no are also possible options.

Cheers,
Cristian

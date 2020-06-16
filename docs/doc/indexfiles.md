---
title: OPDATA index files
date: 2020-01-09
author: Geir Aalberg
layout: post
tags:
  - internal
---

This documents the use of index files for files delivered via api.met.no.

**Summary: Data producers wanting to distribute data reliably must now
generate metadata indexes for the datafiles to be delivered!**

Background
----------

Due to expiry of hardware and software support, the api.met.no
must be migrated over from the current physical servers to OpenStack VMs
in Ares by April 2017. This is more or less finished; however there are performance issues
with storage of files from opdata (which is not accessible and must be
replicated). Neither Lustre, local NFS servers in Ares nor the current extdata
(via firewall) are able to give similar performance as the old hardware.
Also, some products are already giving unacceptable performance (including
timeouts) in the current system, which will only be exacerbated after migration.

As such we need to rewrite the offending products to avoid excessive disk
access. Currently many products rely on globbing directories to list available
data; this must be redesigned to use some form of index that is fast, reliable
and easily replicated for testing. After experimenting with JSON and SQLite
indexes we have settled on a plain, comma-separated text file which should
be very easy to generate for data producers.

Indexfile format
---------------

Each directory should have an indexfile describing the data files in the
same directory. Indexes referring to files in other directories have not tested
and is currently unsupported. The filename is not critical, but for clarity we
suggest `api_index.txt`.

Indexfiles should be in comma-separated format, with one line per file in the directory.
Each line consists of key=value pairs separated by commas, with no spaces in between.

The keys should correspond to the query parameters on api.met.no,
plus an additional key `filename` with the name of the file (this field is mandatory).

    filename=World-IR-20170119140000.png,area=World,size=normal,type=IR,time=2017-01-19T14:00:00Z

For products where the files are spread across several directories and the index
files will be merged in production, it is necessary to specify not only the filename
but also the directory name (which should be the same as the file is located):

    dir=web-portalen,filename=webnorge2km_20170324T100000Z.gif,radarsite=yr-norway,content=image,type=reflectivity,size=normal,time=2017-03-24T10:00:00Z

The parameter `time` should always be present, unless there is only one file matching the parameter set.
This file will never be purged as it is supposed to be continually overwritten with newer files.

Expiration
----------

The index file must be written to disk *after* all corresponding files have been written,
so that all references files are physically present. Files must not be deleted from disk
until a new indexfile has been generated without the missing file references.

api.met.no normally only distributes data for two days ago (for observations) or in the future (forecasts).
This is also reflected in the file distributions jobs which delete files when they are too old.
The index file should only reference those files which are supposed to be available via the api.
If this is infeasible, it must contain a parameter with a timestamp which can be used for filtering.

To facilitate automatic deletion and removal from the api, an `expires` header should be used.
Also, we recommend having a `created` header to indicate for users when the file was
last modified so they don't have to download existing files:

    dir=halo-accumulated-precipitation, \
    filename=halo-trondelagromsdal-pcappi-acrr-24h-polarWGS84-1000_20190109T060000Z.png, \
    radarsite=central_norway, \
    content=image, \
    type=accumulated_24h, \
    size=normal, \
    time=2019-01-09T06:00:00Z, \
    created=2019-01-09T05:23:54Z, \
    expires=2019-01-10T18:00:00Z

List of products which should be rewritten to use index files
-----------------------------------------

- [x] cbrn
- [x] geosatellite
- [ ] gribfiles *(21 files, not critical)*
- [ ] icemap *(12 files, not critical)*
- [x] metalerts
- [ ] metgc
- [ ] metgm
- [x] nlaroutes
- [x] polarsatellite
- [x] radar
- [ ] subjectiveforecast
- [ ] tidalwater
- [ ] turbulence **(URGENT)**
- [ ] upperwindweather
- [ ] vtkbriefing

The following products generate available lists algorithmically, so don't need an index:

- epsogram
- spotwind
- textforecast
- weathericon

Questions?
---------

For more information, including technical details, please contact:

- Geir Aalberg (geira@met.no)
- Håvard Futsæter (havardf@met.no)

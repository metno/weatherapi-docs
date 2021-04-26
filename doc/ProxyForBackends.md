---
title: API proxy for backend services
date: 2020-01-09
author: Geir Aalberg
layout: page
tags:
  - internal
summary: >
    How to build backend microservices using WeatherAPI as a proxy
---

# How to build backend microservices using WeatherAPI as a proxy

## General terms

Described in the [Operational Level Agreement](./OLA).


## Links

Any links to the API generated on the backend must not use hardcoded hostnames,
since the destination varies according to each environment (public, internal,
staging, testing etc). Instead you must read the following HTTP headers which
are included in all requests from the API:

- `X-Forwarded-Host`
- `X-Forwarded-Proto`

Here is a typical example of the headers sent by a request from the build server:

    {

        "Accept-Encoding": "gzip",
        "Content-Length": "0",
        "Host": "edge.api.met.no:8080",
        "User-Agent": "WeatherAPI/edge.api.met.no:8080",
        "X-Forwarded-Host": "edge.api.met.no:8080",
        "X-Forwarded-Proto": "https"

    }

### Kubernetes

The k8s load balancer requires special configuration since it overwrites the
`X-Forwarded-Host` and `-Proto` before sending the request to the backend.
To compensate you must store the incoming headers in a custom header, e.g.
`X-External-Host`. This can be added in `kubeconf.yml` which is generated
during deployment:

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      ...
      annotations:
        nginx.ingress.kubernetes.io/configuration-snippet: |
          proxy_set_header X-External-Host \$http_x_forwarded_host;
          proxy_set_header X-External-Proto \$http_x_forwarded_proto;



## Response

### Body

The returned request body cannot be empty; this is flagged as an error in the API.

### Response headers

- **Content-Type**: This must be an IANA-registered media type. If you invent your own the API conversion routines will fail


## Other

For more information, including technical details, please contact:

- Geir Aalberg (geira@met.no)
- Håvard Futsæter (havardf@met.no)

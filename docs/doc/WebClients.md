---
title: Writing web clients
date: 2020-06-23
author: Geir Aalberg
layout: post
state: draft
tags:
    - howto
summary: >
    How to write a web client for MET Weather API, using various technologies
---

**DRAFT - DRAFT - DRAFT - DRAFT - DRAFT - DRAFT - DRAFT - DRAFT - DRAFT**

## Static links

This sometimes works, e.g. for images which does not contain time information:

```
<img src="https://api.met.no/weatherapi/radar/2.0/?type=accumulated_01h&area=central_norway"/>
```





## Cross-Origin Resource Sharing (CORS)

### Simple requests

Some requests don’t trigger a [CORS preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests). Those are called *“simple requests”* in this article, though the [Fetch](https://fetch.spec.whatwg.org/) spec (which defines CORS) doesn’t use that term. A “simple request” is one that **meets all the following conditions**:

- One of the allowed methods:  

    - [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
    - [`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
    - [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

- Apart from the headers automatically set by the user agent (for example, `Connection`, `User-Agent`, or the other headers defined in the Fetch spec as a “forbidden header name”), the only headers which are allowed to be manually set are those which the Fetch spec defines as a “CORS-safelisted request-header”, which are:  

    - [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)
    - [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)
    - [`Content-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language)
    - [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) (but note the additional requirements below)
    - `DPR`
    - `Downlink`
    - `Save-Data`
    - `Viewport-Width`
    - `Width`

- The only allowed values for the 

    `Content-Type`

     header are:  

    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`

- No event listeners are registered on any `XMLHttpRequestUpload` object used in the request; these are accessed using the [`XMLHttpRequest.upload`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) property.

- No [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) object is used in the request.

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Examples_of_access_control_scenarios

#### Caveats

The problem with CORS is that you normally cannot identify yourself with a `User-Agent` header and risk being blocked. Normally the request will include an `Origin` header, which may be enough to get you out of trouble if it contains a reachable domain name with contact info. 

But it is also incompatible with any form of HTTP authentication (Basic Auth, OAUTH2, static bearer tokens etc). This means that you cannot use the Frost API with simple requests, and in the future possibly not Weather API either if we decide to implement authentication.

### Preflighted requests

Unlike [“simple requests” (discussed above)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests), "preflighted" requests first send an HTTP request by the [`OPTIONS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) method to the resource on the other domain, to determine if the actual  request is safe to send. Cross-site requests are preflighted like this  since they may have implications to user data.

The following is an example of a request that will be preflighted:

```js
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>'); 
```

The example above creates an XML body to send with the `POST` request. Also, a non-standard HTTP `X-PINGOTHER` request header is set. Such headers are not part of HTTP/1.1, but are  generally useful to web applications. Since the request uses a  Content-Type of `text/xml`, and since a custom header is set, this request is preflighted.

#### Credentialed requests and wildcards

When responding to a credentialed request, the server **must** specify an origin in the value of the `Access-Control-Allow-Origin` header, instead of specifying the "`*`" wildcard.

#### Caveats

Since it is impossible for api.met.no to list all the thousands of different sites using the Weather API, we cannot include your website in the `Access-Control-Allow-Origin` header (the list would simply be too long). Because of this, you cannot use the Frost API with authentication either.



## See also

https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work
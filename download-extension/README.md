> ### Youtube , Twitter, facebook course video download extension for chrome and firefox version.


# extension-create [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url] [![wip][wip-image]][wip-url]

<img alt="Logo" align="right" src="https://user-images.githubusercontent.com/4672033/102850460-4d22aa80-43f8-11eb-82db-9efce586f73e.png" width="25%" />

Create modern cross-browser extensions with no build configuration.


`extension-create` helps you develop cross-browser extensions with built-in support for module imports/exports, auto-reload, and more. Interested to know how it's being developed? [Every week I send emails about its progress](https://cezaraugusto.substack.com/). For goals, see the [wiki](https://github.com/cezaraugusto/extension-create/wiki/This-initiative).

## Creating an Extension

```sh
git clone 
cd my-extension-hello

```

A new browser instance (for now, Chrome) will open up with your extension ready for development.

You are done. Time to hack on your extension!



## Getting Started Immediately


```

Will load your extension the same way the screenshot above demonstrates. This method is, in fact, what the [standard template does](https://github.com/cezaraugusto/extension-create/blob/main/create/steps/writePackageJson.js#L19-L21) when you run the create command `npx extension-create <extension-name>`.

#### Using a specific browser for development

| <img width=120 src="https://raw.githubusercontent.com/alrra/browser-logos/a94987f29719142668cdf960b3f624ce1a3c6aa8/src/chrome/chrome.svg?sanitize=true" alt="Chrome browser logo"> | <img width=120 src="https://raw.githubusercontent.com/alrra/browser-logos/a94987f29719142668cdf960b3f624ce1a3c6aa8/src/edge/edge.svg?sanitize=true" alt="Microsoft Edge browser logo"> |
|-----------|---------|
| Google Chrome ✅ | Microsoft Edge ✅ |

If you want to target a specific browser, just pass the `--browser` flag to the start command (Chrome or Edge, soon others), like `npx extension-create start --browser=edge`.

That's it!

> _Hint: pass `all` instead of `edge` as an argument to load both Edge and Chrome at the same time!_
## What's next?

See the [Wiki](https://github.com/cezaraugusto/extension-create/wiki) for stable updates and future project roadmap. If you're interested in the latest news, I write weekly about this project development at https://cezaraugusto.substack.com.

## License

MIT (c) Cezar Augusto.

---
id: plugins
title: Plugins
---

The plugins allows you to extend your application features while decreasing development time.

uStart plugins are like mini apps, they are composed by schemas, models, resolvers, permissions, mocks, seeds, etc.

## Installation

Plugins must be installed in `plugins` folder:

```
+-- your-app
|   +-- src
|   |   +-- plugins
|   |   |   +-- plugin-1
|   |   |   +-- plugin-2
|   |   |   +-- plugin-3
```

> Refer to each plugin for installation instructions and more details.

## Plugin list

The official plugins: https://github.com/ustart-dev/ustart-plugins#ustart-plugins.

If you develop a feature that you think it may be helpful to others, don't hesitate and send us a PR!

## Structure

A typical plugin composition:

```
+-- plugin-1
|   +-- __tests__
|   +-- src
|   |   +-- data
|   |   |   +-- populate.js
|   |   +-- mocks
|   |   |   +-- plugin-1.mocks.js
|   |   +-- plugin-1.model.js
|   |   +-- plugin-1.resolvers.js
|   |   +-- plugin-1.type.js
|   +-- README
|   +-- version
```

## Argument

While we were designing plugins architecture, we take in consideration the following:

* how do we provide an easy and powerful way to extend project features by using plugins?
* how does these plugins going to coexist with the rest of the project?
* how does distribution going to work?
* how does updates going to work (plugins already installed)?

Follow scenarios arise:

1. We create a complex plugins API to provide communication between uStart, your app and the plugin. A large configuration system must be provided by every plugin. Thus, plugins source code customization capacity is low. However distribution and updates can be managed by NPM package system.
1. We keep it simple by not creating any API at all! Thus, no configuration file, or at least, a tiny one. Plugins source code customization capacity is high. However distribution and updates can not be managed by NPM package system.

We choose to make plugins a natural extension of your project, something you can modify right away and adapt it to your business logic. However, easiness comes with a price: the distribution and updates paid it.

Distribution is done through GitHub releases using zip and tar.gz files.

Upgrades are on your own. This means more work for you to stay tune, but it should not be a problem if you are organized.

uStart treats plugins just like entities, without any special treatment. In fact, schemas, models, resolvers, permissions and mocks for both entities and plugins are loaded at the same time without distinction. This allows you to customize the plugins source code very easy. They became part of your code base.

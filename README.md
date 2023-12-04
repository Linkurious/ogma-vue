# `@linkurious/ogma-vue`

![logo](/logo.svg)


Wrapper to use [Ogma](https://doc.linkurio.us/ogma/latest/) with [Vue3](https://vuejs.org/about/releases.html).
It allows you to create graph visualisations easilly, with both the power of Ogma and the reactivity of Vue. 

You need an Ogma licence to use it. Please [contact us](https://doc.linkurious.com/ogma/latest/contact.html) for more info.

## Documentation

Please visit the documentation of Ogma-vue [here](https://linkurious.github.io/ogma-vue/).

## How to contribute

Some parts of this repo belongs to Linkurious internal infrastructure and CI. 
When developing, you can remove `.version` `.bumpversion.cfg` `Jenkinsfile`  files.

### Project setup

[Ogma](https://ogma.linkurio.us) is a commercial library. You will need to replace the dependency in `package.json` with the `npm` link from the [download center](https://get.linkurio.us) in order to get started. It will have your unique API key.

```
npm install
```

### Compiles and hot-reloads DEMO
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Builds the docs for development: 
```
npm run doc:dev
```

### run unit tests
```
npm run test:unit
```

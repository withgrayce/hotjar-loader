# hotjar-loader

Async loader for the Hotjar JS API written in typescript with promises.

This package makes no changes to the functionality of the Hotjar JS API, it merely provides an easy way to load it asynchronously and then execute calls against the API in a Typescript project.

## Installation

```
$ npm install --save hotjar-loader
```

## Usage

```typescript
import { Hotjar, Loader } from 'hotjar-loader';

const loader = new Loader(yourHjid, yourHjsv);
loader.load().then((hotjar: Hotjar) => {
  hotjar.identify(userId);
});
```

The API only supports the `identify` call, which is documented [here](https://help.hotjar.com/hc/en-us/articles/360033640653)

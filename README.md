# kanjiken

## Step by step:

```console

$ # install yarn
$ brew install yarn

$ # install Vue CLI 3
$ npm install -g @vue/cli

$ # Setup the new Vue project
$ vue create kanjiken

Vue CLI v3.0.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, Vuex, CSS Pre-processors, Linter, Unit
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript for auto-detected polyfills? Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): SCSS/SASS
? Pick a linter / formatter config: TSLint
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Mocha
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No

$ # install Vue CLI 3 plugin for Electron
$ vue add electron-builder

$ cd kanjiken

$ # launch Electron for the first time
$ yarn serve:electron

$ # launch it in the browser for for the first time
$ yarn serve

$ # run the linter
$ yarn run lint

$ # optional: fix linting warning 'no-var-requires' in background.ts
$ code src/background.ts
```


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

# React Dashboard

> A learning project I built for fun and trying a number of libs, technics and modern APIs to get my hands dirty with. I did not want to make it look pretty or cross-browser compatible. The whole purpose of this is just to try out some new JS.

---

## Structure

This repo consist of two parts, namely:

- the `backend` directory. Simple express server which just serves mocked data
- all the rest which is basically the app code

---

## Why

I built this project to try out various things from the JS world which I for some reasons cannot try at work (or not enough), namely:

- `reselect` for efficient `redux` selectors
- `immer` to write pretty mutable-looking reducers
- `redux-saga` as a middleware for complex side-effects

- configuring a set of charts with `apexcharts`
- a UI framework (Material UI)
- skeletons, LQIP and `Intersection Observer API` to lazy-load images
- virtual lists with `react-window`

- wrapper around `fetch API` using `URL`, `Request`, `Abort Controller` APIs
- `FontFace API` for dynamic fonts loading

- complex `webpack` configuration
- routes preloading with `@loadable-components`
- extensive code splitting and bundle size minimization
- `workbox` plugin for service-worker generation (assets precashing, runtime cashing)
- `io-ts` for runtime checking
- typesafe reducers
- custom hooks

- LogRocket to monitor this app in production

And some others blows and whistles.

---

### [DEMO on heroku](https://shielded-earth-46088.herokuapp.com/dashboard)

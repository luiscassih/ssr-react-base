<h1 align="center">
	<img width=200 src="./src/pages/dashboard/assets/images/capi_wizard.png"><br>
	SSR-React-Base
</h1>

## A simple base application for a server side rendering react project using typescript.
#
`Using Node 16.14.1 LTS`

`Edit .env config and replace with your custom config.`

First `yarn install` to install dependencies.

To start in dev mode with watch enabled:
```
yarn dev
```
To generate a production ready build:
```
yarn build
```
To run tests usin Jest and React-testing-library
```
yarn test
```
---
## Docker
---
To generate a docker image ready for a production environment. It will take the name and
the version from the package.json file, and it will also tag the generated version to latest.
```
yarn docker:build
```
To start a container using docker-compose, but before that go to the Docker folder and edit 
the app service to match your project image, you can also add a db or any other service.
```
yarn docker:start
```
To stop the container
```
yarn docker:stop
```

---
## Project structure
---

Aside from pages/ and server/, every module or feature have the same structure.

```none
┌──────────────┐
│   Feature    │
└──────────────┘  
       │     ┌──────────────┐
       ├───▶ │  __tests__/  │ ────── 「 Your tests, written in .tsx and using jest with react
       │     └──────────────┘         testing library 」
       │     ┌───────────┐
       ├───▶ │  assets/  │ ───────── 「 Contains every image, svg or public assets 」
       │     └───────────┘
       │     ┌───────────────┐ 
       ├───▶ │  components/  │ ───── 「 Dependencies, your own react components used by this 
       │     └───────────────┘        feature 」
       │       └─▶  ...  ─────────── 「 Each component may be a folder which contains more nested
       │                              features 」
       │     ┌──────────────┐
       ├───▶ │  client.tsx  │ ────── 「 Contains component routing, it will be execute first on  
       │     └──────────────┘         browser, hydrates the server rendered react with your
       │                              browser react 」
       │     ┌─────────────────┐
       ├───▶ │  controller.ts  │ ─── 「 This is server side, here is where you perform api calls,
       │     └─────────────────┘      users login, database, secrets, other server stuff, and
       │                              finally build the props to pass to the React component.
       │                              Don't forget to use res.render(Component, clientId,
       │                              props) to generate the output html for the client
       │                              to load your React's app 」
       │     ┌───────────────┐
       ├───▶ │  styles.scss  │ ───── 「 I recommend to scope your component here, make a class  
       │     └───────────────┘        with your component's name, and add this file to the
       │                              global src/assets/styles/base.scss 」
       │     ┌────────────┐
       ├───▶ │  types.ts  │ ──────── 「 This is where you expose your types related to this
       │     └────────────┘           feature 」
       │     ┌────────────┐
       └───▶ │  view.tsx  │ ──────── 「 Where your react components lives, this component will be
             └────────────┘           rendered bot on server and browser's client 」
```
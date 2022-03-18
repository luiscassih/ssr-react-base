# 
<h1 style="display:flex;align-items:center;flex-direction:column;" align="center">
SSR-React-Base
<image style="width: 100px;margin-top: 20px;" src="./src/pages/dashboard/assets/images/capi_wizard.png">
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
To run tests
```
yarn test
```
---
## Docker
---
To generate a docker image
```
yarn docker:build
```
To start a container using docker-compose.
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

	[feature name]
	-> assets/ 					| Contains every image, svg or public assets

	-> components				| Dependencies, buttons, your own components used by this feature
		-> ...					| each component may be a folder which contains more nested features

	-> client.tsx				| Contains component routing, it will be execute first on browser, hydrates the server rendered react with your browser react.

	-> controller.ts			| This is server side, here is where you check for your users, calls database and other server stuff, and finally, build the props to pass to the React component.

	-> styles.scss				| I recommend to scope your component here, make a class with your component's name, and add this file to the global src/assets/styles/base.scss

	-> view.tsx					| Where your react components lives, this component will be rendered bot on server and browser's client.
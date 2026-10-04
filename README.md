# TS Like A PRO

This Typescript Tutorial is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

Live site: https://ts-like-a-pro.vercel.app

### Requirements

Node.js 22 or newer (see `.nvmrc`). With [nvm](https://github.com/nvm-sh/nvm):

```
$ nvm use
```

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Checks

```
$ yarn typecheck
$ yarn lint
$ yarn format:check
```

Run `yarn format` to fix formatting. CI runs these checks plus a build on every pull request.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

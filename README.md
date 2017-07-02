# React/Redux/Saga Demo

A simple application demonstrating the general architecture of an application built on the React, Redux and Redux-Saga.
Each of them is responsible for its level of responsibility and is conceptually separated from the others:
 - **React Components**: just render views in accordance with the current state of the store. They contain only pure presentation logic.
 - **Redux Reducers**: just update the state of the store in accordance with the data transmitted from the actions. They do not contain any logic other than update logic. 
 - **Sagas**: implement any other logic, including all kinds of side effects.

[Json-server] is used as a fake server that supports the simplest RESTful-queries without data validating.

### Installation
```sh
$ git clone https://github.com/swarga-core/rrs-demo.git
$ npm install
```

### Usage
```sh
$ npm run start-dev
```

The application will be available at [http://localhost:8080]

License
-------

MIT

   [Json-server]: <https://github.com/typicode/json-server>
   [http://localhost:8080]: <http://localhost:8080>
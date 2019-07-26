import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Server, Model, Factory } from '@miragejs/server';
import * as serviceWorker from './serviceWorker';

let server = new Server({
  models: {
    user: Model
  },
  factories: {
    user: Factory.extend({
      name(i) {
        return `User ${i}`;
      }
    })
  },
  scenarios: {
    default(server) {
      server.createList('user', 10);
    }
  },
  baseConfig() {
    this.namespace = 'api';
    this.get('/users');
    this.passthrough();
  }
});

export { server };

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

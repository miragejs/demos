import { Server, Factory, Model } from '@miragejs/server';

let startMirage = function({ environment = 'test' } = {}) {
  let server = new Server({
    environment,
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

      // the following will respond with a JSON payload
      // containing all users
      this.get('/users');

      this.passthrough();
    }
  });

  return server;
}

export { startMirage }

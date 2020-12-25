import { createServer, Model, Factory, Server, ModelInstance } from "miragejs";
import faker from "faker";
import { Person } from "../fetchers";

type FactoryParams<Data> = {
  [key in keyof Partial<Data>]: () => Data[key];
} & {
  afterCreate: (person: ModelInstance<Data>, server: Server) => void;
};

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,
    factories: {
      person: Factory.extend<FactoryParams<Person>>({
        firstName: () => faker.name.firstName(),
        lastName: () => faker.name.lastName(),

        streetAddress: () => faker.address.streetAddress(),
        cityStateZip: () =>
          faker.fake(
            "{{address.city}}, {{address.stateAbbr}} {{address.zipCode}}"
          ),
        phone: () => faker.phone.phoneNumber(),
        password: () => faker.internet.password(),
        avatar: () => faker.internet.avatar(),
        /* We use afterCreate for creating properties that needs to be derived from other properties */
        afterCreate(person, server) {
          person.update({
            name: faker.name.findName(person.firstName, person.lastName),
            username: faker.internet.userName(
              person.firstName,
              person.lastName
            ),
            email: faker.internet.email(person.firstName, person.lastName),
          });
        },
      }),
    },

    models: {
      person: Model.extend<Partial<Person>>({}),
    },

    routes() {
      this.namespace = "api";

      this.get("people");
    },

    seeds(server) {
      server.createList("person", 20);
    },
  });
}

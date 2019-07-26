// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

import server from "./server";

server.logging = false;
// TODO: reset/empty the database on each test run here

global.server = server;

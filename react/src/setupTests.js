// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';

// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

// Mirage time!
import server from "./server";

// turn off console logs in jest
server.logging = false;

beforeEach(() => {
  // reset any timing delays
  server.timing = 0;

  // reset the database for each test
  server.db.emptyData();
});

// The mirage server is available in tests as `server`
global.server = server;


// There's a bug in react 16.8 that happens if a promsie resolves
// during render we get an act warning. This issue is long, but
// it highlights the situations where this happens.
//
// https://github.com/testing-library/react-testing-library/issues/281
//
// There are a couple of ways to fix this:
//
// * Upgrade to react-dom 16.9.0.alpha (but that's currently alpha)
//   https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256
//   https://github.com/testing-library/react-hooks-testing-library/issues/14#issuecomment-493021093
//
// * Monkey patching console.error to ignore this warning
//   https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256
//
// * Wrapping resolve calls with act()
//   https://github.com/threepointone/react-act-examples/blob/master/act-examples.test.js
//
let originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  }
});

afterAll(() => {
  console.error = originalError;
});

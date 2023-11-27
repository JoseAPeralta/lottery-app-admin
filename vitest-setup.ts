import 'vitest-axe/extend-expect';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import * as axe from 'vitest-axe/matchers';

expect.extend(matchers);
expect.extend(axe);
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

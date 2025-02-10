import 'jest-preset-angular/setup-jest';

import { ngMocks } from 'ng-mocks';
beforeAll(() => ngMocks.autoSpy('jasmine'));

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

// Note: Need to import the enums from their corresponding file due to a defect
// with Jest (https://github.com/kulshekhar/ts-jest/issues/281). During run time,
// the enums imported from a barrel file (index.ts) are undefined and tests fail.
// This is just during unit test runs, import from a barrel file works fine at the
// application level.
import { Language } from '../models/language';

export const translations: typeof Language = {
  ...Language,
};

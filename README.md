# import-sort-style-loom

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules.

```js
// Node modules
import fs from 'fs'

// Imported modules
import fsExtra from 'fs-extra';

// Resolved modules
import action from 'actions/something';
import constant from 'constants/something';
import creator from 'creators/something';
import middleware from 'middleware/something';
import reducer from 'reducers/something';
import utility from 'utilities/something';

// Absolute modules
import * as bar from 'bar';
import bar, * as baz from 'bar';
import bar from 'bar';
import bar, { baz } from 'bar';
import { bar } from 'bar';
import type { Bar, Baz } from 'bar';

// Relative modules
import * as bar from './bar';
import bar, * as baz from './bar';
import bar from './bar';
import bar, { baz } from './bar';
import { bar } from './bar';
import type { Bar, Baz } from './bar';
import * as bar from './../bar';
import bar, * as baz from './../bar';

// Absolute modules with no members
import 'foo';

// Relative modules with no members
import './bar';
```
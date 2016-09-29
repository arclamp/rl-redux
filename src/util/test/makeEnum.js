import test from 'tape-catch';

import { makeEnum } from '..';

test('makeEnum()', t => {
  // Construct some non-clashing enums.
  const enum1 = makeEnum([
    'one',
    'two',
    'three'
  ]);

  t.equal(enum1.one, 'one', 'Enum symbol value equals the symbol itself');
  t.equal(enum1.two, 'two', 'Enum symbol value equals the symbol itself');
  t.equal(enum1.three, 'three', 'Enum symbol value equals the symbol itself');

  // Construct a clashing enum.
  const enum2 = makeEnum([
    'one',
    'four',
    'five'
  ]);

  t.equal(enum2.one, 'one-0', 'Clashing enum gains a tag of 0');
  t.equal(enum2.four, 'four', 'Enum symbol value equals the symbol itself');
  t.equal(enum2.five, 'five', 'Enum symbol value equals the symbol itself');

  // Construct a second clashing enum.
  const enum3 = makeEnum([
    'one',
    'six'
  ]);

  t.equal(enum3.one, 'one-1', 'Second clashing enum gains a tag of 1');
  t.equal(enum3.six, 'six', 'Enum symbol value equals the symbol itself');

  t.end();
});

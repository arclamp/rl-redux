import test from 'tape-catch';

import { makeEnum,
         enumName,
         enumValue } from '..';

test('makeEnum()', t => {
  // Construct some non-clashing enums.
  const enum1 = makeEnum('enum1', [
    'one',
    'two',
    'three'
  ]);

  t.equal(enum1.one, 'enum1.one', 'Enum symbol value equals the symbol itself');
  t.equal(enum1.two, 'enum1.two', 'Enum symbol value equals the symbol itself');
  t.equal(enum1.three, 'enum1.three', 'Enum symbol value equals the symbol itself');
  t.equal(enumName(enum1.one), 'enum1', 'Name of enum should match the name supplied when created');
  t.equal(enumValue(enum1.one), 'one', 'Value of enum should match the value supplied when created');

  // Attempt to construct an enum with a previously used namespace.
  t.throws(() => {
    makeEnum('enum1', [
      'four',
      'five'
    ]);
  }, /duplicate namespace/, 'Duplicate namespace in an enum should throw an exception');

  // Attempt to construct an enum with a duplicate key.
  t.throws(() => {
    makeEnum('enum2', [
      'one',
      'two',
      'three',
      'two'
    ]);
  }, /duplicate key/, 'Duplicate keys in an enum should throw an exception');

  // Attempt to construct an enum with a dot in the namespace name.
  t.throws(() => {
    makeEnum('enum3.stuff', [
      'one',
      'two',
      'three'
    ]);
  }, /dots not allowed in namespace/, 'Dots in namespace name should throw an exception');

  // Attempt to construct an enum with a dot in a key.
  t.throws(() => {
    makeEnum('enum4', [
      'one.two',
      'three'
    ]);
  }, /dots not allowed in key/, 'Dots in key should throw an exception');

  t.end();
});

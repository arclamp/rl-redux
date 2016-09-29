import test from 'tape-catch';

test('sample pass', t => {
  t.pass('test passes');
  t.end();
});

test('sample fail', t => {
  t.fail('test fails');
  t.end();
});

test('sample exception', t => {
  t.pass('one assertion passes');

  throw new Error('oops');

  t.pass('but this one doesn\'t');
  t.end();
});

let start = 0;

const makeEnum = (values) => {
  let obj = {};
  values.forEach((value, i) => {
    obj[value] = start + i + 1;
  });

  start += 100;

  return Object.freeze(obj);
};

export {
  makeEnum
}

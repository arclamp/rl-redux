import Set from 'es6-set';

let used = new Set();

const makeEnum = (keys) => {
  // Construct an object containing keys matching those passed in `keys`, whose
  // values are the keys themselves, appending numeric tags as needed to
  // disambiguate from earlier enums with the same key (allowing the same key to
  // appear in multiple namespaced enums).
  let obj = {};
  keys.forEach((key) => {
    let tag = 0;
    let resolved = key;
    while (used.has(resolved)) {
      resolved = `${key}-${tag}`;
      tag += 1;
    }

    obj[key] = resolved;

    used.add(resolved);
  });

  // Freeze the resulting object so no one else can alter the values or keys.
  return Object.freeze(obj);
};

export {
  makeEnum
}

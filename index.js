import _merge from 'lodash.merge';

export default function jsonObjectStucture(json, opts = {}) {
  const jsonCopy = JSON.parse(JSON.stringify(json));
  return parseObject(jsonCopy, opts);
}

function mergeObjects(array) {
  return array.reduce((acc, item) => {
    return _merge(acc, item);
  }, {});
}

function parseArray(array, opts) {
  array = array.filter((item) => item);
  if (array.length === 0) {
    return [];
  }
  if (isPrimitive(array[0])) {
    return [typeof array[0]];
  }
  if (Array.isArray(array[0])) {
    return parseArray(array[0], opts);
  }
  if (typeof array[0] === 'object') {
    if (array[0][opts.preserveKey]) {
      // Include one item in the final array for each different value of the preserveKey
      const grouped = groupBy(array, opts.preserveKey);
      if (grouped.length > 1) {
        const uniqueParsedObjects = grouped.map((group) => {
          const merged = mergeObjects(group.items);
          return parseObject(merged, opts);
        });
        return sortObjectsByKeys(uniqueParsedObjects, opts.preserveKey);
      }
    }
    const merged = mergeObjects(array);
    return [parseObject(merged, opts)];
  }
}

function isPrimitive(test) {
  return test !== Object(test);
}

function groupBy(collection, property) {
  const groups = [];
  collection.forEach(function (item) {
    const value = item[property];
    let group = groups.find((group) => group.value === value);

    if (group) {
      group.items.push(item);
    } else {
      group = { property: property, value: value, items: [item] };
      groups.push(group);
    }
  });
  return groups;
}

function sortObjectsByKeys(array, key) {
  return array.sort(function (a, b) {
    const textA = a[key].toUpperCase();
    const textB = b[key].toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
}
function parseObject(object, opts) {
  for (const key in object) {
    if (object[key] === null) {
      object[key] = null;
    } else if (isPrimitive(object[key])) {
      object[key] = key === opts.preserveKey || (opts.preserveKeys || []).includes(key) ? object[key] : typeof object[key];
    } else if (Array.isArray(object[key])) {
      object[key] = parseArray(object[key], opts);
    } else if (typeof object[key] === 'object') {
      object[key] = parseObject(object[key], opts);
    }
  }
  return object;
}

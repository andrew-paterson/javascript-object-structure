import _merge from 'lodash.merge';

export default function jsonAsDataTypes(json) {
  return parseObject(json, { preserveKey: 'id' });
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
      const grouped = groupBy(array, opts.preserveKey);
      if (grouped.length > 1) {
        return sortObjectsByKeys(
          grouped.map((group) => parseArray(group.items, opts)),
          opts.preserveKey
        );
      }
    }
    const merged = array.reduce((acc, item) => {
      return _merge(acc, item);
    }, {});
    return parseObject(merged, opts);
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
      object[key] = 'unknown';
    } else if (isPrimitive(object[key])) {
      object[key] = key === 'type' ? object[key] : typeof object[key];
    } else if (Array.isArray(object[key])) {
      object[key] = parseArray(object[key], opts);
    } else if (typeof object[key] === 'object') {
      object[key] = parseObject(object[key], opts);
    }
  }
  return object;
}

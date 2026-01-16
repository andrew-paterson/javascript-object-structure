import jsonObjectStucture from './index.js';
import QUnit from 'qunit';

const data = {
  input: {
    data: {
      name: 'Test Object',
      type: 'user',
      id: '12345',
    },
    included: [
      {
        id: '34',
        age: 40,
        type: 'something-else',
      },
      {
        id: 'a1',
        value: 10,
        details: {
          description: 'First item',
          tags: ['alpha', 'beta'],
        },
        type: 'item',
      },
      {
        id: 'a2',
        value: 20,
        details: {
          description: 'Second item',
          tags: ['beta', 'gamma'],
        },
        type: 'item',
      },
    ],
  },
  output: {
    data: {
      name: 'string',
      type: 'user',
      id: 'string',
    },
    included: [
      {
        id: 'string',
        value: 'number',
        details: {
          description: 'string',
          tags: ['string'],
        },
        type: 'item',
      },
      {
        id: 'string',
        age: 'number',
        name: null,
        type: 'something-else',
      },
    ],
  },
};

QUnit.module('API Tests', () => {
  QUnit.test('Basics', async function (assert) {
    assert.deepEqual(jsonObjectStucture(data.input, { preserveKey: 'type' }), data.output, 'Basic structure match');
  });
});

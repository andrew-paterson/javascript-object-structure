import jsonObjectStucture from './index.js';
import QUnit from 'qunit';

const data = {
  input: {
    name: 'Test Object',
    type: 'user',
    id: '12345',
    items: [
      {
        id: 'a1',
        value: 10,
        details: {
          description: 'First item',
          tags: ['alpha', 'beta'],
          type: 'item',
        },
      },
      {
        id: 'a2',
        value: 20,
        details: {
          description: 'Second item',
          tags: ['beta', 'gamma'],
          type: 'item',
        },
      },
    ],
  },
  output: {
    name: 'string',
    type: 'user',
    id: 'string',
    items: [
      {
        id: 'string',
        value: 'number',
        details: {
          description: 'string',
          tags: ['string'],
          type: 'item',
        },
      },
      {
        id: 'string',
        value: 'number',
        details: {
          description: 'string',
          tags: ['string'],
          type: 'item',
        },
      },
    ],
  },
};

QUnit.module('API Tests', () => {
  QUnit.test('Basics', async function (assert) {
    assert.deepEqual(jsonObjectStucture(data.input), data.output, 'Basic structure match');
  });
});

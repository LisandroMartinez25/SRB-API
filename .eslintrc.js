module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    "no-return-await": 0,
    "camelcase": [0, {
      "properties": "never",
      "ignoreDestructuring": true
    }]
  }
}
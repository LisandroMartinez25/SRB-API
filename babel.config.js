const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ],
  ['minify',
    {
      'builtIns': false
    }
  ]
]

module.exports = { presets }

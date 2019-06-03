module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            '> 1%',
            'last 5 versions',
            'Firefox ESR',
            'safari >= 8',
            'ie >= 11'
          ]
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
   ["@babel/plugin-proposal-decorators", { "legacy": true }],
   ["@babel/plugin-proposal-class-properties", { "loose" : true }],
   ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash"
      }
    }]
 ]
}

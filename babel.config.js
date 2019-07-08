module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/preset-env", "@babel/preset-react"];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    "@babel/plugin-transform-regenerator",
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: false,
        regenerator: true
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};

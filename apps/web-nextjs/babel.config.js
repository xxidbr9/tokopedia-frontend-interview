module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-typescript", "next/babel"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".js", ".jsx", ".es", ".es6", ".mjs", ".ts", ".tsx"],
          alias: {
            '@': './src',
          }
        }
      ]
    ]
    // env: {
    //   production: {
    //     plugins: [
    //       [
    //         "react-remove-properties",
    //         { properties: ["data-testid", /data-test$/] }
    //       ]
    //     ]
    //   }
    // }
  };
};

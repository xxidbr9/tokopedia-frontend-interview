module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-typescript", "next/babel"],
    env: {
      production: {
        plugins: [
          [
            "react-remove-properties",
            { properties: ["data-testid", /data-test$/] }
          ]
        ]
      }
    }
  };
};

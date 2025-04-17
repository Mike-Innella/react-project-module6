const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // Main entry point of your React app
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Where the bundled file will be saved
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // For React and JS syntax
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Load CSS files
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000, // You can change this port if you like
  },
};

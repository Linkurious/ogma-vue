#!/bin/node

const fs = require("fs")

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    throw err
  }
  const base = JSON.parse(data);
  const overwrite = {
    devDependencies:undefined,
    scripts: undefined,
    eslintConfig: undefined,
    browserslist: undefined,
    private: undefined,
    files: [
      "lib.umd.js",
      "lib.umd.js.map",
    ],
    main: 'lib.umd.js'
  }
  fs.writeFile('./dist/package.json', JSON.stringify({ ...base, ...overwrite }, null, 2), (err) => {
    if (err) {
      throw err
    }
  });
});

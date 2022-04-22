#!/usr/bin/env node

const fs = require("fs/promises");

fs.readFile("package.json", "utf8")
  .then((data) => {
    const base = JSON.parse(data);
    const overwrite = {
      devDependencies: undefined,
      scripts: undefined,
      eslintConfig: undefined,
      browserslist: undefined,
      jest: undefined,
      "jest-junit": undefined,
      peerDependencies: base.peerDependencies,
      private: undefined,
      files: base.files.map((f) => f.replace("dist/", "")),
      exports: {},
    };
    ["jsdelivr", "browser", "main", "module", "typings"].forEach((field) => {
      if(!base[field]) return;
      overwrite[field] = base[field].replace("dist/", "");
    });
    if(base.exports){
      Object.keys(base.exports).forEach((key) => {
        overwrite.exports[key] = base.exports[key].replace("./dist/", "./");
      });
    }
    return { ...base, ...overwrite };
  })
  .then((data) =>
    fs.writeFile("dist/package.json", JSON.stringify(data, null, 2))
  );

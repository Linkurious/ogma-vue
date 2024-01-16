#!/usr/bin/env node

import fs from "fs/promises";

fs.readFile("package.json", "utf8")
  .then((data) => {
    const base = JSON.parse(data);
    const toDelete = [
      "devDependencies",
      "scripts",
      "eslintConfig",
      "private",
      "publishConfig"
    ];
    toDelete.forEach((key) => delete base[key]);
    base.peerDependencies.vue = `>=3.4.x`;
    return JSON.stringify(base, null , 2)
  })
  .then((data) =>
    fs.writeFile("package.json", data)
  )
  .then(() => Promise.all([
    fs.rm("dist/index.html", { force: true }),
    fs.rm("dist/favicon.ico", { force: true })
  ])
);

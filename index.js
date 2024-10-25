#!/usr/bin/env node
import { join } from 'path';
import { createRequire } from "module";
import { execSync } from 'child_process'
import inquirer from 'inquirer';

//import package.json at cwd
const require = createRequire(import.meta.url);
const { scripts } = require(join(process.cwd(), './package.json'));

const choices = [];
for (let key in scripts) {
    choices.push({
        short: key,
        name: `${key} - ${scripts[key]}`,
        value: key
    })
}

inquirer
    .prompt([{
        type: "list",
        name: "script",
        message: "Select a script...",
        choices,
    }])
    .then(({ script: x }) => execSync(`npm run ${x}`, { stdio: 'inherit' }))
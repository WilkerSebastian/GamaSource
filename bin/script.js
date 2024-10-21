#!/usr/bin/env node

import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import gama from '../package.json' assert { type: 'json' };

const execAsync = promisify(exec);
const args = process.argv;

async function main() {
    try {
        if (args.length === 3) {
            await handleArgs(args[2]);
        } else if (args.length === 4 || args.length === 5) {
            if (args[2] === "create") {
                await createProject(args[3], args[4]);
            }
        } else {
            console.log("command not found");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function handleArgs(arg) {
    if (arg === "--help" || arg === "-h") {
        displayHelp();
    } else if (arg === "--version" || arg === "-v") {
        console.log(`v${gama.version}`);
    } else if (arg === "build") {
        await buildProject();
    } else {
        console.log("Invalid argument");
    }
}

function displayHelp() {
    console.log(`
    GamaSource v${gama.version}

    create <path> // create a template project, default use npm
    create <path> -<package> // create a template project, use package(-npm, -yarn, -pnpm, -bun)
    build // compile a gamma source project to executable binary, according to the specifications of a game.config.json or default config
    build -<package> // gamma build and use package(-npm, -yarn, -pnpm, -bun)
    --version || -v // view the version of GamaSource
    --help || -h // view the commands
    `);
}

async function buildProject() {
    console.log("starting project compilation");
    console.time("complete in");

    const tmp = os.tmpdir();
    const electronPackagePath = path.join(path.dirname(import.meta.url), "/electron/package.json");
    const packElectron = JSON.parse(await fs.readFile(electronPackagePath, "utf-8"));

    let config = await getConfig();

    packElectron.scripts.make = `electron-packager . --arch=${config.arch} --icon=${config.icon} --platform=${config.platform} --prune=true --out=${config.out} --overwrite`;

    await fs.writeFile(electronPackagePath, JSON.stringify(packElectron));

    const electronDir = path.join(tmp, "/electron");
    await fs.cp(path.join(path.dirname(import.meta.url), "/electron"), electronDir, { recursive: true });

    await installDependencies(electronDir, args[4]);

    await fs.cp(path.resolve("dist"), electronDir, { recursive: true });

    await executeBuild(electronDir, args[4]);

    await fs.cp(path.join(electronDir, config.out), path.resolve("./"), { recursive: true });
    await fs.rm(electronDir, { recursive: true, force: true });

    console.log("compilation finished, output in folder " + config.out);
    console.timeEnd("complete in");
}

async function getConfig() {
    let config = {
        name: "app",
        arch: "x64",
        icon: path.resolve("./dist/favicon.ico"),
        platform: "darwin,linux,win32",
        out: "bin"
    };

    try {
        const configExtern = JSON.parse(await fs.readFile(path.resolve("./game.config.json"), "utf-8"));
        config.name = configExtern.name ?? "game";
        config.arch = configExtern.arch?.join(',') ?? "x64";
        config.icon = configExtern.icon ?? path.resolve("./dist/favicon.ico");
        config.platform = configExtern.platform?.join(',') ?? "darwin,linux,win32";
        config.out = configExtern.out ?? "bin";
    } catch (e) {
        console.log(path.resolve("./game.config.json"));
        console.log("WARNING: configuration file not found, continuing to use default values");
    }

    return config;
}

async function installDependencies(electronDir, packageManager) {
    let installCommand = "npm install";
    if (packageManager === "-yarn") installCommand = "yarn";
    else if (packageManager === "-pnpm") installCommand = "pnpm install";
    else if (packageManager === "-bun") installCommand = "bun install";

    await execAsync(`cd ${electronDir} && ${installCommand}`);
}

async function executeBuild(electronDir, packageManager) {
    let buildCommand = "npm run make";
    if (packageManager === "-yarn") buildCommand = "yarn make";
    else if (packageManager === "-pnpm") buildCommand = "pnpm make";
    else if (packageManager === "-bun") buildCommand = "bun make";

    await execAsync(`cd ${electronDir} && ${buildCommand}`);
}

async function createProject(projectPath, packageManager) {
    let name = projectPath === "." || projectPath === "./" ? path.basename(path.resolve(".")) : path.basename(projectPath);
    await fs.mkdir(name, { recursive: true });

    const { installCommand, execCommand } = getPackageManagerCommands(packageManager);

    const templateDir = path.join(path.dirname(import.meta.url), "template");
    await fs.cp(templateDir, projectPath, { recursive: true });

    const packageJsonContent = `
{
    "name": "${name}",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build -c vite.config.ts",
        "preview": "vite preview",
        "make": "npm run build && gamasource build"
    }
}`;
    await fs.writeFile(path.resolve(projectPath, "package.json"), packageJsonContent);

    await execAsync(`cd ${projectPath} && ${installCommand}`);

    console.log(`Execute to start your project: \ncd ${projectPath}\n${execCommand}`);
}

function getPackageManagerCommands(packageManager) {
    let installCommand = "npm i -D typescript vite && npm i gamasource";
    let execCommand = "npm run dev";

    if (packageManager === "-yarn") {
        installCommand = "yarn add -D typescript vite && yarn add gamasource";
        execCommand = "yarn dev";
    } else if (packageManager === "-pnpm") {
        installCommand = "pnpm add -D typescript vite && pnpm add gamasource";
        execCommand = "pnpm run dev";
    } else if (packageManager === "-bun") {
        installCommand = "bun add -D typescript vite && bun add gamasource";
        execCommand = "bun run dev";
    }

    return { installCommand, execCommand };
}

main();

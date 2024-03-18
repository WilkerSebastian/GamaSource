#!/usr/bin/env node

const fs = require('fs')
const shell = require ("shelljs")
const os = require("os")
const path = require ('path')
const gama = require ("../package.json")

const args = process.argv

function main() {

    if (args.length == 3) {
    
        if (args[2] == "--help" || args[2] == "-h") {

            console.log(`
    GamaSource v${gama.version}

    create <path> // create a template project, default use npm
    create <path> -<package> // create a template project, use package(-npm, -yarn, -pnpm, -bun)
    build // compile a gamma source project to executable binary, according to the specifications of a game.config.json or default config
    build -<package> // gamma build and use package(-npm, -yarn, -pnpm, -bun)
    --version || -v // view the version of GamaSource
    --help || -h // view the commands
            `);
            return
            
        }
        else if (args[2] == "--version" || args[2] == "-v") {

            console.log(`v${gama.version}`);
            return
            
        }
        else if (args[2] == "build") {

            console.log("starting project compilation");
            console.time("complete in")

            const tmp = os.tmpdir()

            const pack_electron = JSON.parse(fs.readFileSync(path.join(path.dirname(__filename), "/electron/package.json")).toString("utf-8"))
        
            let config = {
                name: "app",
                arch: "x64",
                icon: path.resolve("./dist/favicon.ico"),
                platform: "darwin,linux,win32",
                out: "bin"
            }

            let config_extern

            try {

                config_extern = JSON.parse(fs.readFileSync(path.resolve("./game.config.json")).toString("utf-8"))

            } catch(e) {
                
                console.log(path.resolve("./game.config.json"));
                console.log("WARNING: configuration file not found, continuing to use compilation default values");

            }

            config.name = config_extern.name ?? "game"
            config.arch = config_extern.arch ? config_extern.arch.join(',') : "x64"
            config.icon = config_extern.icon ?? path.resolve("./dist/favicon.ico")
            config.platform = config_extern.platform ? config_extern.platform.join(',') : "darwin,linux,win32"
            config.out = config_extern.out ?? "bin"
            
            pack_electron.scripts.make = `electron-packager . --arch=${config.arch} --icon=${config.icon} --platform=${config.platform} --prune=true --out=${config.out} --overwrite`

            fs.writeFileSync(path.join(path.dirname(__filename), "/electron/package.json"), JSON.stringify(pack_electron))

            shell.cp("-r", path.join(path.dirname(__filename), "/electron"), tmp)

            const tmp_electron = path.join(tmp, "/electron")

            const module = "npm install"

            if (args[4] == "-yarn")
                module = "yarn"

            else if (args[4] == "-pnpm")
                module = "pnpm install"
            
            else if (args[4] == "-bun")
                module = "bun install"

            shell.exec(`cd ${tmp_electron} && ${module}`)

            shell.cp("-r", path.resolve("dist"), tmp_electron)

            const exec = "npm run make"

            if (args[4] == "-yarn")
                exec = "yarn make"

            else if (args[4] == "-pnpm")
                exec = "pnpm make"
            
            else if (args[4] == "-bun")
                exec = "bun make"

            shell.exec(`cd ${tmp_electron} && ${exec}`)

            shell.cp("-r",path.join(`${tmp_electron}`, config.out), path.resolve("./"))

            shell.rm("-rf", tmp_electron)

            console.log("compilation finished output in folder" + config.out);
            console.timeEnd("complete in")
            return

        }
    
    } else if(args.length == 4 || args.length == 5) {

        if (args[2] == "create") {

            let name = ""

            if (args[3] == "." || args[3] == "./") {

                name = path.resolve(".").split("/")
                name = name[name.length - 1]
                
            } else {

                name = args[3].split("/")
                name = name[name.length - 1]

                shell.mkdir(name)

            }

            let module = "npm i -D typescript vite && npm i gamasource"
            let exec = "npm run dev"

            if(args.length == 5) {

                if (args[4] == "-yarn") {

                    module = "yarn add -D typescript vite && yarn add gamasource"
                    exec = "yarn dev"
                    
                }
                 else if (args[4] == "-pnpm") {

                    module = "pnpm add -D typescript vite && pnpm add gamasource"
                    exec = "pnpm run dev"
                    
                } else if (args[4] == "-bun") {

                    module = "bun add -D typescript vite && bun add gamasource"
                    exec = "bun run dev"
                    
                }

            }

            const template = path.join(path.dirname(__filename), "template")

            shell.cp('-r', `${template}/*`, args[3])

            fs.writeFileSync(path.resolve(args[3]) + "/package.json", `
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
}            
            `,)

            shell.exec(`cd ${args[3]} && ${module}`)

            console.clear()

            console.log("Execute to start your project: \n" +
            "cd " + args[3] + "\n" +
            exec);

            return
            
        }

    }

    console.log("command not found");

}

main()
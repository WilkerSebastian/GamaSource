#!/usr/bin/env node

const fs = require('fs')
const shell = require ("shelljs")
const path = require ('path')
const gama = require ("../package.json")

const args = process.argv

function main() {

    if (args.length == 3) {
    
        if (args[2] == "--help" || args[2] == "-h") {

            console.log(`
GamaSource v${gama.version}

gamma create <path> // create a template project, default use npm
gamma create <path> -<package> // create a template project, use package(-npm, -yarn, -pnpm, -bun)
gamma --version || -v // view the version of GamaSource
gamma --help || -h // view the commands
            `);
            return
            
        }
        if (args[2] == "--version" || args[2] == "-v") {

            console.log(`v${gama.version}`);
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

                if (args[4] == "yarn") {

                    module = "yarn add -D typescript vite && yarn add gamasource"
                    exec = "yarn dev"
                    
                }
                if (args[4] == "pnpm") {

                    module = "pnpm add -D typescript vite && pnpm add gamasource"
                    exec = "pnpm run dev"
                    
                }if (args[4] == "bun") {

                    module = "bun add -D typescript vite && bun add gamasource"
                    exec = "bun run dev"
                    
                } else {

                    console.log(`${module.split(" ")[0]} not found!`);
                    return

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
        "build": "tsc && vite build",
        "preview": "vite preview"
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
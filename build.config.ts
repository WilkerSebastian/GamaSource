import { build, type Options } from 'tsup'

const tsupConfig: Options = {
	entry: ['src/index.ts'],
	splitting: false,
	sourcemap: true,
  platform: "browser",
  minify: true,
	bundle: true,
} satisfies Options

await Promise.all([
  build({
    format: 'cjs',
    clean: true,
    ...tsupConfig
  }),
  build({
    format: 'esm',
    dts: true,
    ...tsupConfig
  })
])

process.exit()
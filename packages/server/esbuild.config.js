const path = require('path')
const esbuild = require('esbuild')
const { spawn } = require('child_process')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

let isDev = process.argv[2] === 'dev'
let server;

const outfile = path.join(__dirname, 'build', 'index.js')

const onRebuild = () => {
  if (isDev) {
    if (server) server.kill('SIGINT')
    server = spawn('node', [outfile], { stdio: 'inherit' })
  }
}

esbuild.build({
  entryPoints: [path.join(__dirname, 'src', 'index.ts')],
  outfile,
  bundle: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  plugins: [nodeExternalsPlugin()],
  watch: isDev && {onRebuild}
})
  .finally(onRebuild)
  .catch(() => process.exit(1))

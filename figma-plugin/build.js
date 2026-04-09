const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

async function build() {
  const distDir = path.resolve(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  // Build code.ts
  const ctx = await esbuild.context({
    entryPoints: ['src/code.ts'],
    bundle: true,
    outfile: 'dist/code.js',
    minify: !isWatch,
    target: 'es6',
  });

  if (isWatch) {
    await ctx.watch();
    console.log('👀 Watching code.ts...');
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('✅ code.ts built');
  }

  // Copy ui.html
  function copyUI() {
    fs.copyFileSync('src/ui.html', 'dist/ui.html');
    console.log('📄 ui.html copied to dist/');
  }

  copyUI();

  if (isWatch) {
    fs.watchFile('src/ui.html', () => {
      copyUI();
    });
    console.log('👀 Watching ui.html...');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});

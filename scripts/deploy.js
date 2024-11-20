const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

async function deployToFigma() {
  try {
    // Build the plugin
    await execCommand('npm run build');

    // Zip the dist folder
    const version = require('../package.json').version;
    const zipName = `plugin-v${version}.zip`;

    await execCommand(`cd dist && zip -r ../${zipName} ./*`);

    console.log(`✅ Plugin packaged successfully: ${zipName}`);
    console.log('Ready to upload to Figma');
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

deployToFigma();
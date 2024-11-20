const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

async function deployToFigma() {
  try {
    const manifestPath = path.join(__dirname, '../manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const version = require('../package.json').version;
    const zipPath = path.join(__dirname, `../dist/plugin-v${version}.zip`);

    if (!process.env.FIGMA_ACCESS_TOKEN || !process.env.FIGMA_PLUGIN_ID) {
      throw new Error('Missing Figma credentials in environment variables');
    }

    const formData = new FormData();
    formData.append('manifest', JSON.stringify(manifest));
    formData.append('plugin', fs.createReadStream(zipPath));

    const response = await fetch(
      `https://api.figma.com/v1/plugins/${process.env.FIGMA_PLUGIN_ID}/versions`,
      {
        method: 'POST',
        headers: {
          'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Figma API error: ${JSON.stringify(data)}`);
    }

    console.log('✅ Plugin deployed successfully to Figma');
    console.log(`Version: ${version}`);
    console.log(`Status: ${data.status}`);
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

deployToFigma();
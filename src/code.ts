import {
  IOS_PRESET,
  IOS_ADVANCED_PRESET,
  ANDROID_PRESET,
  ANDROID_ADVANCED_PRESET,
  WEB_PRESET,
  WEB_ADVANCED_PRESET,
} from './constants/presets';
import type { ExportPreset, PluginMessage } from './types';
import { isValidSelection, validatePreset } from './utils/validation';
import { notify } from './utils/notifications';
import { storage } from './utils/storage';
import { generateNodePreview } from './utils/preview';

figma.showUI(__html__, { width: 400, height: 600 });

// Detect user's language from Figma
const userLanguage = figma.root.getPluginData('preferredLanguage') ||
                    figma.currentPage.parent?.getPluginData('preferredLanguage') ||
                    figma.ui.language ||
                    'en';

// Send initial data to UI
figma.ui.postMessage({
  type: 'init',
  data: {
    language: userLanguage,
    selection: figma.currentPage.selection
  }
});

// Handle plugin commands from the menu
figma.on('run', async ({ command }) => {
  try {
    switch (command) {
      case 'quick-export-ios':
        await applyPreset(IOS_PRESET);
        break;
      case 'quick-export-android':
        await applyPreset(ANDROID_PRESET);
        break;
      case 'quick-export-web':
        await applyPreset(WEB_PRESET);
        break;
      case 'clear-settings':
        await clearExportSettings();
        break;
    }
  } catch (error) {
    notify.error(`Command failed: ${error.message}`);
    console.error('Command error:', error);
  }
});

// Handle messages from the UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'applySettings': {
        if (!msg.preset) {
          throw new Error('No preset selected');
        }

        const { selection } = figma.currentPage;
        if (!selection.length) {
          throw new Error('Please select at least one layer');
        }

        await applyPreset(msg.preset);
        figma.ui.postMessage({
          type: 'success',
          message: 'Export settings applied successfully',
        });
        break;
      }
      case 'clearSettings':
        await clearExportSettings();
        break;
      case 'cancel':
        figma.closePlugin();
        break;
      case 'getCustomPresets': {
        const presets = await storage.getCustomPresets();
        figma.ui.postMessage({ type: 'customPresets', presets });
        break;
      }
      case 'saveCustomPreset': {
        await storage.saveCustomPreset(msg.preset);
        const presets = await storage.getCustomPresets();
        figma.ui.postMessage({ type: 'customPresets', presets });
        notify.success('Custom preset saved');
        break;
      }
      case 'deleteCustomPreset': {
        await storage.deleteCustomPreset(msg.presetId);
        const presets = await storage.getCustomPresets();
        figma.ui.postMessage({ type: 'customPresets', presets });
        notify.success('Custom preset deleted');
        break;
      }
      case 'generatePreviews': {
        const nodes = msg.nodeIds
          .map((id) => figma.getNodeById(id))
          .filter(Boolean);

        for (const node of nodes) {
          if (node && 'exportAsync' in node) {
            const preview = await generateNodePreview(node, {
              maxWidth: 200,
              maxHeight: 200,
            });

            if (preview) {
              figma.ui.postMessage({
                type: 'previewGenerated',
                nodeId: node.id,
                preview: `data:image/png;base64,${figma.base64Encode(
                  preview
                )}`,
              });
            }
          }
        }
        break;
      }
    }
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      message: error.message,
    });
    console.error('Operation error:', error);
  }
};

async function applyPreset(preset: ExportPreset): Promise<void> {
  const { selection } = figma.currentPage;

  if (!isValidSelection(selection)) {
    throw new Error('Please select at least one layer');
  }

  const validationErrors = validatePreset(preset);
  if (validationErrors.length > 0) {
    throw new Error(`Invalid preset: ${validationErrors.join(', ')}`);
  }

  try {
    for (const node of selection) {
      node.exportSettings = preset.settings;
    }
    notify.success(`Applied ${preset.name} export settings`);
  } catch (error) {
    throw new Error(
      `Failed to apply export settings: ${error.message}`
    );
  }
}

async function clearExportSettings(): Promise<void> {
  const { selection } = figma.currentPage;

  if (!isValidSelection(selection)) {
    throw new Error('Please select at least one layer');
  }

  try {
    for (const node of selection) {
      node.exportSettings = [];
    }
    notify.success('Cleared export settings');
  } catch (error) {
    throw new Error(
      `Failed to clear export settings: ${error.message}`
    );
  }
}

function getPresetForPlatform(
  platform: string,
  isAdvanced: boolean
): ExportPreset | null {
  switch (platform) {
    case 'iOS':
      return isAdvanced ? IOS_ADVANCED_PRESET : IOS_PRESET;
    case 'Android':
      return isAdvanced ? ANDROID_ADVANCED_PRESET : ANDROID_PRESET;
    case 'Web':
      return isAdvanced ? WEB_ADVANCED_PRESET : WEB_PRESET;
    default:
      return null;
  }
}

function validateSelection(selection: readonly SceneNode[]): void {
  if (!selection.length) {
    throw new Error('Please select at least one layer');
  }

  const invalidNodes = selection.filter(
    (node) => !node.exportSettings
  );
  if (invalidNodes.length > 0) {
    throw new Error('Some selected layers cannot be exported');
  }
}

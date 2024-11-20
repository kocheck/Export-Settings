interface PreviewOptions {
  maxWidth: number;
  maxHeight: number;
  backgroundColor?: string;
}

export async function generateNodePreview(
  node: SceneNode,
  options: PreviewOptions
): Promise<Uint8Array | null> {
  try {
    // Create a clone of the node for preview
    const clone = node.clone();

    // Adjust clone size to fit preview dimensions while maintaining aspect ratio
    const scale = Math.min(
      options.maxWidth / clone.width,
      options.maxHeight / clone.height
    );

    clone.resize(clone.width * scale, clone.height * scale);

    // Generate preview bytes
    const bytes = await clone.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 1 },
    });

    // Clean up clone
    clone.remove();

    return bytes;
  } catch (error) {
    console.error('Preview generation failed:', error);
    return null;
  }
}

export function formatExportSize(
  setting: ExportSetting,
  nodeWidth: number,
  nodeHeight: number
): string {
  if (setting.constraint?.type === 'SCALE') {
    const scale = setting.constraint.value;
    return `${Math.round(nodeWidth * scale)}×${Math.round(
      nodeHeight * scale
    )}px`;
  } else if (setting.constraint?.type === 'WIDTH') {
    const scale = setting.constraint.value / nodeWidth;
    return `${setting.constraint.value}×${Math.round(
      nodeHeight * scale
    )}px`;
  } else if (setting.constraint?.type === 'HEIGHT') {
    const scale = setting.constraint.value / nodeHeight;
    return `${Math.round(nodeWidth * scale)}×${
      setting.constraint.value
    }px`;
  }
  return `${nodeWidth}×${nodeHeight}px`;
}

# Creating Custom Export Presets

This tutorial will guide you through creating and managing custom export presets for your specific needs.

## Basic Custom Preset

### Step 1: Open the Custom Preset Creator

1. Open the plugin
2. Click "Create Custom Preset"
3. You'll see the preset creation form

### Step 2: Configure Basic Settings
```typescript
// Example preset configuration
{
name: "My Custom Preset",
platform: "Custom",
settings: [
{
format: "PNG",
suffix: "@2x",
constraint: {
type: "SCALE",
value: 2
}
}
    ]
}
```

### Step 3: Add Multiple Export Settings

You can add multiple export configurations to a single preset:

1. Click "Add Export Setting"
2. Configure each setting
3. Arrange them in the desired order

## Advanced Custom Presets

### SVG Optimization

For SVG exports, consider these options:

- **Outline Text**: Convert text to paths
- **Simplify Stroke**: Optimize path data
- **Include IDs**: Preserve element IDs

### Responsive Images

Create a preset for responsive web images:
```typescript
{
name: "Responsive Web",
platform: "Web",
settings: [
{
format: "PNG",
suffix: "-small",
constraint: { type: "WIDTH", value: 320 }
},
{
format: "PNG",
suffix: "-medium",
constraint: { type: "WIDTH", value: 768 }
},
{
format: "PNG",
suffix: "-large",
constraint: { type: "WIDTH", value: 1440 }
}
]
}
```

## Best Practices

1. Use clear, descriptive names
2. Keep presets focused on specific use cases
3. Consider file size implications
4. Test presets with various layer types

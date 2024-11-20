# Getting Started

## Overview

The Export Settings Manager plugin helps you efficiently manage export settings for your Figma designs. This guide will walk you through the basic features and help you get started quickly.

## Basic Usage

### 1. Installation

Install the plugin from the Figma Plugin Store:

1. Open Figma
2. Go to Menu > Plugins > Browse Plugins
3. Search for "Export Settings Manager"
4. Click "Install"

### 2. Quick Export

The fastest way to export your designs:

1. Select one or more layers in your Figma file
2. Open the plugin (`Cmd/Ctrl + E`)
3. Choose a platform preset (iOS, Android, or Web)
4. Click "Apply Settings" or press `Cmd/Ctrl + Enter`

### 3. Platform Presets

The plugin comes with optimized presets for different platforms:

#### iOS
- 1x, 2x, 3x PNG exports
- PDF for vectors
- Optimized SVG settings

#### Android
- mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi
- Vector drawables
- Material Design guidelines

#### Web
- 1x, 2x PNG exports
- Optimized SVG
- Responsive image sets

## Advanced Features

### Custom Presets

Create your own export presets:
```typescript
const customPreset = {
name: "Custom Web",
platform: "Web",
settings: [
{
format: "PNG",
suffix: "@1x",
constraint: { type: "SCALE", value: 1 }
},
{
format: "SVG",
svgOutlineText: true
}
    ]
};
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + E` | Open plugin |
| `Cmd/Ctrl + Enter` | Apply settings |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
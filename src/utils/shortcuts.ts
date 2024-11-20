type ShortcutHandler = (event: KeyboardEvent) => void;

interface Shortcut {
  key: string;
  cmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: ShortcutHandler;
  description: string;
}

export class ShortcutManager {
  private shortcuts: Shortcut[] = [];

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  register(shortcut: Shortcut) {
    this.shortcuts.push(shortcut);
  }

  unregister(key: string) {
    this.shortcuts = this.shortcuts.filter((s) => s.key !== key);
  }

  private handleKeyDown(event: KeyboardEvent) {
    const { key, metaKey, ctrlKey, shiftKey, altKey } = event;
    const cmd = metaKey || ctrlKey;

    const matchingShortcut = this.shortcuts.find(
      (shortcut) =>
        shortcut.key.toLowerCase() === key.toLowerCase() &&
        !!shortcut.cmd === cmd &&
        !!shortcut.shift === shiftKey &&
        !!shortcut.alt === altKey
    );

    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.handler(event);
    }
  }

  getShortcuts(): Array<{ key: string; description: string }> {
    return this.shortcuts.map(
      ({ key, cmd, shift, alt, description }) => {
        const parts = [];
        if (cmd) parts.push('⌘');
        if (shift) parts.push('⇧');
        if (alt) parts.push('⌥');
        parts.push(key.toUpperCase());

        return {
          key: parts.join('+'),
          description,
        };
      }
    );
  }
}

export const shortcuts = new ShortcutManager();

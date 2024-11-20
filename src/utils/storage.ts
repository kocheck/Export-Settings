type StorageKey = string;
type StorageValue = any;

class Storage {
  private prefix = 'lazy-export:';

  async get(key: StorageKey): Promise<StorageValue | null> {
    try {
      return await figma.clientStorage.getAsync(this.prefix + key);
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  async set(key: StorageKey, value: StorageValue): Promise<void> {
    try {
      await figma.clientStorage.setAsync(this.prefix + key, value);
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  async remove(key: StorageKey): Promise<void> {
    try {
      await figma.clientStorage.deleteAsync(this.prefix + key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await figma.clientStorage.keysAsync();
      const pluginKeys = keys.filter(key => key.startsWith(this.prefix));
      await Promise.all(pluginKeys.map(key => this.remove(key)));
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }
}

export const storage = new Storage();

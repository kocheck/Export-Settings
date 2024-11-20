import type { ExportPreset } from '../types';

interface HistoryState {
  preset: ExportPreset | null;
  selection: string[];
}

export class HistoryManager {
  private states: HistoryState[] = [];
  private currentIndex = -1;
  private maxStates = 30;

  push(state: HistoryState) {
    // Remove any future states if we're not at the end
    this.states = this.states.slice(0, this.currentIndex + 1);

    // Add new state
    this.states.push(state);
    this.currentIndex++;

    // Remove oldest states if we exceed maxStates
    if (this.states.length > this.maxStates) {
      this.states.shift();
      this.currentIndex--;
    }
  }

  undo(): HistoryState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.states[this.currentIndex];
    }
    return null;
  }

  redo(): HistoryState | null {
    if (this.currentIndex < this.states.length - 1) {
      this.currentIndex++;
      return this.states[this.currentIndex];
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.states.length - 1;
  }

  clear() {
    this.states = [];
    this.currentIndex = -1;
  }
}

export const history = new HistoryManager();

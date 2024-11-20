import { writable } from 'svelte/store';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    add: (toast: Omit<Toast, 'id'>) => {
      update((toasts) => [...toasts, { ...toast, id: Date.now() }]);
    },
    remove: (id: number) => {
      update((toasts) => toasts.filter((t) => t.id !== id));
    },
  };
}

export const toasts = createToastStore();

export const showToast = {
  success: (message: string, duration = 3000) => {
    toasts.add({ type: 'success', message, duration });
  },
  error: (message: string, duration = 4000) => {
    toasts.add({ type: 'error', message, duration });
  },
  info: (message: string, duration = 3000) => {
    toasts.add({ type: 'info', message, duration });
  },
};

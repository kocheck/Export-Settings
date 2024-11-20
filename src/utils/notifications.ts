type NotificationType = 'success' | 'error' | 'warning';

interface NotificationOptions {
  timeout?: number;
  type?: NotificationType;
}

export function showNotification(
  message: string,
  options: NotificationOptions = {}
) {
  const { timeout = 2000, type = 'success' } = options;

  // Error notifications should stay longer
  const actualTimeout = type === 'error' ? 3500 : timeout;

  figma.notify(message, { timeout: actualTimeout });
}

export const notify = {
  success: (message: string, timeout?: number) =>
    showNotification(message, { type: 'success', timeout }),

  error: (message: string, timeout?: number) =>
    showNotification(message, { type: 'error', timeout }),

  warning: (message: string, timeout?: number) =>
    showNotification(message, { type: 'warning', timeout }),
};

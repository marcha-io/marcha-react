import { notification } from 'antd';
import { useState } from 'react';

interface AuthActionOptions {
  /**
   * Title shown in the error notification when the action fails.
   * Defaults to 'Something went wrong'.
   */
  errorTitle?: string;
}

interface AuthActionResult {
  isLoading: boolean;
  /** Render this at the top of your component to mount the notification portal. */
  contextHolder: React.ReactElement;
  /**
   * Wraps an async Supabase auth call.  Pass a factory that returns the call;
   * the hook handles loading state and shows an error notification on failure.
   * Returns `true` on success, `false` on failure.
   */
  run: (action: () => Promise<{ error: Error | null }>) => Promise<boolean>;
  /** Show a success notification manually (e.g. after a delayed redirect). */
  notifySuccess: (title: string, description?: string) => void;
}

/**
 * Shared hook for all auth form cards.
 *
 * Centralises:
 * - `isLoading` state toggling around the async call
 * - Ant Design notification context holder
 * - Error notification on Supabase auth failure
 */
const useAuthAction = (options: AuthActionOptions = {}): AuthActionResult => {
  const { errorTitle = 'Something went wrong' } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const run = async (
    action: () => Promise<{ error: Error | null }>
  ): Promise<boolean> => {
    setIsLoading(true);
    const { error } = await action();
    setIsLoading(false);

    if (error != null) {
      api.error({
        title: errorTitle,
        description: error.message,
        duration: 5,
        pauseOnHover: true,
      });
      return false;
    }

    return true;
  };

  const notifySuccess = (title: string, description?: string) => {
    api.success({ title, description, duration: 3 });
  };

  return { isLoading, contextHolder, run, notifySuccess };
};

export default useAuthAction;

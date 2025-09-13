declare module 'notistack' {
  import { SnackbarKey, SnackbarProviderProps } from 'notistack';

  export interface OptionsObject {
    variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
    autoHideDuration?: number;
    anchorOrigin?: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
    [key: string]: any;
  }

  export interface ProviderContext {
    enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
  }

  export const useSnackbar: () => ProviderContext;
  export const SnackbarProvider: React.ComponentType<SnackbarProviderProps>;
  export const withSnackbar: <P extends object>(
    Component: React.ComponentType<P>,
  ) => React.ComponentType<Omit<P, keyof ProviderContext>>;
}

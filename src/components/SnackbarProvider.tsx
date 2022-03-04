import {
  Alert,
  AlertColor,
  Fade,
  Snackbar,
  SnackbarProps,
} from '@mui/material';
import * as React from 'react';
import { useContext, useState } from 'react';

type SnackbarConfig = {
  message?: string;
  severity?: AlertColor;
};
type ShowSnackbarType = (message: string, config?: SnackbarConfig) => void;
type CloseSnackbarType = () => void;
type SnackbarContextType = {
  show: ShowSnackbarType;
  success: ShowSnackbarType;
  error: ShowSnackbarType;
  close: CloseSnackbarType;
};

const SnackbarContext = React.createContext<SnackbarContextType>({
  show: (message: string, config?: SnackbarConfig) => {},
  close: () => {},
  success: (message: string, config?: SnackbarConfig) => {},
  error: (message: string, config?: SnackbarConfig) => {},
});

export const useSnackbar = (): SnackbarContextType => {
  return useContext(SnackbarContext);
};

const SnackbarProvider: React.FC = (props) => {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState<SnackbarConfig>({});

  const showSnackbar: ShowSnackbarType = (
    message: string,
    config?: SnackbarConfig
  ): void => {
    setConfig({
      message,
      ...config,
    });

    setShow(true);
  };

  const closeSnackbar: CloseSnackbarType = (): void => setShow(false);

  const snackbarProviderValue: SnackbarContextType = {
    show: showSnackbar,
    close: closeSnackbar,
    success: (message: string, config?: SnackbarConfig) =>
      showSnackbar(message, { severity: 'success', ...config }),
    error: (message: string, config?: SnackbarConfig) =>
      showSnackbar(message, { severity: 'error', ...config }),
  };

  return (
    <SnackbarContext.Provider value={snackbarProviderValue}>
      <Snackbar
        {...{
          autoHideDuration: 4000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          onClose: closeSnackbar,
          TransitionComponent: Fade,
          ...config,
        }}
        open={show}
      >
        <Alert
          variant="filled"
          onClose={closeSnackbar}
          severity={config.severity}
        >
          {config.message}
        </Alert>
      </Snackbar>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

import { Fade, Theme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const Popover = (theme: Theme) => {
  return {
    MuiPopover: {
      defaultProps: {
        TransitionComponent: Transition,
      },
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows?.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
};

export default Popover;

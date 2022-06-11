import { Box, SxProps, Theme, useTheme } from '@mui/material';
import React from 'react';

type SimpleBlobProps = {
  color?: string;
  sx?: SxProps<Theme>;
};

export const SimpleBlob: React.FC<SimpleBlobProps> = ({ color, sx }) => {
  const theme = useTheme();

  return (
    <Box sx={sx}>
      <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color ?? theme.palette.primary.main}
          d="M63.2,-39.9C70.7,-23.6,57.8,1.2,43.8,22.9C29.9,44.7,14.9,63.6,-1.6,64.5C-18.1,65.4,-36.3,48.4,-49.3,27.2C-62.3,5.9,-70.2,-19.6,-61.1,-36.9C-52,-54.1,-26,-63.2,0.9,-63.8C27.9,-64.3,55.8,-56.3,63.2,-39.9Z"
          transform="translate(75 75)"
        />
      </svg>
    </Box>
  );
};

export type ChildPosition = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
};

type BackgroundBlobProps = {
  blob: React.ReactNode;
  sx?: SxProps<Theme>;
  position?: ChildPosition;
};

export const BackgroundBlob: React.FC<BackgroundBlobProps> = ({
  blob,
  children,
  sx,
  position,
}) => {
  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      {blob}
      <Box
        sx={{
          width: 'inherit',
          height: 'inherit',
          position: 'absolute',
          top: 0,
          right: 0,
          ...position,
        }}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  );
};

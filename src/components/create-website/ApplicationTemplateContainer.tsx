import {
  ButtonBase,
  Card,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export type ApplicationTemplateContainerProps = {
  name: string;
  icon?: IconProp;
  svg?: string;
  onClick: () => void;
  selected?: boolean;
};

const ApplicationTemplateContainer: React.FC<
  ApplicationTemplateContainerProps
> = ({ name, icon, svg, onClick, selected = false }) => {
  const { palette } = useTheme();
  const textColor = selected ? palette.secondary.contrastText : undefined;

  return (
    <Card
      sx={{
        bgcolor: selected ? palette.secondary.main : undefined,
        width: 120,
        height: 120,
        display: 'inline-block',
      }}
    >
      <ButtonBase onClick={onClick}>
        <Stack
          sx={{
            p: 2,
            bgcolor: 'primary',
            width: 120,
            height: 120,
          }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {icon ? (
            <FontAwesomeIcon size="3x" color={textColor} icon={icon} />
          ) : (
            <Image
              layout="fill"
              alt="Application icon"
              src={`/../../assets/icons/${svg}`}
            />
          )}
          <Typography color={textColor} variant="subtitle1">
            {name}
          </Typography>
        </Stack>
      </ButtonBase>
    </Card>
  );
};

export default ApplicationTemplateContainer;

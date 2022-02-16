import styled from '@emotion/styled';
import { SvgIconComponent } from '@mui/icons-material';
import { alpha, Button, ButtonProps, useTheme } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import '../../src/theme';

export type DrawerItemProps = {
  text: string;
  icon: SvgIconComponent;
  route: string;
};

export type DrawerMenuButtonProps = ButtonProps & {
  selected: boolean;
};

const ColorButton = styled(Button)<DrawerMenuButtonProps>`
  background-color: ${({ theme, selected }) =>
    selected ? alpha(theme.palette.primary.main, 0.2) : ''};
  display: flex;
  justify-content: start;
  align-items: left;
  padding: 12px 18px;
  text-transform: revert;
  border-radius: 8;
`;

const DrawerItem: React.FC<DrawerItemProps> = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const selected = router.asPath === props.route;

  const ColoredIcon = styled(props.icon)`
    color: ${selected ? theme.palette.primary.main : ''};
  `;

  return (
    <Link href={props.route} passHref={true}>
      <ColorButton
        selected={selected}
        startIcon={<ColoredIcon />}
        color={selected ? 'primary' : 'inherit'}
        variant="text"
      >
        {props.text}
      </ColorButton>
    </Link>
  );
};

export default DrawerItem;

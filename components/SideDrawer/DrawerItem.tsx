import styled from '@emotion/styled';
import { SvgIconComponent } from '@mui/icons-material';
import { alpha, Stack, Theme, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import '../../src/theme';

export type DrawerItemProps = {
  text: string;
  icon: SvgIconComponent;
  route: string;
};

export type DrawerItemContainerProps = {
  selected: boolean;
  theme: Theme;
};

const DrawerItemContainer = styled(Stack)<DrawerItemContainerProps>`
  padding: 12px 16px;
  background-color: ${(props: DrawerItemContainerProps) =>
    alpha(props.theme.palette.primary.main, props.selected ? 0.1 : 0.0)};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props: DrawerItemContainerProps) =>
      props.selected ? alpha(props.theme.palette.primary.main, 0.1) : 'gray'};
  }
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
      <DrawerItemContainer
        theme={theme}
        selected={selected}
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <ColoredIcon />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: selected ? 500 : 300,
            color: selected ? theme.palette.primary.main : '',
          }}
        >
          {props.text}
        </Typography>
      </DrawerItemContainer>
    </Link>
  );
};

export default DrawerItem;

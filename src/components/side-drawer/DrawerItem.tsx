import styled from '@emotion/styled';
import { SvgIconComponent } from '@mui/icons-material';
import {
  alpha,
  Button,
  ButtonProps,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export type DrawerItemProps = {
  text: string;
  icon: SvgIconComponent;
  route: string;
};

export type DrawerMenuButtonProps = ButtonProps & {
  selected: boolean;
};

const DrawerItem: React.FC<DrawerItemProps> = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const selected = router.asPath === props.route;

  const ColoredIcon = styled(props.icon)`
    color: ${selected
      ? theme.palette.primary.main
      : theme.palette.text.secondary};
  `;

  return (
    <Link href={props.route} passHref={true}>
      <ListItemButton
        sx={{
          borderRadius: 1,
          padding: '12px 16px',
          mt: 0.5,
        }}
        selected={selected}
      >
        <ListItemIcon>
          <ColoredIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography
            sx={{
              color: selected ? 'primary.main' : 'text.secondary',
              fontSize: [14, '!important'],
              fontWeight: selected ? 700 : 500,
            }}
          >
            {props.text}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default DrawerItem;

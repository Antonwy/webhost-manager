import { Theme } from '@mui/material';
import Alert from './Alert';
import Avatar from './Avatar';
import Button from './Button';
import Card from './Card';
import Dialog from './Dialog';
import Fab from './Fab';
import Popover from './Popover';
import Select from './Select';

const componentsOverrides = (theme: Theme) => {
  return Object.assign(
    Card(theme),
    Button(theme),
    Fab(theme),
    Dialog(theme),
    Select(theme),
    Avatar(theme),
    Popover(theme),
    Alert(theme)
  );
};

export default componentsOverrides;

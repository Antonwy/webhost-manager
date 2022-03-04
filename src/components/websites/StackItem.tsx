import styled from '@emotion/styled';
import { Card, Link, Stack, Typography } from '@mui/material';
import WordPressIcon from '../../assets/icons/wordpress.svg';
import Image from 'next/image';
import StackModel from '../../models/stack';
import { useContext } from 'react';
import { API } from '../../api/API';
import DeleteButton from '../DeleteButton';
import { ReloadWebsitesContext } from '../../pages/websites';
import axios from 'axios';
import { useSnackbar } from '../SnackbarProvider';

const StackItemContainer = styled(Card)`
  padding: 18px;
  min-width: 300px;
`;

type StackItemProps = {
  stack: StackModel;
};

const StackItem: React.FC<StackItemProps> = ({ stack }) => {
  const reloadWebsites = useContext(ReloadWebsitesContext);
  const snackbar = useSnackbar();

  const removeStack = async () => {
    try {
      const res = await API.removeStack(stack.id);
      snackbar.success(res.message);
      reloadWebsites();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return snackbar.error('Internal Error');
      }

      return snackbar.error('Internal Error');
    }
  };

  const url = 'http://' + stack.url;

  return (
    <StackItemContainer>
      <Stack direction="row" spacing={1} alignItems="center">
        <Image src={WordPressIcon} alt="WordPress Icon" />
        <Typography variant="h6">{stack.name}</Typography>
      </Stack>
      <Typography variant="caption">
        URL:&nbsp;
        <Link target="_blank" href={url}>
          <b>{stack.url}</b>
        </Link>
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 4 }}
      >
        <Typography variant="caption">Remove Website?</Typography>
        <DeleteButton
          message={`Do you want to delete ${stack.name}?`}
          handleDelete={removeStack}
        />
      </Stack>
    </StackItemContainer>
  );
};

export default StackItem;

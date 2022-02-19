import useSWR from 'swr';
import Stack from '../../../models/stack';
import { API } from '../../API';
import { ApiError } from '../../responses/apiError';

const useGetStacksHook = (): {
  stacks: Stack[];
  loading: boolean;
  error?: ApiError;
  reload: () => Promise<Stack[] | undefined>;
} => {
  const { data, error, mutate } = useSWR('/stacks', API.fetcher);

  return {
    stacks: data?.data ?? [],
    loading: !data && !error,
    error: error,
    reload: mutate,
  };
};

export default useGetStacksHook;

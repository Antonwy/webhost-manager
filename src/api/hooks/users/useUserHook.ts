import useSWR from 'swr';
import User from '../../../models/user';
import { API } from '../../API';
import { ApiError } from '../../responses/apiError';

const useUserHook = (
  id?: string
): {
  user: User;
  loading: boolean;
  error?: ApiError;
  reload: () => Promise<User | undefined>;
} => {
  const { data, error, mutate } = useSWR(
    `/users/${id ? id : 'me'}`,
    API.fetcher
  );

  return {
    user: data?.data ?? [],
    loading: !data && !error,
    error: error,
    reload: mutate,
  };
};

export default useUserHook;

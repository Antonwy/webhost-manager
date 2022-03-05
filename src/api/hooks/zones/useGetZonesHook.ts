import useSWR from 'swr';
import DNSZone from '../../../models/dns_zone';
import Stack from '../../../models/stack';
import { API } from '../../API';
import { ApiError } from '../../responses/apiError';

const useGetZonesHook = (): {
  zones: DNSZone[];
  loading: boolean;
  error?: ApiError;
  reload: () => Promise<Stack[] | undefined>;
} => {
  const { data, error, mutate } = useSWR('/zones', API.fetcher);

  return {
    zones: data?.data ?? [],
    loading: !data && !error,
    error: error,
    reload: mutate,
  };
};

export default useGetZonesHook;

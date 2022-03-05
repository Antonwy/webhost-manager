import useSWR from 'swr';
import { CloudflareDNSZone } from '../../../models/cloudflare_dns_zone';
import { API } from '../../API';
import { ApiError } from '../../responses/apiError';

const useGetCloudflareZonesHook = (): {
  zones: CloudflareDNSZone[];
  loading: boolean;
  error?: ApiError;
  reload: () => Promise<CloudflareDNSZone[] | undefined>;
} => {
  const { data, error, mutate } = useSWR('/cloudflare/zones', API.fetcher);

  return {
    zones: data?.data ?? [],
    loading: !data && !error,
    error: error,
    reload: mutate,
  };
};

export default useGetCloudflareZonesHook;

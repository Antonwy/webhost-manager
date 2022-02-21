import useSWR from 'swr';
import { DNSRecord } from '../../../models/dns_record';
import { DNSZone } from '../../../models/dns_zone';
import { API } from '../../API';
import { ApiError } from '../../responses/apiError';

const useGetDNSRecordsHook = (
  zoneId?: string
): {
  records: DNSRecord[];
  loading: boolean;
  error?: ApiError;
  reload: () => Promise<DNSRecord[] | undefined>;
} => {
  const { data, error, mutate } = useSWR(
    zoneId ? `/zones/${zoneId}/records` : null,
    API.fetcher
  );

  return {
    records: data?.data ?? [],
    loading: !data && !error,
    error: error,
    reload: mutate,
  };
};

export default useGetDNSRecordsHook;

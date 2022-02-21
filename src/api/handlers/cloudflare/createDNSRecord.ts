import axios from 'axios';
import { DNSRecord } from '../../../models/dns_record';
import { CreateDNSRecordInput } from '../../requests/cloudflare/createDNSRecord';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

export const createDNSRecordHandler = async (
  zoneId: string,
  config: CreateDNSRecordInput
): Promise<ApiResponse<DNSRecord>> => {
  try {
    const res = await axios.post<ApiResponse<DNSRecord>>(
      `/zones/${zoneId}/records`,
      {
        type: config.type,
        name: config.name,
        content: config.content,
        ttl: config.ttl,
        proxied: config.proxied,
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couln't create DNS record!`);
    }
  }
};

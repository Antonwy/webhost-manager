import axios from 'axios';
import DNSZone from '../../../models/dns_zone';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

const syncZonesHandler = async (): Promise<DNSZone[]> => {
  try {
    const res = await axios.post<ApiResponse<DNSZone[]>>(`/zones/sync`);

    return res.data.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couldn't sync zones!`);
    }
  }
};

export default syncZonesHandler;

import axios from 'axios';
import DNSZone from '../../../models/dns_zone';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

const createZoneHandler = async (zone: DNSZone): Promise<void> => {
  try {
    await axios.post<ApiResponse<null>>(`/zones`, zone);

    return;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couldn't create zone!`);
    }
  }
};

export default createZoneHandler;

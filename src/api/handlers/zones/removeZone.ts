import axios from 'axios';
import DNSZone from '../../../models/dns_zone';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

const removeZoneHandler = async (zone: DNSZone): Promise<void> => {
  try {
    await axios.delete<ApiResponse<null>>(`/zones/${zone.id}`);

    return;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couldn't delete zone!`);
    }
  }
};

export default removeZoneHandler;

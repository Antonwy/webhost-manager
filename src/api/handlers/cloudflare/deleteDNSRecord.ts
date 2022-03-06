import axios from 'axios';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

export const deleteDNSRecordHandler = async (
  zoneId: string,
  recordId: string
): Promise<ApiResponse<null>> => {
  try {
    const res = await axios.delete<ApiResponse<null>>(
      `/cloudflare/zones/${zoneId}/records/${recordId}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couln't delete DNS record!`);
    }
  }
};

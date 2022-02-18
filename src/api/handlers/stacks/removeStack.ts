import axios from 'axios';
import { ApiResponse } from '../../responses/apiResponse';

export const removeStackHandler = async (
  id: string
): Promise<ApiResponse<null>> => {
  const res = await axios.delete<ApiResponse<null>>(`/stacks/${id}`);
  return res.data;
};

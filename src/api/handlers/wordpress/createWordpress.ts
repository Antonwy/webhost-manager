import axios from 'axios';
import Stack from '../../../models/stack';
import { CreateWordPressInput } from '../../requests/wordpress/createWordpress';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

export const createWordpressHandler = async (
  config: CreateWordPressInput
): Promise<ApiResponse<Stack>> => {
  try {
    const res = await axios.post<ApiResponse<Stack>>('/wordpress/', {
      name: config.name,
      port: config.port,
      db_username: config.dbUsername,
      db_password: config.dbPassword,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couln't create WordPress site!`);
    }
  }
};

import axios from 'axios';
import User from '../../../models/user';
import { ApiError } from '../../responses/apiError';
import { ApiResponse } from '../../responses/apiResponse';

const updateUserHandler = async (user: User): Promise<void> => {
  try {
    await axios.put<ApiResponse<null>>(`/users/${user.id}`, user);

    return;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      throw new ApiError(err.response?.data.message ?? err.message);
    } else {
      throw new ApiError(`Couldn't update User!`);
    }
  }
};

export default updateUserHandler;

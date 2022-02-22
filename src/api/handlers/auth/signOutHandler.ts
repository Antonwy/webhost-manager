import axios from 'axios';
import { ApiError } from '../../responses/apiError';
import { AuthResponse } from '../../responses/authResponse';

export const signOutHandler = async (): Promise<{ status: string }> => {
  try {
    const res = await axios.post<AuthResponse>(`/auth/signout`, {});

    return res.data;
  } catch (err) {
    throw new ApiError(`Couln't signout user!`);
  }
};

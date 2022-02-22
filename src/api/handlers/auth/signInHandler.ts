import axios from 'axios';
import { SignInInput } from '../../requests/auth/SignInInput';
import { ApiError } from '../../responses/apiError';
import { AuthResponse } from '../../responses/authResponse';

export const signInHandler = async (
  values: SignInInput
): Promise<AuthResponse> => {
  try {
    const body = {
      formFields: [
        {
          id: 'email',
          value: values.email,
        },
        {
          id: 'password',
          value: values.password,
        },
      ],
    };
    const res = await axios.post<AuthResponse>(`/auth/signin`, body);
    console.log(res);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new ApiError('Wrong credentials!');
    } else {
      throw new ApiError(`Couln't signin user!`);
    }
  }
};

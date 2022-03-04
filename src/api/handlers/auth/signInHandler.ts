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

    if (res.data.status != 'OK') {
      switch (res.data.status) {
        case 'WRONG_CREDENTIALS_ERROR':
          throw new ApiError('Wrong Credentials! Please try again!');
        default:
          throw new ApiError('Internal Server Error!');
      }
    }

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new ApiError('Connection failure!');
    } else if (err instanceof ApiError) {
      throw err;
    } else {
      throw new ApiError(`Internal Server Error!`);
    }
  }
};

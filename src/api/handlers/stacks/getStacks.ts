import axios from 'axios';
import Stack from '../../../models/stack';
import { ApiResponse } from '../../responses/apiResponse';

export const getStacksHandler = async (): Promise<Stack[]> => {
  const res = await axios.get<ApiResponse<Stack[]>>('/stacks');
  console.log(res.config);
  return res.data.data;
};

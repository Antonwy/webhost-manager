import axios from 'axios';
import { Container } from '../../../models/container';
import { ApiResponse } from '../../responses/apiResponse';

export const getContainersHandler = async (): Promise<Container[]> => {
  const res = await axios.get<ApiResponse<Container[]>>('/docker/containers');
  return res.data.data;
};

import { Container } from './models/container';

const apiUrl =
  process.env.NODE_ENV == 'production'
    ? 'http://antonwy.me:3001/api/v1'
    : 'http://antonwy.me:3001/api/v1';

export const getContainers = async (): Promise<Container[]> => {
  const res = await fetch(`${apiUrl}/docker/containers`);
  const data = await res.json();

  return data.data;
};

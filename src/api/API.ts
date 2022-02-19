import axios from 'axios';
import { createWordpressHandler } from './handlers/wordpress/createWordpress';
import { getContainersHandler } from './handlers/docker/getContainers';
import { removeStackHandler } from './handlers/stacks/removeStack';
import useGetStacksHook from './hooks/stacks/useGetStacksHook';

axios.defaults.baseURL =
  process.env.NODE_ENV == 'production'
    ? 'http://api.antonwy.me/v1'
    : 'http://localhost:3001/v1';

export namespace API {
  export const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  export const getContainers = getContainersHandler;

  export const useGetStacks = useGetStacksHook;
  export const removeStack = removeStackHandler;

  export const createWordPressSite = createWordpressHandler;
}

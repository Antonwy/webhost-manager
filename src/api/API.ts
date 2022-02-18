import axios from 'axios';
import { createWordpressHandler } from './handlers/wordpress/createWordpress';
import { getContainersHandler } from './handlers/docker/getContainers';
import { getStacksHandler } from './handlers/stacks/getStacks';
import { removeStackHandler } from './handlers/stacks/removeStack';

axios.defaults.baseURL =
  process.env.NODE_ENV == 'production'
    ? 'http://api.antonwy.me/v1'
    : 'http://localhost:3001/api/v1';

export namespace API {
  export const getContainers = getContainersHandler;

  export const getStacks = getStacksHandler;
  export const removeStack = removeStackHandler;

  export const createWordPressSite = createWordpressHandler;
}

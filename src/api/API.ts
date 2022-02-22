import axios from 'axios';
import { createWordpressHandler } from './handlers/wordpress/createWordpress';
import { getContainersHandler } from './handlers/docker/getContainers';
import { removeStackHandler } from './handlers/stacks/removeStack';
import useGetStacksHook from './hooks/stacks/useGetStacksHook';
import useGetDNSZonesHook from './hooks/stacks/useGetDNSZonesHook';
import useGetDNSRecordsHook from './hooks/stacks/useGetDNSRecordsHook';
import { createDNSRecordHandler } from './handlers/cloudflare/createDNSRecord';
import Session from 'supertokens-auth-react/recipe/session';
import { signInHandler } from './handlers/auth/signInHandler';
import { signOutHandler } from './handlers/auth/signOutHandler';

axios.defaults.baseURL =
  process.env.NODE_ENV == 'production'
    ? 'https://api.antonwy.me/v1'
    : 'http://localhost:3001/v1';

Session.addAxiosInterceptors(axios);

export namespace API {
  export const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  export const getContainers = getContainersHandler;

  export const useGetStacks = useGetStacksHook;
  export const removeStack = removeStackHandler;

  export const createWordPressSite = createWordpressHandler;

  export const useGetDNSZones = useGetDNSZonesHook;
  export const useGetDNSRecords = useGetDNSRecordsHook;
  export const createDNSRecord = createDNSRecordHandler;

  export const signIn = signInHandler;
  export const signOut = signOutHandler;
}

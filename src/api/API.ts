import axios from 'axios';
import { createWordpressHandler } from './handlers/wordpress/createWordpress';
import { getContainersHandler } from './handlers/docker/getContainers';
import { removeStackHandler } from './handlers/stacks/removeStack';
import useGetStacksHook from './hooks/stacks/useGetStacksHook';
import useGetDNSRecordsHook from './hooks/cloudflare/useGetDNSRecordsHook';
import { createDNSRecordHandler } from './handlers/cloudflare/createDNSRecord';
import Session from 'supertokens-auth-react/recipe/session';
import { signInHandler } from './handlers/auth/signInHandler';
import { signOutHandler } from './handlers/auth/signOutHandler';
import { config } from '../utils/config';
import useGetDNSZonesHook from './hooks/cloudflare/useGetDNSZonesHook';
import useUserHook from './hooks/users/useUserHook';

axios.defaults.baseURL = `${config.apiUrl}/v1`;

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

  export const useUser = useUserHook;

  export const signIn = signInHandler;
  export const signOut = signOutHandler;
}

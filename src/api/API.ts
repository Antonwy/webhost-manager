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
import useGetCloudflareZonesHook from './hooks/cloudflare/useGetCloudflareZonesHook';
import useUserHook from './hooks/users/useUserHook';
import updateUserHandler from './handlers/users/updateUser';
import useGetZonesHook from './hooks/zones/useGetZonesHook';
import createZoneHandler from './handlers/zones/createZone';
import removeZoneHandler from './handlers/zones/removeZone';
import syncZonesHandler from './handlers/zones/syncZones';
import { deleteDNSRecordHandler } from './handlers/cloudflare/deleteDNSRecord';

axios.defaults.baseURL = `${config.apiUrl}/v1`;

Session.addAxiosInterceptors(axios);

export namespace API {
  export const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  export const getContainers = getContainersHandler;

  export const useGetStacks = useGetStacksHook;
  export const removeStack = removeStackHandler;

  export const createWordPressSite = createWordpressHandler;

  export const useCloudflareZones = useGetCloudflareZonesHook;
  export const useGetDNSRecords = useGetDNSRecordsHook;
  export const createDNSRecord = createDNSRecordHandler;
  export const deleteDNSRecord = deleteDNSRecordHandler;

  export const useUser = useUserHook;

  export const updateUser = updateUserHandler;

  export const useZones = useGetZonesHook;
  export const createZone = createZoneHandler;
  export const removeZone = removeZoneHandler;
  export const syncZones = syncZonesHandler;

  export const signIn = signInHandler;
  export const signOut = signOutHandler;
}

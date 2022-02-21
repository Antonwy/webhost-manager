export type CreateDNSRecordInput = {
  type: string;
  name: string;
  content: string;
  proxied: boolean;
  ttl: number; // defaults to 1 => let cloudflare handle it
};

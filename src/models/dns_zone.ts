export interface DNSZoneMeta {
  step: number;
  wildcard_proxiable: boolean;
  custom_certificate_quota: number;
  page_rule_quota: number;
  phishing_detected: boolean;
  multiple_railguns_allowed: boolean;
}

export interface DNSZoneOwner {
  id: string;
  type: string;
  email: string;
}

export interface DNSZoneAccount {
  id: string;
  name: string;
}

export interface DNSZonePlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  frequency: string;
  is_subscribed: boolean;
  can_subscribe: boolean;
  legacy_id: string;
  legacy_discount: boolean;
  externally_managed: boolean;
}

export interface DNSZone {
  id: string;
  name: string;
  status: string;
  paused: boolean;
  type: string;
  development_mode: number;
  name_servers: string[];
  original_name_servers: string[];
  original_registrar?: any;
  original_dnshost?: any;
  modified_on: Date;
  created_on: Date;
  activated_on: Date;
  meta: DNSZoneMeta;
  owner: DNSZoneOwner;
  account: DNSZoneAccount;
  permissions: string[];
  plan: DNSZonePlan;
}

export interface _location {
  country_code: string;
  country: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  ip_address: string;
  region: string;
}

export default async function getLocation() {
  return {
    country_code: '',
    country: '',
    city: '',
    postal_code: '',
    latitude: 0,
    longitude: 0,
    ip_address: '192.168.1.1',
    region: '',
  };
}

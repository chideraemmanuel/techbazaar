import axios from 'axios';
import { useQuery } from 'react-query';

export interface IPInformationResponse {
  query: string;
  status: 'success' | 'error';
  continent: string;
  continentCode: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  district: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  offset: number;
  currency: string;
  isp: string;
  org: string;
  as: string;
  asname: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
}

const useIPInformation = () => {
  return useQuery({
    queryKey: ['get ip address information'],
    queryFn: async () => {
      const IP_response = await axios.get<{ ip: string }>(
        'https://api.ipify.org/?format=json'
      );

      const IP_information_response = await axios.get<IPInformationResponse>(
        `http://ip-api.com/json/${IP_response.data.ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query`
      );

      return IP_information_response.data;
    },
    retry: false,
    cacheTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useIPInformation;

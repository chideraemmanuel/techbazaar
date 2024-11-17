import axios from '@/config/axios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

interface Param {
  visitor_id: string;
  referrer: string;
  referrer_full_url: string;
  ip_address: string;
}

interface Data extends Pick<Param, 'visitor_id' | 'ip_address'> {
  referrer?: string;
  referrer_full_url?: string;
}

const updateViews = async ({
  visitor_id,
  referrer,
  referrer_full_url,
  ip_address,
}: Param) => {
  const data: Data = {
    visitor_id,
    ip_address,
  };

  if (referrer !== '') {
    data.referrer = referrer;
  }

  if (referrer_full_url !== '') {
    data.referrer_full_url = referrer_full_url;
  }

  const response = await axios.post<{ message: string }>('/views', data);

  return response.data;
};

const useUpdateViews = () => {
  return useMutation({
    mutationKey: ['update views'],
    mutationFn: updateViews,
    onSuccess: (data) => {
      console.log('dataa', data);
    },
    onError: (error: AxiosError<{ error: string }>) => {},
  });
};

export default useUpdateViews;

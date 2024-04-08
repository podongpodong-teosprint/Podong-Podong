import { useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'apis';
import { TypePodoShcema } from './podo';

export const useMainPodoQuery = () => {
  return useQuery({
    queryKey: ['mainPodo'],
    queryFn: async () => {
      const response = await client.get<TypePodoShcema | undefined>(`/podo/main`);
      return response.data;
    },
  });
};

export const useMainRegisterMutation = () => {
  return useMutation({
    mutationFn: function (podoId: string) {
      return client.post(`/podo/register`, { podoId });
    },
  });
};

export const usePodoStatusToCompletedMutation = () => {
  return useMutation({
    mutationFn: function () {
      return client.post(`/podo/completed`);
    },
  });
};

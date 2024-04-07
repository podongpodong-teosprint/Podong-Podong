import { useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'apis';

export type TypePodoShcema = {
  podoId: string;
};

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

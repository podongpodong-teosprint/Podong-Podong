import { useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'apis';

export type TypePodoShcema = {
  podoId?: string;
  title: string;
  status?: string;
  description?: string;
  author?: string;
  link?: string;
  translator?: string;
  publisher?: string;
  ISBN?: string;
  pages?: number;
  year?: string;
};

export const usePodoQuery = (podoId: string) => {
  return useQuery({
    queryKey: ['podo', podoId],
    queryFn: async () => {
      const response = await client.get<TypePodoShcema>(`/podo/${podoId}`);
      return response.data;
    },
  });
};

export const usePodoListQuery = () => {
  return useQuery({
    queryKey: ['podolist'],
    queryFn: async () => {
      const response = await client.get<TypePodoShcema[]>(`/podo/all`);
      return response.data;
    },
  });
};

export const usePodoUploadMutation = () => {
  return useMutation({
    mutationFn: function (podo: Omit<TypePodoShcema, 'podoId'>) {
      return client.post(`/podo`, podo);
    },
  });
};

import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'apis';

const queryClient = new QueryClient();

/**
 * const { data, isError, isLoading, isSuccess } = useSampleQuery();
 * @returns
 */
export const useSampleQuery = () => {
  return useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const response = await client.get('/post');
      return response.data;
    },
  });
};

/**
 * const { isPending, isSuccess, isError, error, mutate } = useSampleMutation();
 * mutate({ key1:"value1" });
 * @returns
 */
export const useUploadMutation = () => {
  return useMutation({
    mutationFn: function (params: TypeParams) {
      return client.post(`/post`, params);
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const useDeleteMutation = () => {
  return useMutation({
    mutationFn: function (params: { id: string }) {
      console.log('params', params);
      return client.delete(`/post/${params.id}`, { data: params });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

type TypeParams = {
  key: string;
};

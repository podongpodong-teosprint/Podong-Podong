import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'apis';

const queryClient = new QueryClient();

/**
 * const { data, isError, isLoading, isSuccess } = useSampleQuery();
 * @returns
 */
export const useSampleQuery = () => {
  return useQuery({
    queryKey: ['sample'],
    queryFn: async () => {
      console.log('sample');
      const reponse = await client.get('/sample');
      return reponse.data.data;
    },
  });
};

/**
 * const { isPending, isSuccess, isError, error, mutate } = useSampleMutation();
 * mutate({ key1:"value1" });
 * @returns
 */
export const useSampleMutation = () =>
  useMutation({
    mutationFn: function (params: TypeParams) {
      return client.post(`/sample`, params);
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['sample'] });
    },
  });

type TypeParams = {
  key1: string;
};

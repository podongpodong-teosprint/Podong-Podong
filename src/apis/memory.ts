import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'apis';
import { TypeGrape } from 'components/podo/types';

const queryClient = new QueryClient();

export type TypeMemorySchema = {
  memoryId: string;
  bookId: string;
  memory: string;
  date: string;
  density: TypeGrape;
};

export const useMemoryQuery = (bookId: string) => {
  return useQuery({
    queryKey: ['memory', bookId],
    queryFn: async () => {
      const response = await client.get<TypeMemorySchema[]>(`/memory/${bookId}`);
      return response.data;
    },
  });
};

export const useMemoryUploadMutation = () => {
  return useMutation({
    mutationFn: function (memory: TypeMemorySchema) {
      return client.post(`/memory`, memory);
    },
    onSuccess: function (_, memory) {
      queryClient.invalidateQueries({ queryKey: ['memory', memory.bookId] });
    },
  });
};

export const useMemoryUpdateMutation = () => {
  return useMutation({
    mutationFn: function (memory: TypeMemorySchema) {
      return client.put(`/memory/${memory.memoryId}`, memory);
    },
    onSuccess: function (_, memory) {
      queryClient.invalidateQueries({ queryKey: ['memory', memory.bookId] });
    },
  });
};

export const useMemoryDeleteMutation = () => {
  return useMutation({
    mutationFn: function (params: Pick<TypeMemorySchema, 'memoryId' | 'bookId'>) {
      return client.delete(`/memory/${params.memoryId}`);
    },
    onSuccess: function (_, params) {
      queryClient.invalidateQueries({ queryKey: ['memory', params.bookId] });
    },
  });
};
import { useQuery } from '@tanstack/react-query';
import { client } from 'apis';

export type TypeBookSchema = {
  bookId: number;
  title: string;
  description: string;
  author: string;
  link?: string;
  translator?: string;
  publisher?: string;
  ISBN?: string;
  pages?: number;
  year?: string;
};

export const useBookQuery = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await client.get<TypeBookSchema>(`/book/${id}`);
      return response.data;
    },
  });
};

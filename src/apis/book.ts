import { useQuery } from '@tanstack/react-query';
import { client } from 'apis';

export type TypeBookSchema = {
  bookId?: number;
  title: string;
  thumbnail: string;
  description?: string;
  authors: string[];
  link?: string;
  translator?: string;
  publisher?: string;
  isbn?: string;
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

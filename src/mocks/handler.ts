// https://mswjs.io/docs/basics/intercepting-requests

import { TypeMemorySchema } from 'apis/memory';
import { http, HttpResponse } from 'msw';

const allPosts = new Map();

const memories = new Map<string, TypeMemorySchema>([
  ['0', { density: 1, bookId: '1', date: '2021-01-01', memory: 'memory1', memoryId: '0' }],
  ['1', { density: 2, bookId: '1', date: '2021-01-01', memory: 'memory2', memoryId: '1' }],
  ['2', { density: 3, bookId: '1', date: '2021-01-01', memory: 'memory3', memoryId: '2' }],
  ['3', { density: 1, bookId: '1', date: '2021-01-01', memory: 'memory1', memoryId: '3' }],
  ['4', { density: 2, bookId: '1', date: '2021-01-01', memory: 'memory2', memoryId: '4' }],
  ['5', { density: 3, bookId: '1', date: '2021-01-01', memory: 'memory3', memoryId: '5' }],
]);

export const handlers = [
  http.get('/post', (/**{ request, params, cookies } */) => {
    return HttpResponse.json(Array.from(allPosts));
  }),
  http.post('/post', async ({ request }) => {
    const newPost = await request.json();
    allPosts.set(allPosts.size.toString(), newPost);
    return HttpResponse.json(newPost, { status: 201 }); // newly created
  }),
  http.delete('/post/:id', ({ params }) => {
    const { id } = params;
    const deletedPost = allPosts.get(id);
    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }
    allPosts.delete(id);
    return HttpResponse.json(deletedPost);
  }),
  http.get('/user-error', () => {
    return new HttpResponse(null, { status: 401 }); // unauthorized error
  }),
  http.get('/network-error', () => {
    return HttpResponse.error();
  }),
  http.get('/memory/:bookId', ({ params }) => {
    const { bookId } = params;
    return HttpResponse.json(Object.fromEntries(memories.entries()));
  }),
];

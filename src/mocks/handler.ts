// https://mswjs.io/docs/basics/intercepting-requests

import { TypeMemorySchema } from 'apis/memory';
import { TypePodoShcema } from 'apis/podo';
import { http, HttpResponse } from 'msw';

const allPosts = new Map();

const mainPodo = {
  podoId: '',
};

const podoList = new Map<string, TypePodoShcema>([
  [
    '0',
    {
      podoId: '0',
      title: 'title0',
      status: 'reading',
      description: 'description0',
      author: 'author0',
    },
  ],
  [
    '1',
    {
      podoId: '1',
      title: 'title1',
      status: 'reading',
      description: 'description1',
      author: 'author1',
    },
  ],
]);

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
  http.post('/memory', async ({ request }) => {
    const newPost = (await request.json()) as TypeMemorySchema;
    memories.set(newPost.memoryId, newPost);
    return HttpResponse.json(newPost, { status: 201 }); // newly created
  }),
  http.delete('/memory/:memoryId', async ({ params }) => {
    const { memoryId } = params;
    memories.delete(memoryId as string);
    return HttpResponse.json({ status: 202 });
  }),
  http.get('/podo/all', () => {
    return HttpResponse.json(Object.fromEntries(podoList.entries()));
  }),
  http.post('/podo', async ({ request }) => {
    const newPodo = (await request.json()) as Omit<TypePodoShcema, 'podoId'>;
    podoList.set(podoList.size.toString(), { ...newPodo, podoId: podoList.size.toString() });
    return HttpResponse.json(newPodo, { status: 201 }); // newly created
  }),
  http.get('/podo/main', () => {
    const mainPodoData = podoList.get(mainPodo.podoId);
    return HttpResponse.json(mainPodoData);
  }),
  http.get('/podo/:podoId', ({ params }) => {
    const { podoId } = params;
    return HttpResponse.json(podoList.get(podoId as string));
  }),
  http.post('/podo/register', async ({ request }) => {
    const newMainPodo = (await request.json()) as TypePodoShcema;
    mainPodo.podoId = newMainPodo.podoId;
    return HttpResponse.json({ status: 201 }); // newly created
  }),
];

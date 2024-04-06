// https://mswjs.io/docs/basics/intercepting-requests

import { http, HttpResponse } from 'msw';

const allPosts = new Map();

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
];

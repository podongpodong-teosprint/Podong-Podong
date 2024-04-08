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
      title: '일류의 조건',
      status: 'reading',
      description:
        '시대와 세대를 초월한 자기계발서 바이블, 《일류의 조건》  독자들의 출간 요청 쇄도로 18년 만에 복간! “어떠한 분야에서도 단연 돋보이는 존재가 될 수 있는 능력은 무엇인가?”',
      author: '사이토 다카시',
      link: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193262122.jpg',
    },
  ],
  [
    '1',
    {
      podoId: '1',
      title: '무엇이 나를 행복하게 만드는가',
      status: 'reading',
      description:
        '아무 걱정 없이 행복하게 웃어본 적이 언제인지 기억이 나는가? 어느 순간부터 행복과 활기를 잊고 정체된 삶을 살아가고 있다. 포브스가 선정한 TOP 5 코치에 선정된 리처드 J. 라이더의 대표작',
      author: '리처드 J. 라이더',
      link: 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791198530356.jpg',
    },
  ],
]);

const memories = new Map<string, TypeMemorySchema>([
  ['0', { density: 1, bookId: '0', date: '2024-03-07', memory: '일류가 되려는자, 힘들때 웃어라..', memoryId: '0' }],
  ['1', { density: 2, bookId: '0', date: '2021-03-08', memory: '요약하는 힘', memoryId: '1' }],
  [
    '2',
    {
      density: 3,
      bookId: '0',
      date: '2021-03-09',
      memory: '적극적으로 훔치고, 간명하게 요약하여, 용감하게 추진하라!',
      memoryId: '2',
    },
  ],
  ['3', { density: 1, bookId: '0', date: '2021-02-10', memory: '나는 일류아니다.. "0류다"', memoryId: '3' }],
  ['4', { density: 2, bookId: '0', date: '2021-02-12', memory: '책읽기싫다', memoryId: '4' }],
  [
    '5',
    { density: 3, bookId: '0', date: '2021-02-13', memory: '진정 우리에게 필요한 능력은 무엇인가?', memoryId: '5' },
  ],
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
    const filteredMemories = Array.from(memories.entries()).filter(([_, memory]) => memory.bookId === bookId);
    return HttpResponse.json(Object.fromEntries(filteredMemories));
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
  http.post('/podo/completed', async ({ request }) => {
    const podo = podoList.get(mainPodo.podoId);
    podoList.set(mainPodo.podoId, { ...podo, status: 'completed' });
    return HttpResponse.json({ status: 204 });
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

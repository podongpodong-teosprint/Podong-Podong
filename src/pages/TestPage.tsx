import { TypePodoShcema, usePodoListQuery, usePodoUploadMutation } from 'apis/podo';

export default function TestPage() {
  const { data: podoList, refetch: getPodoList } = usePodoListQuery();

  const { mutate } = usePodoUploadMutation();

  const samplePodo: Omit<TypePodoShcema, 'status' | 'podoId'> = {
    title: 'title',
    description: 'description',
    author: 'sample',
  };

  return (
    <div>
      <p>{JSON.stringify(podoList)}</p>
      <button onClick={() => getPodoList()} className="p-4 bg-purple">
        shoot
      </button>

      <button onClick={() => mutate({ ...samplePodo, status: 'reading' })}>등록하기</button>
      <button onClick={() => mutate({ ...samplePodo, status: 'wish' })}>찜하기</button>
    </div>
  );
}

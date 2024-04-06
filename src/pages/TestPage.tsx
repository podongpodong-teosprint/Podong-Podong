import { useUploadMutation, useDeleteMutation, useSampleQuery } from 'apis/sample';
import { useState } from 'react';

export default function TestPage() {
  const { data, refetch: refetchPost } = useSampleQuery();
  const { mutate: uploadPost } = useUploadMutation();
  const { mutate: deletePost } = useDeleteMutation();

  const [value, setValue] = useState('');

  return (
    <div>
      <h1>data: {JSON.stringify(data)}</h1>
      <div className="flex flex-col">
        <input className="border bg-red-100" value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button onClick={() => uploadPost({ key: value })}>add</button>
        <button onClick={() => refetchPost()}>refetch</button>
        <button onClick={() => deletePost({ id: value })}>delete</button>
      </div>
    </div>
  );
}

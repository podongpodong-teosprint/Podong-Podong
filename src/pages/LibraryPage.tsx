import { useMemo } from 'react';
import Podo from 'components/library/Podo';
import EmptyPodo from 'components/library/EmptyPodo';
import { TypePodoShcema, usePodoListQuery } from 'apis/podo';

export default function LibraryPage() {
  const { data: podoList, isSuccess } = usePodoListQuery();
  const podoListData = useMemo(() => {
    return !isSuccess ? [] : Object.values(podoList);
  }, [isSuccess, podoList]);

  return (
    <>
      <div className="">
        <h2 className="text-title">포동포동의 서재</h2>
        <ul className="flex space-x-5">
          <li>전체</li>
          <li>읽은 책</li>
          <li>읽고 있는 책</li>
          <li>읽고 싶은 책</li>
        </ul>
      </div>
      <div className="grid self-start grid-cols-3 place-items-center">
        {podoListData?.map((podo: TypePodoShcema) => {
          return (
            <div className="flex flex-col items-center">
              <Podo param={podo.podoId} />
              <p>{podo.title}</p>
            </div>
          );
        })}
        <div className="flex flex-col items-center">
          <EmptyPodo />
          <p>포도를 등록하세요</p>
        </div>
      </div>
    </>
  );
}
// TODO: 서재용 포도로 나중에 따로 컴포넌트 빼야

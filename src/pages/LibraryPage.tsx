import { useMemo } from 'react';
import Podo from 'components/library/Podo';
import EmptyPodo from 'components/library/EmptyPodo';
import { TypePodoShcema, usePodoListQuery } from 'apis/podo';

export default function LibraryPage() {
  const { data: podoList, isSuccess } = usePodoListQuery();
  const podoListData = useMemo(() => {
    return !isSuccess ? [] : Object.values(podoList);
  }, [isSuccess, podoList]);

  // const podoListData = () => {
  //   if (!isSuccess) return [];
  //   return Object.values(podoList);
  // };

  // let podoListData: TypePodoShcema[];

  // useEffect(() => {
  //   console.log(podoList);
  // }, [podoList]);

  // if (!isSuccess) {
  //   podoListData = [];
  // } else {
  //   podoListData = Object.values(podoList);
  // }
  // console.log(podoListData);

  return (
    <>
      <div className="">
        <h2 className="text-title">포동포동의 서재</h2>
        <ul className="flex space-x-5">{['전체', '읽은 책', '읽고 있는 책', '읽고 싶은 책'].join('   |   ')}</ul>
      </div>
      <div className="grid self-start grid-cols-3 place-items-center">
        {podoListData?.map((podo: TypePodoShcema) => {
          return (
            <div className="flex flex-col items-center" key={podo.podoId}>
              <Podo param={podo.podoId} />
              <p className="text-center">{podo.title.slice(0, 8).concat(podo.title.length >= 8 ? '..' : '')}</p>
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

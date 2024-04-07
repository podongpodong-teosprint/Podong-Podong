import { TypeMemorySchema, useMemoryQuery } from 'apis/memory';
import Accordion from 'components/cores/design/Accordion';
import Button from 'components/cores/design/Button';
import Dropdown from 'components/cores/design/Dropdown';
import Loading from 'components/cores/design/Loading';
import Podo from 'components/podo';
import { useCallback, useMemo, useState } from 'react';

type TypeSort = 'latest' | 'density';
type TypeCmpFunc = (a: TypeMemorySchema, b: TypeMemorySchema) => number;

export default function MainPage() {
  const [sortType, setSortType] = useState<TypeSort>('latest');
  const { data: memories, isError, isLoading, isSuccess } = useMemoryQuery('1');

  const cmpFuncByType = useCallback((type: TypeSort): TypeCmpFunc => {
    return function (a: TypeMemorySchema, b: TypeMemorySchema) {
      if (type === 'latest') {
        return a.memoryId < b.memoryId ? 1 : -1;
      } else if (type === 'density') {
        return a.density < b.density ? 1 : -1;
      } else {
        return 0;
      }
    };
  }, []);

  const memoizedMemories = useMemo(() => {
    return !isSuccess ? [] : Object.values(memories);
  }, [isSuccess, memories]);

  const sortedMemories = useMemo(() => {
    return memoizedMemories.sort(cmpFuncByType(sortType));
  }, [cmpFuncByType, memoizedMemories, sortType]);

  return (
    <div className="flex flex-col relative">
      <Podo memories={memories ?? []} />
      <Dropdown
        onClick={(item) => setSortType(item.value as TypeSort)}
        items={[
          { label: '최신순', value: 'latest' },
          { label: '농도순', value: 'density' },
        ]}
      />
      <div>
        {isLoading && <Loading />}
        {isError && <div>Error..</div>}
        {isSuccess &&
          sortedMemories.map((memory) => (
            <Accordion date={memory.date} number={Number(memory.memoryId)} text={memory.memory} />
          ))}
      </div>
      <Button text="다읽었어요" onClick={() => alert('다읽어어요')} />
    </div>
  );
}

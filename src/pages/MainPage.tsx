import { TypeMemorySchema, useMemoryQuery } from 'apis/memory';
import MainPageModal from 'components/MainPageModal';
import { TypeModalState } from 'components/MainPageModal/types';
import Progressbar from 'components/Progressbar';
import Accordion from 'components/cores/design/Accordion';
import Button from 'components/cores/design/Button';
import Dropdown from 'components/cores/design/Dropdown';
import Loading from 'components/cores/design/Loading';
import Podo from 'components/podo';
import { useToday } from 'hooks/useToday';
import { useCallback, useMemo, useRef, useState } from 'react';

type TypeSort = 'latest' | 'density';
type TypeCmpFunc = (a: TypeMemorySchema, b: TypeMemorySchema) => number;

export default function MainPage() {
  const INITIAL_MODAL_STATE = {
    number: '0',
    content: '',
    density: -1,
    date: useToday(),
  };
  const [sortType, setSortType] = useState<TypeSort>('latest');
  const [modalState, setModalState] = useState<TypeModalState>(INITIAL_MODAL_STATE);
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

  const handleModalChange = (type: 'content' | 'density') => (value: string | number) => {
    setModalState((prev) => ({ ...prev, [type]: value }));
  };
  const handleSave = () => {
    console.log('modalState', modalState);
  };

  const handleCancel = () => {
    setModalState(INITIAL_MODAL_STATE);
  };

  const modalRef = useRef<{ showModal: () => void }>(null);

  const openModal = (memoryId: string) => {
    const foundMemory = memoizedMemories.find((memory) => memory.memoryId === memoryId);
    const memory = foundMemory
      ? { number: memoryId, content: foundMemory?.memory, density: foundMemory?.density, date: foundMemory?.date }
      : { ...INITIAL_MODAL_STATE, number: memoryId };
    setModalState(memory);
    if (modalRef && modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col relative">
      <Podo memories={memories ?? []} onClick={(memoryId) => openModal(memoryId)} />

      <div>
        16알 중 {memoizedMemories.length}알 모으는중!
        <Progressbar value={memoizedMemories.length} maxValue={16} label={false}></Progressbar>
      </div>

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
            <Accordion
              key={`memory-${memory.memoryId}`}
              date={memory.date}
              number={Number(memory.memoryId)}
              text={memory.memory}
            />
          ))}
      </div>
      <Button text="다읽었어요" onClick={() => alert('다읽어어요')} />
      <MainPageModal
        ref={modalRef}
        state={modalState}
        handleChange={handleModalChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}

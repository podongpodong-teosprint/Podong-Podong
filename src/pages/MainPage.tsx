import { TypeMemorySchema, useMemoryDeleteMutation, useMemoryQuery, useMemoryUploadMutation } from 'apis/memory';
import Accordion from 'components/MainPageAccordion';
import MainPageConfirm, { TypeConfirmState } from 'components/MainPageConfirm';
import MainPageModal from 'components/MainPageModal';
import { TypeModalState } from 'components/MainPageModal/types';
import Progressbar from 'components/Progressbar';
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
    memoryId: '0',
    memory: '',
    density: 0,
    date: useToday(),
  };
  const [sortType, setSortType] = useState<TypeSort>('latest');
  const [confirmState, setConfirmState] = useState<TypeConfirmState>();
  const [modalState, setModalState] = useState<TypeModalState>(INITIAL_MODAL_STATE);
  const { data: memories, isError, isLoading, isSuccess, refetch } = useMemoryQuery('1');

  const { mutate: uploadMemory } = useMemoryUploadMutation();
  const { mutate: deleteMemory } = useMemoryDeleteMutation();

  const cmpFuncByType = useCallback((type: TypeSort): TypeCmpFunc => {
    return function (a: TypeMemorySchema, b: TypeMemorySchema) {
      if (type === 'latest') {
        return Number(a.memoryId) < Number(b.memoryId) ? 1 : -1;
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

  const modalRef = useRef<{ showModal: () => void; close: () => void }>(null);
  const confirmRef = useRef<{ showModal: () => void; close: () => void }>(null);

  const closeModal = () => {
    if (modalRef && modalRef.current) {
      setModalState(INITIAL_MODAL_STATE);
      modalRef.current.close();
    }
  };

  const handleModalChange = (type: 'memory' | 'density') => (value: string | number) => {
    setModalState((prev) => ({ ...prev, [type]: value }));
  };
  const handleSave = () => {
    uploadMemory(
      { ...modalState, bookId: '1' },
      {
        onSuccess: () => {
          refetch();
          closeModal();
        },
      }
    );
  };

  const closeConfirm = () => {
    if (confirmRef && confirmRef.current) {
      confirmRef.current.close();
    }
  };

  const handleConfirm = (memoryId: string) => {
    deleteMemory(
      { memoryId, bookId: '1' },
      {
        onSuccess: () => {
          refetch();
          closeConfirm();
        },
      }
    );
  };

  const handleDelete = (memoryId: string) => {
    confirmRef.current?.showModal();
    setConfirmState((prev) => ({ ...prev, memoryId }));
  };

  const openModal = (memoryId: string) => {
    const foundMemory = memoizedMemories.find((memory) => memory.memoryId === memoryId);
    const memory = foundMemory
      ? { memoryId: memoryId, memory: foundMemory?.memory, density: foundMemory?.density, date: foundMemory?.date }
      : { ...INITIAL_MODAL_STATE, memoryId: memoryId };
    setModalState(memory);
    if (modalRef && modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col relative">
      <img className="absolute right-10 top-10 w-[110px] h-[100px]" src={'/ic_you_did_good_job.png'}></img>

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
      <div className="flex flex-col gap-2">
        {isLoading && <Loading />}
        {isError && <div>Error..</div>}
        {isSuccess &&
          sortedMemories.map((memory) => (
            <Accordion
              key={`memory-${memory.memoryId}`}
              date={memory.date}
              number={Number(memory.memoryId)}
              text={memory.memory}
              handleUpdate={() => openModal(memory.memoryId)}
              handleDelete={() => handleDelete(memory.memoryId)}
            />
          ))}
      </div>
      <Button text="다읽었어요" onClick={() => alert('다읽어어요')} />
      <MainPageModal
        ref={modalRef}
        state={modalState}
        handleChange={handleModalChange}
        handleSave={handleSave}
        handleCancel={closeModal}
      />
      <MainPageConfirm ref={confirmRef} state={confirmState} handleConfirm={handleConfirm} handleCancel={() => {}} />
    </div>
  );
}

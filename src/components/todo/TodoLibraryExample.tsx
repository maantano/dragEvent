import { TItems, TItemStatus } from '@/pages/todo';
import { $ } from '@/utils';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

export default function TodoLibraryExample({
  items,
  setItems,
}: {
  items: TItems;
  setItems: (items: TItems) => void;
}) {
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceKey = source.droppableId as TItemStatus;
    const destinationKey = destination.droppableId as TItemStatus;

    const _items = JSON.parse(JSON.stringify(items)) as typeof items;
    const [targetItem] = _items[sourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // 에니메이션 이벤트 최적화 => requestAnimationFrame
    // - 백그라운드 동작 및 비활성화시 중지(성능 최적화)
    // - 최대 1ms(1/1000s)로 제한되며 1초에 60번 동작
    // - 다수의 애니메이션에도 각각 타이머 값을 생성 및 참조하지 않고 내부의 동일한 타이머 참

    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      // 에니메이션 정지 이벤트 =>  cancelAnimationFrame
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">react-beautiful-dnd</h1>
        <span>with react library</span>
      </div>

      <div className="mt-4 flex">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid flex-1 select-none grid-cols-2 gap-4 rounded-lg">
            {Object.keys(items).map((key) => (
              <Droppable key={key} droppableId={key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={$(
                      'flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]',
                      snapshot.isDraggingOver ? 'shadow-lg' : 'shadow',
                    )}
                  >
                    <span className="text-xs font-semibold">{key.toLocaleUpperCase()}</span>
                    {items[key as TItemStatus].map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={$(
                              'rounded-lg bg-white p-4 transition-shadow dark:bg-[#121212]',
                              snapshot.isDragging
                                ? 'bg-opacity-90 shadow-2xl shadow-gray-400'
                                : 'shadow',
                            )}
                          >
                            <h5 className="font-semibold">{item.title}</h5>
                            <span className="text-sm text-gray-500">Make the world beatiful</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

import DNDMatchExample from '@/components/dnd/DNDMatchExample';

export default function DNDPage() {
  return (
    <>
      <div className="mt-36 flex items-center justify-center">
        혹시😁 DRAG에 대한 경험을 하고 싶으시다면
        <br /> 아래 알파벳을 위의 알파벳에 맞춰서 넣으세요 : )
      </div>
      <DNDMatchExample />
    </>
  );
}

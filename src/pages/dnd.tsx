import DNDMatchExample from '@/components/dnd/DNDMatchExample';
import Link from 'next/link';

export default function DNDPage() {
  return (
    <>
      <div className="mt-36 flex items-center justify-center">
        혹시😁 DRAG에 대한 경험을 하고 싶으시다면
        <br /> 아래 알파벳을 위의 알파벳에 맞춰서 넣으세요 : )
      </div>
      <DNDMatchExample />

      <div className="mt-64 mr-5 text-right">
        <p>평안(bepyan)님 많은 도움 받았습니다.</p>
        <p>한번 방문해보세요! 좋은글이 많습니다.</p>
        <Link href={'http://bepyan.me'} target="_blank">
          bepyan.me
        </Link>
      </div>
    </>
  );
}

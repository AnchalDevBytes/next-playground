"use client";
import dynamic from 'next/dynamic';

const Board = dynamic(() => import("@/app/kanban/components/Board"), {
  ssr: false,
});

const Kanban = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
        <Board/>
    </div>
  )
}

export default Kanban;

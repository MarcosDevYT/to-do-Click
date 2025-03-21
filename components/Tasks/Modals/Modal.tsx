"use client";

import { useGlobalState } from "@/utils/globalProvider";

export default function Modal({ content }: { content: React.ReactNode }) {
  const { closeModal } = useGlobalState();

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100] flex items-center justify-center">
      <div
        className="cursor-pointer absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md"
        onClick={closeModal}
      ></div>
      <div className="p-6 px-10 relative w-[630px] z-50 shadow-xl shadow-black/50 rounded-2xl bg-secondBg">
        {content}
      </div>
    </div>
  );
}

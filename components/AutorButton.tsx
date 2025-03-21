"use client";

import { LinkIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const AutorButton = () => {
  const [activeAutor, setActiveAutor] = useState(false);

  const handleAutor = () => {
    setActiveAutor(!activeAutor);
  };

  return (
    <aside className={`fixed z-[100] top-4 right-6 rounded-xl bg-sidebarbg`}>
      <article
        onClick={handleAutor}
        className="px-3 py-[0.65rem] rounded-full cursor-pointer font-semibold text-lg"
      >
        Autor
      </article>
      <article
        className={`fixed w-full h-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center ${
          activeAutor ? "flex" : "hidden"
        }`}
      >
        <div className="relative w-full h-full">
          <div
            className="w-full h-full bg-black/60 cursor-pointer"
            onClick={handleAutor}
          />
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-xl w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-secondBg">
            <div className="relative">
              <X
                className="absolute top-2 right-2 w-7 h-7 md:w-9 md:h-9 cursor-pointer p-1 bg-bg rounded-lg"
                strokeWidth={2}
                onClick={handleAutor}
              />
              <div className="p-6 ">
                <div className="flex items-center gap-4 mb-3 md:mb-10">
                  <Link href={"/"}>
                    <Image
                      src={"/marcos.jpg"}
                      alt="Foto de Marcos Morua autor"
                      className="rounded-full overflow-hidden h-[75px] w-[75px] md:h-[100px] md:w-[100px] object-cover"
                      objectFit="cover"
                      width={150}
                      height={150}
                    />
                  </Link>
                  <h3 className="text-xl md:text-2xl font-semibold text-titleColor flex flex-col">
                    <span>Marcos</span>
                    <span>Morua</span>
                  </h3>
                </div>

                <p className="text-sm md:text-base font-semibold">
                  Aqui Marcos Morua, Programador Frontend y creador de este
                  to-do List.
                </p>
                <p className="text-sm md:text-base font-medium my-2 md:my-4">
                  Este proyecto es un to-do List de practica hecho con NextJS,
                  Tailwind, Prisma, MongoDB, Clerk y Typescript
                </p>
                <Link
                  href={"https://portfolio-marcos-dev.vercel.app/"}
                  className="flex items-center gap-2 text-green-500 text-base md:text-xl font-semibold mt-5 md:mt-8 w-fit"
                >
                  Portafolio Personal{" "}
                  <LinkIcon className="w-5 h-5 md:w-7 md:h-7" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </aside>
  );
};

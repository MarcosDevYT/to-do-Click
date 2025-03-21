"use client";

import React from "react";
import CreateContent from "./Modals/CreateContent";
import TaskItem from "./TaskItem/TaskItem";
import Modal from "./Modals/Modal";
import { useGlobalState } from "@/utils/globalProvider";
import { Plus } from "lucide-react";
import TaskEdit from "./TaskEdit/TaskEdit";
import ModalEdit from "./TaskEdit/ModalEdit";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt?: string;
}

interface Props {
  title: string;
  tasks: Task[];
}

export default function Tasks({ title, tasks }: Props) {
  const { isLoading, openModal, modal, modalEdit } = useGlobalState();

  return (
    <section className="w-full h-[88vh]">
      {modal && <Modal content={<CreateContent />} />}
      {modalEdit && <ModalEdit content={<TaskEdit />} />}
      <h1 className="text-center text-2xl font-bold font-inter text-titleColor">
        To-do Click
      </h1>
      <article className="tasks-container mt-4 p-5 px-8 bg-secondBg rounded-lg relative w-full h-full">
        <h2 className="text-xl font-bold w-max relative after:content[''] after:absolute after:-bottom-2 after:left-0 after:w-2/6 after:h-1 after:rounded-full after:bg-green-500 ">
          {title}
        </h2>
        {!isLoading ? (
          <div className="my-8 tasks grid">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                isImportant={task.isImportant}
                id={task.id}
              />
            ))}
            <button
              className="flex items-center justify-center gap-2 h-72 rounded-2xl border-dashed border-[3px] bg-bg border-grayColorBg text-grayColorText text-xl font-semibold
                        hover:bg-grayColorBg hover:text-zinc-400 transition-all duration-300"
              onClick={openModal}
            >
              <Plus size={25} strokeWidth={3} /> Agregar Nueva Tarea
            </button>
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-green-500 shadow-lg shadow-bg/50"
              onClick={openModal}
            >
              <Plus size={25} strokeWidth={3} color="#fff" />
            </button>
          </div>
        ) : (
          <div className="tasks-loader w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )}
      </article>
    </section>
  );
}

"use client";

import formatDate from "@/utils/formatDate";
import { useGlobalState } from "@/utils/globalProvider";
import { CircleAlert, FilePenLine, Trash2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;

  id: string;
}

export default function TaskItem({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
}: Props) {
  const { deleteTask, updateTask, editTask } = useGlobalState();

  return (
    <article className="taskItem relative p-4 rounded-xl shadow-md h-72 flex flex-col gap-2 border border-[#bbabfc14]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-2xl font-medium">{title}</h3>
        <span
          onClick={() => {
            const task = {
              id,
              isImportant: !isImportant,
            };
            console.log(isImportant);

            updateTask(task);
          }}
          className={`p-2 cursor-pointer flex items-center justify-center hover:bg-bg hover:text-slate-100 rounded-lg transition-all duration-300 ${
            isImportant
              ? "bg-bg text-slate-100"
              : "bg-transparent text-gray-500"
          }`}
        >
          <CircleAlert size={25} strokeWidth={2} />
        </span>
      </div>
      <p>{description}</p>
      <p className="mt-auto">{formatDate(date)}</p>

      <div className="flex items-center gap-5">
        {isCompleted ? (
          <button
            className="inline-block p-[0.4rem] px-6 rounded-full bg-green-600 text-base font-semibold"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completo
          </button>
        ) : (
          <button
            className="inline-block p-[0.4rem] px-6 rounded-full bg-red-600 text-base font-semibold"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incompleto
          </button>
        )}
        <button
          className="ml-auto"
          onClick={() => {
            const task = {
              title,
              description,
              date,
              isCompleted,
              isImportant,
              id,
            };

            editTask(task);
          }}
        >
          <FilePenLine size={25} strokeWidth={2} />
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          <Trash2 size={25} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

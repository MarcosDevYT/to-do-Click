"use client";

import Button from "@/components/ui/Button";
import { useGlobalState } from "@/utils/globalProvider";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { allTasks, closeModal } = useGlobalState();

  const handleChange =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Si es un checkbox, forzamos el tipado a HTMLInputElement
      if (name === "completed" || name === "important") {
        const target = e.target as HTMLInputElement;
        if (target.type === "checkbox") {
          if (name === "completed") {
            setCompleted(target.checked);
          } else if (name === "important") {
            setImportant(target.checked);
          }
        }
      } else {
        // Para inputs de texto o textarea
        const { value } = e.target;
        switch (name) {
          case "title":
            setTitle(value);
            break;
          case "description":
            setDescription(value);
            break;
          case "date":
            setDate(value);
            break;
          default:
            break;
        }
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        allTasks();
        closeModal();
        toast.success("Task created successfully.");
      }
    } catch (error) {
      toast.error("Failed to create the task");
      console.error(error);
    }
  };

  return (
    <form className="text-zinc-300" onSubmit={handleSubmit}>
      <h3 className="text-slate-100 text-xl font-semibold">
        Crear Nueva Tarea
      </h3>

      {/* Title */}
      <div className="input-control">
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="Nombre de la tarea"
        />
      </div>

      {/* Description */}
      <div className="input-control">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          rows={4}
          name="description"
          onChange={handleChange("description")}
          placeholder="Cual es la tarea"
        />
      </div>

      {/* Date */}
      <div className="input-control">
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        {/* Completed */}
        <div className="input-control toggler">
          <label htmlFor="completed">Completo</label>
          <input
            type="checkbox"
            id="completed"
            value={completed.toString()}
            name="completed"
            onChange={handleChange("completed")}
          />
        </div>

        {/* important */}
        <div className="input-control toggler">
          <label htmlFor="important">Importante</label>
          <input
            type="checkbox"
            id="important"
            value={important.toString()}
            name="important"
            onChange={handleChange("important")}
          />
        </div>
      </div>

      {/* Submit btn */}

      <div className="submit-btn">
        <Button
          type="submit"
          name="Crear Tarea"
          icon={<Plus size={25} strokeWidth={3} className="-ml-3" />}
          className="inline-flex gap-2 items-center px-10 py-3 font-medium text-xl bg-[#27AE60] rounded-lg transition-all duration-200 hover:-translate-y-2"
        />
      </div>
    </form>
  );
};

export default CreateContent;

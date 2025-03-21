"use client";

import Button from "@/components/ui/Button";
import { useGlobalState } from "@/utils/globalProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const TaskEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [taskId, setTaskId] = useState("");

  const { updateTask, taskContent, closeModalEdit } = useGlobalState();

  console.log(taskContent);

  // Sincronizar `taskContent` con los estados locales
  useEffect(() => {
    if (taskContent) {
      const {
        id = "",
        title = "",
        description = "",
        date = "",
        isCompleted = false,
        isImportant = false,
      } = taskContent;

      setTitle(title);
      setDescription(description);
      setDate(date);
      setCompleted(isCompleted);
      setImportant(isImportant);
      setTaskId(id);
    }
  }, [taskContent]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      id: taskId, // Incluye el ID para que el backend sepa qué tarea actualizar
      title,
      description,
      date,
      isCompleted: completed, // Nota: Cambia "completed" por "isCompleted"
      isImportant: important, // Nota: Cambia "important" por "isImportant"
    };

    try {
      const res = await axios.put("/api/tasks", task); // Cambia de POST a PUT

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        updateTask(); // Actualiza las tareas en tu estado global
        closeModalEdit(); // Cierra el modal
        toast.success("Task updated successfully.");
      }
    } catch (error) {
      toast.error("Failed to update the task");
      console.error(error);
    }
  };

  return (
    <form className="text-zinc-300" onSubmit={handleSubmit}>
      <h3 className="text-slate-100 text-xl font-semibold">Editar Tarea</h3>

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
            checked={completed}
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
            checked={important}
            name="important"
            onChange={handleChange("important")}
          />
        </div>
      </div>

      {/* Submit btn */}

      <div className="submit-btn">
        <Button
          type="submit"
          name="Editar Tarea"
          icon={<Plus size={25} strokeWidth={3} className="-ml-3" />}
          className="inline-flex gap-2 items-center px-10 py-3 font-medium text-xl bg-[#27AE60] rounded-lg transition-all duration-200 hover:-translate-y-2"
        />
      </div>
    </form>
  );
};

export default TaskEdit;

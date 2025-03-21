"use client"

import { useContext, useEffect, useState } from "react";
import { createContext } from "react"
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => { 
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [taskContent, setTaskContent] = useState({});

  // Modal
  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  //Edit task

  const editTask = (task) => {
    setModalEdit(true);
    setTaskContent(task)
  }

  const closeModalEdit = () => {
    setModalEdit(false);
    setTaskContent({});
  }

  // funcion para mostrar las tareas
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks")

      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })

      setTasks(sorted)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // function para borrar tareas
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`)
      toast.success("Task deleted successfully");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }

  }

  // funcion para cambiar el estado de completo/incompleto
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      console.log("Tasks fetched:", res.data); 
      toast.success("Task updated");

      allTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  // funcion para mostrar las tareas completas
  const completedTasks = tasks.filter((tasks) => tasks.isCompleted == true)
  const importantTasks = tasks.filter((tasks) => tasks.isImportant == true)
  const incompletedTasks = tasks.filter((tasks) => tasks.isCompleted == false)

  // useEffect para mostrar las tareas del usuario
  useEffect(() => {
    if(user) allTasks();
  }, [user])

  return (
    <GlobalContext.Provider value={
      {
        tasks,
        allTasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompletedTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        editTask,
        taskContent,
        modalEdit,
        closeModalEdit,
      }}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
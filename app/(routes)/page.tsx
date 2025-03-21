"use client";

import Tasks from "@/components/Tasks/Tasks";
import { useGlobalState } from "@/utils/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <>
      <Tasks title="Todas las Tareas" tasks={tasks} />
    </>
  );
}

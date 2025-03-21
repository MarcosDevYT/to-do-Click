"use client";

import Tasks from "@/components/Tasks/Tasks";
import { useGlobalState } from "@/utils/globalProvider";

export default function ImportantPage() {
  const { importantTasks } = useGlobalState();

  return <Tasks title="Tareas Importantes" tasks={importantTasks} />;
}

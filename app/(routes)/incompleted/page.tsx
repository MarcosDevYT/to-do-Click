"use client";

import Tasks from "@/components/Tasks/Tasks";
import { useGlobalState } from "@/utils/globalProvider";

export default function IncompletedPage() {
  const { incompletedTasks } = useGlobalState();

  return <Tasks title="Tareas Incompletas" tasks={incompletedTasks} />;
}

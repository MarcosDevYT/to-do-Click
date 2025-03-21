"use client";

import Tasks from "@/components/Tasks/Tasks";
import { useGlobalState } from "@/utils/globalProvider";

export default function CompletedPage() {
  const { completedTasks } = useGlobalState();

  return <Tasks title="Tareas Completas" tasks={completedTasks} />;
}

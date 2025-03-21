import { AutorButton } from "@/components/AutorButton";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function LayoutTasks({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <AutorButton />
      <main className="w-full p-6">{children}</main>
    </>
  );
}

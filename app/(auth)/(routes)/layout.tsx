export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col justify-center min-h-screen items-center">
      <h1 className="3xl my-2">Bienvenido a mi To-do List </h1>
      <h2 className="text-2xl mb-3">To-do Click</h2>
      {children}
    </div>
  );
}

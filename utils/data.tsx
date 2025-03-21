import { BookCheck, Bookmark, BookX, House } from "lucide-react";

export const NavMenu = [
  {
    title: "Todas las Tareas",
    icon: <House />,
    link: "/",
  },
  {
    title: "Importante",
    icon: <Bookmark />,
    link: "/important",
  },
  {
    title: "Completas",
    icon: <BookCheck />,
    link: "/completed",
  },
  {
    title: "Hacer Ahora",
    icon: <BookX />,
    link: "/incompleted",
  },
];

"use client";

import "./style.css";

interface Props {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default GlobalStyleProvider;

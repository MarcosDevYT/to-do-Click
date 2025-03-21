"use client";

// const ButtonStyled = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 5;
// `;

"use client";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
  click?: () => void;
  dClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export default function Button({
  icon,
  name,
  className,
  click,
  type = "button",
}: Props) {
  return (
    <button className={className} onClick={click} type={type}>
      {icon}
      {name}
    </button>
  );
}

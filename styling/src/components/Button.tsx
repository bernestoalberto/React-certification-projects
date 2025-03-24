// import styled from "styled-components";
import { ReactNode } from "react";

// const ButtonStyled = styled.button`
//   padding: 1rem 2rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   border-radius: 0.25rem;
//   color: #1f2937;
//   background-color: #f0b322;
//   border-radius: 6px;
//   border: none;

//   &:hover {
//     background-color: #f0920e;
//   }

// `;

interface ButtonProps {
  children: ReactNode;
  [key: string]: any;
}
export default function Button({ children, ...props }: ButtonProps) {
  return (
    // return <button type="button" className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-500" {...props}>{children}</button>
    <button type="button" className="px-4 py-2 font-semibold uppercase rounded text-amber-400  hover:text-amber-500 bg-amber-500" {...props}>{children}</button>
  );
}

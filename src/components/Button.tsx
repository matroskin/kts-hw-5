import React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  object: {
    name: string | null;
  };
};

const Button: React.FC<Props> = ({ children, object }: Props) => {
  return <div>{object?.name}</div>;
};

export default Button;

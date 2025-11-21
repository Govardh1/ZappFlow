import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <button
      onClick={onClick}
      className={`${size === "small" ? "text-base" : "text-xl"} 
                  ${size === "small" ? "px-8 py-2" : "px-10 py-4"} 
                  bg-amber-700 text-white rounded-full hover:shadow-md hover:cursor-pointer`}
    >
      {children}
    </button>
  );
};

import { ReactNode } from "react";

export const DarkButton = ({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick: () => void;
}) => {
	return (
		<div
			onClick={onClick} className={`flex flex-col justify-center px-8 py-2  bg-purple-800 text-white rounded  hover:shadow-md hover:cursor-pointer`}>
			{children}
		</div>
	);
};

export const Feature = ({ title, subtitle }: { title: string; subtitle: string }) => {
	return (
		<div className="flex pl-4">
			<Check />
			<div className="flex felx-col justify-center">
				<div className="flex">
				<div className="pl-1 font-bold">
				{title}
			</div>
			<div className="pl-1">
				{subtitle}
			</div>
			</div>
			</div>
		</div>
	);
};

function Check() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="size-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m4.5 12.75 6 6 9-13.5"
			/>
		</svg>
	);
}

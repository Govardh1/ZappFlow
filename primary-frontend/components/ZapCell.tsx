export const ZapCell = ({
  name,
  index,
  onClick
}: {
  name?: string;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-black flex flex-col items-center justify-center py-8 px-8 w-[300px] cursor-pointer"
    >
      <div className="flex items-center justify-center text-xl">
        <div className="font-bold mr-1">{index}.</div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export const ButtonPop = ({ name, handle, icon: Icon, ...props }) => {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low transition-colors text-primary text-wrap cursor-pointer"
      onClick={handle}
      {...props}
    >
      <Icon />
      <span className="capitalize">{name}</span>
    </button>
  );
};

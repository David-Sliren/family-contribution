export const ProvaiderSingInButton = ({ icon: Icon, name, handle }) => {
  return (
    <button
      type="button"
      onClick={handle}
      className="w-full flex items-center justify-center gap-3 bg-surface-container-low hover:shadow-tonal-sm hover:-translate-y-0.5 transition-all ring-1 ring-outline-variant/25 text-on-surface font-bold py-4 px-8 rounded-full font-headline cursor-pointer"
    >
      <Icon size={20} />
      Continuar con {name}
    </button>
  );
};

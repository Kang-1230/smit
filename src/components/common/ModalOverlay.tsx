const ModalOverlay = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/70 z-50"
    >
      <div
        className="max-w-md h-auto bg-white rounded-2xl flex items-center justify-center p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-3 right-5 text-xl" onClick={onClick}>
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;

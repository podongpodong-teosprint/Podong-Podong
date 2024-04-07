type WrapperProps = {
  children: React.ReactNode;
};

const WrappingFrame = ({ children }: WrapperProps) => {
  return (
    <div className="flex justify-center bg-gray h-screen w-screen">
      <div className="bg-white h-screen p-3" style={{ width: '375px' }}>
        {children}
      </div>
    </div>
  );
};

export default WrappingFrame;

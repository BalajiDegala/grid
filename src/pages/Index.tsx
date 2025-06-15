
import NodeGraph from "@/components/NodeGraph";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative font-tron" style={{background: "linear-gradient(120deg,#161e29 0%,#232b39 100%)"}}>
      {/* Neon accent strips */}
      <div className="absolute top-0 left-0 w-24 h-2 bg-[#32e6e2] rounded-tr-xl shadow-tron-corner" />
      <div className="absolute top-0 right-0 w-2 h-24 bg-[#32e6e2] rounded-bl-xl shadow-tron-corner" />
      <div className="absolute bottom-0 left-0 w-2 h-24 bg-[#32e6e2] rounded-tr-xl shadow-tron-corner" />
      <div className="absolute bottom-0 right-0 w-24 h-2 bg-[#32e6e2] rounded-bl-xl shadow-tron-corner" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 select-none text-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#32e6e2] drop-shadow-glow font-tron tracking-widest uppercase">GRID</h1>
        <p className="mt-2 text-[#f7b03b] text-xl tracking-wide opacity-90 font-tron font-semibold">Digital Frontier Interface</p>
      </div>
      <NodeGraph />
    </div>
  );
};

export default Index;


import NodeGraph from "@/components/NodeGraph";

const Index = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-tron">
      {/* Angular neon accent corner strips */}
      <div className="absolute top-0 left-0 w-36 h-2 bg-tron-cyan rounded-tr-large shadow-tron-corner animate-pulse-tron" />
      <div className="absolute top-0 right-0 w-2 h-36 bg-tron-cyan rounded-bl-large shadow-tron-corner animate-pulse-tron" />
      <div className="absolute bottom-0 left-0 w-2 h-36 bg-tron-cyan rounded-tr-large shadow-tron-corner animate-pulse-tron" />
      <div className="absolute bottom-0 right-0 w-36 h-2 bg-tron-cyan rounded-bl-large shadow-tron-corner animate-pulse-tron" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 select-none text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-black text-tron-cyan drop-shadow-glow font-tron tracking-widest uppercase">
          GRID
        </h1>
        <p className="mt-1 text-tron-blue-ice font-tron text-lg tracking-wider opacity-80">
          Digital Frontier Interface
        </p>
      </div>
      <NodeGraph />
    </div>
  );
};

export default Index;

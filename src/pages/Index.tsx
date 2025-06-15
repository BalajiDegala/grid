
import NodeGraph from "@/components/NodeGraph";

const Index = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-cyan-400 font-mono tracking-wider">
          NEURAL NETWORK
        </h1>
        <p className="text-sm text-cyan-300 opacity-80 font-mono">
          Interactive Node Graph System
        </p>
      </div>
      <NodeGraph />
    </div>
  );
};

export default Index;

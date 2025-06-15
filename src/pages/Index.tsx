
import NodeGraph from "@/components/NodeGraph";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: "none" }}>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 select-none text-center pointer-events-none">
        <h1
          className="text-6xl md:text-8xl font-extrabold uppercase drop-shadow-[0_0_20px_#32e6e2] tracking-widest"
          style={{
            color: '#32e6e2',
            textShadow: '0 0 32px #00fff7, 0 0 4px #32e6e2, 0 0 6px #28e4ef, 0 0 48px #32e6e2',
            fontFamily: "'Orbitron', monospace, sans-serif",
            letterSpacing: '0.35em',
          }}
        >
          GRID
        </h1>
        <p
          className="mt-3 text-[#eaffff] text-lg md:text-xl tracking-widest drop-shadow-[0_0_10px_#32e6e2] font-bold uppercase"
          style={{
            textShadow: '0 0 22px #32e6e2, 0 0 2px #00fff7, 0 0 8px #32e6e2',
            fontFamily: "'Orbitron', monospace, sans-serif"
          }}
        >
          DIGITAL FRONTIER INTERFACE
        </p>
      </div>
      <NodeGraph />
    </div>
  );
};

export default Index;

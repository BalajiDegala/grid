
import React, { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TimeNode from './TimeNode';
import WebsiteNode from './WebsiteNode';
import { THEME, WEBSITE_NODES, TIME_NODES, CONNECTIONS } from "@/config/nodeConfig";

// Positioning: grid layout, more "TRON"
const nodePositions = {
  day:        { x: 340, y: 70 },
  date:       { x: 650, y: 70 },
  localTime:  { x: 340, y: 225 },
  laTime:     { x: 650, y: 225 },
  google:     { x: 60,  y: 405 },
  github:     { x: 190, y: 405 },
  youtube:    { x: 505, y: 405 },
  twitter:    { x: 735, y: 405 },
  netflix:    { x: 300, y: 550 },
  spotify:    { x: 660, y: 550 },
};

const nodeTypes = {
  timeNode: TimeNode,
  websiteNode: WebsiteNode,
};

function buildNodes() {
  const nodes: Node[] = TIME_NODES.map(n => ({
    id: n.id,
    type: 'timeNode',
    position: nodePositions[n.id] || { x: 0, y: 0 },
    data: { label: n.label, type: n.type }
  }));
  WEBSITE_NODES.forEach(w => {
    nodes.push({
      id: w.id,
      type: 'websiteNode',
      position: nodePositions[w.id] || { x: 0, y: 0 },
      data: { label: w.label, url: w.url }
    });
  });
  return nodes;
}

function buildEdges() {
  // Only one stroke color: neon cyan
  return CONNECTIONS.map((c, i) => ({
    id: `e-${c.source}-${c.target}`,
    source: c.source,
    target: c.target,
    type: 'straight',
    style: {
      stroke: "#32e6e2",
      strokeWidth: 3.2,
      strokeDasharray: '',
      opacity: 0.97,
      filter: "drop-shadow(0 0 8px #00fff7)"
    }
  })) as Edge[];
}

export default function NodeGraph() {
  const initialNodes = useMemo(buildNodes, []);
  const initialEdges = useMemo(buildEdges, []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Add stream light particles and a TRON grid background
  useEffect(() => {
    // Add TRON background if not present
    if (!document.querySelector('.tron-bg')) {
      const bg = document.createElement('div');
      bg.className = 'tron-bg';
      document.body.appendChild(bg);
    }
    // Add TRON particles if not present
    if (!document.querySelector('.tron-particles')) {
      const pt = document.createElement('div');
      pt.className = 'tron-particles';
      // Minimal 22 particles
      for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'tron-particle';
        p.style.left = Math.floor(Math.random() * 98) + 'vw';
        p.style.top = -Math.random() * 30 + 'vh';
        p.style.animationDuration = (6 + Math.random() * 4) + 's';
        p.style.opacity = (0.19 + Math.random() * 0.52).toString();
        p.style.width = (2 + Math.random() * 1.8) + 'px';
        pt.appendChild(p);
      }
      document.body.appendChild(pt);
    }
    return () => {
      // Clean up if unmounting
      const bg = document.querySelector('.tron-bg');
      if (bg) bg.remove();
      const pt = document.querySelector('.tron-particles');
      if (pt) pt.remove();
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="neon-flow"
        minZoom={0.3}
        maxZoom={1.6}
        zoomOnDoubleClick={true}
      >
        {/* No dots - background with our own tron grid */}
        <Controls 
          className="neon-controls"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          className="neon-minimap"
          nodeColor={() => "#32e6e2"}
          maskColor="rgba(0, 0, 0, 0.86)"
        />
      </ReactFlow>
    </div>
  );
}

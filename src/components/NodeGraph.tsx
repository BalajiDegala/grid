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
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TimeNode from './TimeNode';
import WebsiteNode from './WebsiteNode';
import { THEME, WEBSITE_NODES, TIME_NODES, CONNECTIONS } from "@/config/nodeConfig";

// ** Center the grid more dynamically **
const nodePositions = {
  day:        { x: 200, y: 50 },
  date:       { x: 540, y: 50 },
  localTime:  { x: 200, y: 190 },
  laTime:     { x: 540, y: 190 },
  google:     { x: 60,  y: 370 },
  github:     { x: 180, y: 370 },
  youtube:    { x: 510, y: 370 },
  twitter:    { x: 680, y: 370 },
  netflix:    { x: 240, y: 525 },
  spotify:    { x: 590, y: 525 },
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
    data: { label: n.label, type: n.type },
    style: {
      zIndex: 15,
    }
  }));
  WEBSITE_NODES.forEach(w => {
    nodes.push({
      id: w.id,
      type: 'websiteNode',
      position: nodePositions[w.id] || { x: 0, y: 0 },
      data: { label: w.label, url: w.url },
      style: {
        zIndex: 16,
      }
    });
  });
  // Add debug outline
  return nodes.map(node => ({
    ...node,
    className: (node.type === 'websiteNode' || node.type === 'timeNode')
      ? 'node-debug-outline'
      : '',
    data: { ...node.data, debugId: node.id }
  }));
}

function buildEdges() {
  return CONNECTIONS.map((c) => ({
    id: `e-${c.source}-${c.target}`,
    source: c.source,
    target: c.target,
    type: 'smoothstep',
    animated: true,
    className: 'animated-edge',
    style: {
      strokeWidth: 2,
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

  useEffect(() => {
    // Add TRON background if not present
    if (!document.querySelector('.tron-bg')) {
      const bg = document.createElement('div');
      bg.className = 'tron-bg';
      bg.style.zIndex = '1';
      document.body.appendChild(bg);
    }
    if (!document.querySelector('.tron-particles')) {
      const pt = document.createElement('div');
      pt.className = 'tron-particles';
      pt.style.zIndex = '2';
      for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'tron-particle';
        p.style.left = Math.floor(Math.random() * 98) + 'vw';
        p.style.top = -Math.random() * 30 + 'vh';
        p.style.animationDuration = (6 + Math.random() * 4) + 's';
        p.style.opacity = (0.4 + Math.random() * 0.45).toString();
        p.style.width = (3.0 + Math.random() * 2) + 'px';
        pt.appendChild(p);
      }
      document.body.appendChild(pt);
    }
    return () => {
      const bg = document.querySelector('.tron-bg');
      if (bg) bg.remove();
      const pt = document.querySelector('.tron-particles');
      if (pt) pt.remove();
    }
  }, []);

  return (
    <div className="w-full h-screen z-[12] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.4}
        maxZoom={1.2}
        className="neon-flow"
        attributionPosition="top-right"
      >
        <Controls 
          className="neon-controls"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          className="neon-minimap"
          nodeColor={() => "#32e6e2"}
          maskColor="rgba(0,0,0,0.92)"
        />
      </ReactFlow>
    </div>
  );
}

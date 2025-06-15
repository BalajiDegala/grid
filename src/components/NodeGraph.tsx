
import React, { useCallback, useMemo } from 'react';
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

// Helper: define position layouts (can be extended for config)
const nodePositions = {
  day:        { x: 350, y: 110 },
  date:       { x: 570, y: 110 },
  localTime:  { x: 350, y: 260 },
  laTime:     { x: 570, y: 260 },
  google:     { x: 80,  y: 420 },
  github:     { x: 220, y: 420 },
  youtube:    { x: 500, y: 420 },
  twitter:    { x: 720, y: 420 },
  netflix:    { x: 340, y: 580 },
  spotify:    { x: 580, y: 580 },
};

const nodeTypes = {
  timeNode: TimeNode,
  websiteNode: WebsiteNode,
};

function buildNodes() {
  // Time nodes
  const nodes: Node[] = TIME_NODES.map(n => ({
    id: n.id,
    type: 'timeNode',
    position: nodePositions[n.id] || { x: 0, y: 0 },
    data: { label: n.label, type: n.type }
  }));
  // Website nodes
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
  // Connection color based on "kind"
  function color(kind: string) {
    if (kind === "temporal") return "#32e6e2";
    if (kind === "utility") return "#fdab3d";
    if (kind === "entertainment") return "#f955a4";
    if (kind === "social") return "#2fc3f2";
    if (kind === "media") return "#badc58";
    if (kind === "tutorials") return "#c77dff";
    return "#fdab3d";
  }
  return CONNECTIONS.map((c, i) => ({
    id: `e-${c.source}-${c.target}`,
    source: c.source,
    target: c.target,
    type: 'straight',
    style: {
      stroke: color(c.kind),
      strokeWidth: 2.5,
      strokeDasharray: '5,5',
      opacity: 0.95
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

  // Use theme background
  return (
    <div className="w-full h-screen" style={{ background: THEME.background }}>
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
        <Background 
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.5}
          color="#2a4155"
        />
        <Controls 
          className="neon-controls"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          className="neon-minimap"
          nodeColor={(n) =>
            n.type === "timeNode"
              ? THEME.node.accent
              : THEME.node.edge
          }
          maskColor="rgba(0, 0, 0, 0.88)"
        />
      </ReactFlow>
    </div>
  );
}

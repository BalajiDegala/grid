import React, { useCallback, useMemo, useEffect, useState } from 'react';
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
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TimeNode from './TimeNode';
import WebsiteNode from './WebsiteNode';
import EditableEdge from './EditableEdge';
import CustomConnectionLine from './CustomConnectionLine';
import { useSpaceKey } from '../hooks/useSpaceKey';
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

const edgeTypes = {
  editableEdge: EditableEdge,
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
    type: 'editableEdge',
    animated: true,
    className: 'animated-edge',
    style: {
      strokeWidth: 3,
      stroke: '#32e6e2',
    },
    data: {
      controlPoints: [], // Start with no control points
    },
  })) as Edge[];
}

export default function NodeGraph() {
  const initialNodes = useMemo(buildNodes, []);
  const initialEdges = useMemo(buildEdges, []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const isSpacePressed = useSpaceKey();

  useEffect(() => {
    setIsDrawingMode(isSpacePressed);
  }, [isSpacePressed]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `e-${params.source}-${params.target}-${Date.now()}`,
        type: 'editableEdge',
        animated: true,
        style: {
          strokeWidth: 3,
          stroke: '#32e6e2',
        },
        data: {
          controlPoints: isDrawingMode ? [] : undefined,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, isDrawingMode]
  );

  return (
    <div className="w-full h-screen z-[12] relative">
      {isDrawingMode && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 text-cyan-400 px-4 py-2 rounded-md border border-cyan-400">
          Freeform Drawing Mode (Hold Space)
        </div>
      )}
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={CustomConnectionLine}
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
        <Background
          variant={BackgroundVariant.Dots}
          gap={60}
          size={3}
          color="#32e6e2"
          className="neon-background"
        />
      </ReactFlow>
    </div>
  );
}

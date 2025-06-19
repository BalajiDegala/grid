
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
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TimeNode from './TimeNode';
import WebsiteNode from './WebsiteNode';
import EditableEdge from './EditableEdge';
import CustomConnectionLine from './CustomConnectionLine';
import { useSpaceKey } from '../hooks/useSpaceKey';
import { WEBSITE_NODES, TIME_NODES, CONNECTIONS } from "@/config/nodeConfig";

// Grid layout positions optimized for rectangular nodes
const nodePositions = {
  // 1st row - date node (top center)
  date:       { x: 450, y: 80 },
  // 2nd row - day node 
  day:        { x: 450, y: 240 },
  // 3rd row - time nodes (spread horizontally)
  localTime:  { x: 250, y: 400 },
  laTime:     { x: 650, y: 400 },
  // 4th row - website nodes (bottom row, evenly spaced)
  node1:      { x: 50,  y: 600 },
  node2:      { x: 220, y: 600 },
  node3:      { x: 390, y: 600 },
  node4:      { x: 560, y: 600 },
  node5:      { x: 730, y: 600 },
  node6:      { x: 900, y: 600 },
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
  
  return nodes;
}

function buildEdges() {
  return CONNECTIONS.map((c) => ({
    id: `e-${c.source}-${c.target}`,
    source: c.source,
    target: c.target,
    type: 'editableEdge',
    animated: false,
    style: {
      strokeWidth: 2,
      stroke: '#00d4ff',
    },
    data: {
      kind: c.kind,
    },
  }));
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
        animated: false,
        style: {
          strokeWidth: 2,
          stroke: '#000000',
        },
        data: {
          kind: 'custom',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  return (
    <div className="w-full h-screen z-[12] relative" style={{ background: '#ffffff' }}>
      {isDrawingMode && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white text-black px-6 py-3 rounded-lg border border-black shadow-lg">
          <span className="font-semibold">🎨 Freeform Drawing Mode</span>
          <span className="ml-2 text-sm opacity-75">(Hold Space)</span>
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
        fitViewOptions={{
          padding: 0.1,
          includeHiddenNodes: false,
        }}
        minZoom={0.4}
        maxZoom={1.5}
        className="white-flow"
        attributionPosition="top-right"
        style={{ background: '#ffffff' }}
      >
        <Controls 
          className="white-controls" 
          showZoom 
          showFitView 
          showInteractive={false}
          style={{
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
        
        <MiniMap
          className="white-minimap"
          nodeColor={(node) => {
            return "#000000";
          }}
          maskColor="rgba(255,255,255,0.8)"
          style={{
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
        
        <Background
          variant={BackgroundVariant.Dots}
          gap={80}
          size={2}
          color="#000000"
          className="white-background"
          style={{ opacity: 0.2 }}
        />
      </ReactFlow>
    </div>
  );
}

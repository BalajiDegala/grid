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

// Updated grid layout positions with better spacing for dark theme
const nodePositions = {
  // 1st row, date node only
  date:       { x: 400, y: 50 },
  // 2nd row, day node with more vertical spacing
  day:        { x: 400, y: 200 },
  // 3rd row, two time nodes with more spacing
  localTime:  { x: 200, y: 380 },
  laTime:     { x: 600, y: 380 },
  // 4th row, spread out website nodes horizontally with more spacing
  node1:      { x: 40,  y: 580 },
  node2:      { x: 200, y: 580 },
  node3:      { x: 360, y: 580 },
  node4:      { x: 520, y: 580 },
  node5:      { x: 680, y: 580 },
  node6:      { x: 840, y: 580 },
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
          stroke: '#00d4ff',
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
    <div className="w-full h-screen z-[12] relative" style={{ background: '#0a0a0a' }}>
      {isDrawingMode && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-gray-900 text-blue-400 px-4 py-2 rounded-md border border-blue-500 shadow-lg">
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
        minZoom={0.3}
        maxZoom={1.2}
        className="dark-flow"
        attributionPosition="top-right"
        style={{ background: '#0a0a0a' }}
      >
        <Controls className="dark-controls" showZoom showFitView showInteractive={false} />
        <MiniMap
          className="dark-minimap"
          nodeColor={() => "#00d4ff"}
          maskColor="rgba(0,0,0,0.8)"
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={60}
          size={2}
          color="#00d4ff"
          className="dark-background"
          style={{ opacity: 0.3 }}
        />
      </ReactFlow>
    </div>
  );
}
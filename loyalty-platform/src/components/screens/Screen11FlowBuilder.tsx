import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Transaction Received' },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    data: { label: 'Calculate Points' },
    position: { x: 250, y: 150 },
  },
  {
    id: '3',
    data: { label: 'Check Tier Status' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    data: { label: 'Send Thank You Email' },
    position: { x: 100, y: 350 },
  },
  {
    id: '5',
    data: { label: 'Trigger Campaign' },
    position: { x: 400, y: 350 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', label: 'VIP' },
  { id: 'e3-5', source: '3', target: '5', label: 'At Risk' },
];

export const Screen11FlowBuilder: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 Flow Orchestration Builder</h1>
          <p className="text-gray-600 text-lg">Design custom business processes with drag-and-drop interface</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Toolbox */}
          <Card className="p-4 h-[600px] overflow-y-auto">
            <h3 className="font-semibold mb-4 text-sm">Toolbox</h3>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">TRIGGERS</h4>
              <div className="space-y-2">
                {['Transaction', 'Customer Signup', 'Point Expiry', 'Tier Change', 'Birthday'].map((item) => (
                  <div key={item} className="p-2 bg-blue-50 border border-blue-200 rounded text-xs cursor-move hover:bg-blue-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">ACTIONS</h4>
              <div className="space-y-2">
                {['Award Points', 'Send Email', 'Send SMS', 'Update Tier', 'Create Voucher', 'Log Event'].map((item) => (
                  <div key={item} className="p-2 bg-green-50 border border-green-200 rounded text-xs cursor-move hover:bg-green-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">DECISIONS</h4>
              <div className="space-y-2">
                {['If/Then', 'Multi-Route', 'Wait', 'Loop', 'Filter'].map((item) => (
                  <div key={item} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs cursor-move hover:bg-yellow-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Canvas */}
          <div className="col-span-3">
            <Card className="p-0 h-[600px] overflow-hidden">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
              >
                <Controls />
                <Background />
              </ReactFlow>
            </Card>

            <div className="flex gap-3 mt-4">
              <Card className="flex-1 p-4">
                <h4 className="text-sm font-semibold mb-2">Flow Properties</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">Transaction Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trigger:</span>
                    <span className="font-medium">API Call</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">Active</span>
                  </div>
                </div>
              </Card>

              <Card className="flex-1 p-4">
                <h4 className="text-sm font-semibold mb-2">Generated Endpoint</h4>
                <div className="bg-gray-900 text-gray-100 px-3 py-2 rounded text-xs font-mono">
                  POST /api/flows/transaction-processing
                </div>
                <p className="text-xs text-gray-600 mt-2">Auto-generated API endpoint for this flow</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

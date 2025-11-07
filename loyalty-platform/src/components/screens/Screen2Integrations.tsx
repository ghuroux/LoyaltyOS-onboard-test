import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const Screen2Integrations: React.FC = () => {
  const integrations = [
    { category: 'POS Systems', items: ['Square', 'Toast', 'Clover', 'Lightspeed'] },
    { category: 'Payment Gateways', items: ['Stripe', 'PayPal', 'Braintree', 'Adyen'] },
    { category: 'Communication', items: ['SendGrid', 'Twilio', 'Mailchimp', 'OneSignal'] },
    { category: 'Business Systems', items: ['Salesforce', 'HubSpot', 'NetSuite', 'SAP'] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integration Configuration</h1>
          <p className="text-gray-600 text-lg">Connect external systems to enable data flow and automation</p>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          {integrations.map((category) => (
            <Card key={category.category} className="p-5">
              <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">{item}</span>
                    <Button variant="secondary" size="sm">Connect</Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">Connected Integrations</h3>
          <div className="space-y-3">
            {[
              { name: 'Square POS', status: 'Active', lastSync: '2 minutes ago', health: 100 },
              { name: 'SendGrid Email', status: 'Active', lastSync: '1 hour ago', health: 98 },
            ].map((int) => (
              <div key={int.name} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold mb-1">{int.name}</div>
                  <div className="text-sm text-gray-600">Last sync: {int.lastSync}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Health</div>
                    <div className="text-lg font-bold text-green-600">{int.health}%</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">{int.status}</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

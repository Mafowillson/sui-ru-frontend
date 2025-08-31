import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { X } from 'lucide-react';

const AlertDetailModal = ({ alert, onClose, onAction }) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold">{alert.title}</h3>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="space-y-4">
            <p>{alert.description}</p>
            {/* Add more alert details here */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={onClose}>Close</Button>
              <Button variant="primary" onClick={() => onAction(alert.id, 'resolve')}>Resolve Alert</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlertDetailModal;


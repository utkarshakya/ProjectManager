import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TaskModal = ({ projectId, task, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = task ? `/tasks/${projectId}/${task._id}` : `/tasks/${projectId}`;
      const method = task ? 'put' : 'post';
      
      const { data } = await axios[method](url, formData);
      onSuccess(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
          </div>

          {task && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
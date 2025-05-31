import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [tab, setTab] = useState('lost');
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const fetchLostItems = async () => {
    const response = await axios.get('http://localhost:3000/lost-item/admin');
    setLostItems(response.data.data);
  };
  const fetchFoundItems = async () => {
    const response = await axios.get('http://localhost:3000/found-item/admin');
    setFoundItems(response.data.data);
  };

  useEffect(() => {
    fetchLostItems();
    fetchFoundItems();
  }, []);

  console.log({ lostItems }, { foundItems });

  const handleAction = async (type, item, which) => {
    // which = lost, found
    if (type === 'archive') {
      if (which === 'lost') {
        await axios.get(
          `http://localhost:3000/lost-item/set-received/${item._id}`,
          {
            withCredentials: true,
          }
        );
        await fetchLostItems();
      } else {
        await axios.get(
          `http://localhost:3000/found-item/set-returned/${item._id}`,
          {
            withCredentials: true,
          }
        );
        await fetchFoundItems();
      }
    } else {
      // delete
      if (which === 'lost') {
        await axios.delete(`http://localhost:3000/lost-item/${item._id}`, {
          withCredentials: true,
        });
        await fetchLostItems();
      } else {
        await axios.delete(`http://localhost:3000/found-item/${item._id}`, {
          withCredentials: true,
        });
        await fetchFoundItems();
      }
    }
  };

  const renderTable = (items, tableName) => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-left border border-gray-700 text-sm">
        <thead>
          <tr className="bg-[#1f1f2e] text-gray-300">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            {tableName !== 'found' && <th className="p-3">Date</th>}
            <th className="p-3">Description</th>
            <th className="p-3">Location</th>
            <th className="p-3">Posted By</th>
            {tableName === 'found' ? (
              <th className="p-3">Returned</th>
            ) : (
              <th className="p-3">Found</th>
            )}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} className="border-t border-gray-700">
              <td className="p-3">
                {item.image && item.image.url && (
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.category}</td>
              {tableName !== 'found' && (
                <td className="p-3">
                  {new Date(item.dateLost).toLocaleDateString()}
                </td>
              )}
              <td className="p-3">{item.description}</td>
              <td className="p-3">{item.location}</td>
              <td className="p-3">{item.user.name}</td>
              <td className="p-3">
                {tableName === 'lost' ? (
                  <td className="p-3">{item.received.toString()}</td>
                ) : (
                  <td className="p-3">{item.returned.toString()}</td>
                )}
              </td>
              <td className="p-3 space-y-1">
                <button
                  onClick={() => handleAction('approve', item, tableName)}
                  className="bg-green-600 w-full px-2 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction('delete', item, tableName)}
                  className="bg-yellow-500 w-full px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            tab === 'lost' ? 'bg-[#ff00ff]' : 'bg-gray-700'
          }`}
          onClick={() => setTab('lost')}
        >
          Lost Items
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === 'found' ? 'bg-[#ff00ff]' : 'bg-gray-700'
          }`}
          onClick={() => setTab('found')}
        >
          Found Items
        </button>
      </div>

      {/* Tables */}
      {tab === 'lost' && renderTable(lostItems, 'lost')}
      {tab === 'found' && renderTable(foundItems, 'found')}

      {/* Matching Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Possible Matches</h2>
        <p className="text-gray-400">
          Future Feature: Auto-match lost and found items based on name, date,
          category, and location.
        </p>
      </div>
    </div>
  );
}

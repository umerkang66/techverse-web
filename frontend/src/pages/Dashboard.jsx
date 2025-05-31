import React, { useState } from "react";

export default function Dashboard() {
  const [tab, setTab] = useState("lost");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const lostItems = [
    {
      id: 1,
      name: "Wallet",
      category: "Personal",
      dateLost: "2024-05-10",
      description: "Black leather wallet with multiple cards.",
      location: "Campus Gate",
      image: "./public/download.jpg",
      status: "Pending",
      user: "Ali",
    },
    {
      id: 2,
      name: "Bag",
      category: "School Supplies",
      dateLost: "2024-05-09",
      description: "Blue backpack with notebooks.",
      location: "Library",
      image: "./public/download.jpg",
      status: "Approved",
      user: "Sara",
    },
  ];

  const foundItems = [
    {
      id: 1,
      name: "Wallet",
      category: "Personal",
      dateLost: "2024-05-10",
      description: "Wallet found near gate.",
      location: "Main Gate",
      image: "./public/download.jpg",
      status: "Pending",
      user: "John",
    },
    {
      id: 2,
      name: "Phone",
      category: "Electronics",
      dateLost: "2024-05-08",
      description: "Samsung phone with cracked screen.",
      location: "Parking",
      image: "./public/download.jpg",
      status: "Archived",
      user: "Emma",
    },
  ];

  const handleAction = (type, item) => {
    if (type === "archive") {
      setSelectedItem(item);
      setShowModal(true);
    } else {
      alert(`${type.toUpperCase()} action on item "${item.name}"`);
    }
  };

  const renderTable = (items) => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-left border border-gray-700 text-sm">
        <thead>
          <tr className="bg-[#1f1f2e] text-gray-300">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Location</th>
            <th className="p-3">Posted By</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-gray-700">
              <td className="p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.dateLost}</td>
              <td className="p-3">{item.description}</td>
              <td className="p-3">{item.location}</td>
              <td className="p-3">{item.user}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3 space-y-1">
                <button
                  onClick={() => handleAction("approve", item)}
                  className="bg-green-600 w-full px-2 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction("archive", item)}
                  className="bg-yellow-500 w-full px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Archive
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
            tab === "lost" ? "bg-[#ff00ff]" : "bg-gray-700"
          }`}
          onClick={() => setTab("lost")}
        >
          Lost Items
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "found" ? "bg-[#ff00ff]" : "bg-gray-700"
          }`}
          onClick={() => setTab("found")}
        >
          Found Items
        </button>
      </div>

      {/* Tables */}
      {tab === "lost" && renderTable(lostItems)}
      {tab === "found" && renderTable(foundItems)}

      {/* Matching Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Possible Matches</h2>
        <p className="text-gray-400">
          Future Feature: Auto-match lost and found items based on name, date,
          category, and location.
        </p>
      </div>

      {/* Modal for resolving dispute */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1f1f2e] p-6 rounded-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Arhive</h3>
            <p className="mb-4">
              Are you sure you want to mark this item (
              <b>{selectedItem.name}</b>) as Archive?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Resolved item: ${selectedItem.name}`);
                  setShowModal(false);
                }}
                className="px-4 py-1 rounded bg-green-600 hover:bg-green-700"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

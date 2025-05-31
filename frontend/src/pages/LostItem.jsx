import React, { useState } from "react";

export default function LostItem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dateLost: "",
    image: null,
    description: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...formData, id: Date.now() };
    setLostItems([...lostItems, newItem]);
    setFormData({
      name: "",
      category: "",
      dateLost: "",
      image: null,
      description: "",
      location: "",
    });
    setModalOpen(false);
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Lost Items</h2>
        <button
          className="bg-[#00ffff] text-black px-4 py-2 rounded hover:bg-[#ff00ff]"
          onClick={() => setModalOpen(true)}
        >
          + Add Lost Item
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItems.map((item) => (
          <div key={item.id} className="bg-[#1f1f2e] p-4 rounded-lg shadow">
            {item.image && (
              <img
                src={URL.createObjectURL(item.image)}
                alt="Lost item"
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-300">{item.category}</p>
            <p className="text-sm text-gray-400">Date Lost: {item.dateLost}</p>
            <p className="text-sm mt-2">{item.description}</p>
            <p className="text-sm italic text-gray-400 mt-1">
              Location: {item.location}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1f1f2e] p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Post Lost Item</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-red-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-[#0f0f1a] text-white"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-[#0f0f1a] text-white"
                required
              />
              <input
                type="date"
                name="dateLost"
                value={formData.dateLost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-[#0f0f1a] text-white"
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full text-sm text-gray-400"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-[#0f0f1a] text-white"
                rows="3"
                required
              ></textarea>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded bg-[#0f0f1a] text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#00ffff] text-black font-semibold py-2 rounded hover:bg-[#ff00ff]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

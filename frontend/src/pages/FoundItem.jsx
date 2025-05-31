import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiChat } from 'react-icons/bi';
import ReturnBts from '../components/ReturnBtn';
import ReturnBtn from '../components/ReturnBtn';
export default function FoundItem({ currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: null,
    description: '',
    location: '',
  });

  const fetchFoundItems = async () => {
    const response = await axios.get('http://localhost:3000/found-item');
    setFoundItems(response.data.data);
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setFormData({
      name: '',
      category: '',
      image: null,
      description: '',
      location: '',
    });

    const newItem = { ...formData, image };

    setLoading(true);
    const response = await axios.post(
      'http://localhost:3000/found-item',
      { ...newItem },
      { withCredentials: true }
    );
    await fetchFoundItems();
    setLoading(false);
    console.log(response);

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white py-10 px-4">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold">Found Items</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00ffff] hover:bg-[#ff00ff] text-black px-4 py-2 rounded-lg font-medium transition"
        >
          + Add Found Item
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundItems.map(item => (
          <div
            key={item._id}
            className="bg-[#1f1f2e] p-4 rounded-lg shadow relative"
          >
            {item.image && item.image.url && (
              <img
                src={item.image.url}
                alt="Lost item"
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-300">{item.category}</p>
            <p className="text-sm text-gray-400"></p>

            {/* Description and Chat button in same row */}
            <div className="flex items-start justify-between mt-2">
              <p className="text-sm">{item.description}</p>
              {currentUser && currentUser._id === item.user ? (
                <ReturnBtn
                  item_id={item._id}
                  key={item._id}
                  onSuccess={fetchFoundItems}
                />
              ) : null}
              <button
                className="absolute bottom-4 right-4 bg-[#37db53] text-black px-3 py-1 cursor-pointer rounded shadow-lg text-sm whitespace-nowrap ml-2"
                aria-label="Chat"
              >
                <BiChat className="text-lg " />
              </button>
            </div>

            <p className="text-sm italic text-gray-400 mt-1">
              Location: {item.location}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-[#1a1a2e] p-6 rounded-lg w-full max-w-md text-white shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Add Found Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700 focus:outline-none"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700"
              />
              <input
                type="date"
                name="dateFound"
                value={formData.dateFound}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-black bg-[#00ffff] rounded hover:bg-[#ff00ff]"
                >
                  {loading ? '...' : 'Post Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

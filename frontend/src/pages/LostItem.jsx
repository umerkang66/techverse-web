import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiChat } from 'react-icons/bi';
import FoundBtn from '../components/FoundBtn';
export default function LostItem({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    dateLost: '',
    image: null,
    description: '',
    location: '',
  });

  console.log(lostItems);

  const fetchLostItems = async () => {
    const response = await axios.get('http://localhost:3000/lost-item');
    setLostItems(response.data.data);
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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

  console.log(currentUser);
  console.log(lostItems);

  const handleSubmit = async e => {
    e.preventDefault();
    setFormData({
      name: '',
      category: '',
      dateLost: '',
      image: null,
      description: '',
      location: '',
    });

    const newItem = { ...formData, image };

    setLoading(true);
    const response = await axios.post(
      'http://localhost:3000/lost-item',
      { ...newItem },
      { withCredentials: true }
    );
    await fetchLostItems();
    setLoading(false);
    console.log(response);

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 py-10 px-4 text-white">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold">Lost Items</h2>
        <button
          className="bg-[#00ffff] text-black font-medium px-4 py-2 rounded hover:bg-[#ff00ff]"
          onClick={() => setModalOpen(true)}
        >
          + Add Lost Item
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItems.map(item => (
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
            <p className="text-sm text-gray-400">
              Date Lost: {new Date(item.dateLost).toLocaleDateString()}
            </p>

            {/* Description and Chat button in same row */}
            <div className="flex items-start justify-between mt-2">
              <p className="text-sm">{item.description}</p>
              {currentUser && currentUser._id === item.user ? (
                <FoundBtn
                  item_id={item._id}
                  key={item._id}
                  onSuccess={fetchLostItems}
                />
              ) : null}
              <button
                className="bg-[#37db53] text-black px-3 py-1 cursor-pointer rounded shadow-lg text-sm whitespace-nowrap ml-2 absolute bottom-4 right-4"
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
                onChange={handleImageChange}
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
                {!loading ? 'Submit' : '...'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

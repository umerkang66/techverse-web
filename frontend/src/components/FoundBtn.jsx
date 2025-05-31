import axios from 'axios';
import { useState } from 'react';

export default function FoundBtn({ item_id, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const setReturned = async id => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3000/lost-item/set-received/${id}`,
      { withCredentials: true }
    );
    console.log(response);
    await onSuccess();
    setLoading(false);
  };

  return (
    <button
      onClick={() => setReturned(item_id)}
      className="absolute bottom-4 right-20 bg-white py-0.5 px-2 rounded text-black cursor-pointer"
    >
      {loading ? '...' : 'Found'}
    </button>
  );
}

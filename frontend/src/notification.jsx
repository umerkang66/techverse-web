import toast from 'react-hot-toast';

export function showMessageToast(currentUserId, receiverId, message) {
  toast.custom(t => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <p className="text-sm font-semibold text-gray-900">
          New message from {receiverId}
        </p>
        <p className="mt-1 text-sm text-gray-700 line-clamp-2">{message}</p>
        <button
          onClick={() => {
            window.location.href = `http://localhost:5173/chat/${currentUserId}/${receiverId}`;
            toast.dismiss(t.id);
          }}
          className="mt-3 text-sm text-white bg-cyan-600 hover:bg-cyan-500 px-4 py-1.5 rounded"
        >
          Go to Chat
        </button>
      </div>
    </div>
  ));
}

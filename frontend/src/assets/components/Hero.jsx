import React from "react";

export default function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-[#0f0f1a]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ffff] mb-4">
          Lost Something?
        </h2>
        <p className="text-lg md:text-xl text-[#f0f0f0] max-w-xl mb-6">
          Report, recover, and reconnect. Use our campus-wide Lost & Found
          portal to post or claim lost belongings quickly and securely.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-[#00ffff] text-[#0a0a12] rounded font-bold hover:scale-105 transition">
            Report Lost Item
          </button>
          <button className="px-6 py-3 bg-[#ff00ff] text-[#0a0a12] rounded font-bold hover:scale-105 transition">
            View Found Items
          </button>
        </div>
      </section>
    </div>
  );
}

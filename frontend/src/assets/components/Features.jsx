import React from "react";

export default function Features() {
  return (
    <div>
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-16 bg-[#0a0a12] text-center">
        <div className="p-6 bg-[#0f0f1a] rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#00ffff] mb-2">
            Post Lost Items
          </h3>
          <p className="text-[#f0f0f0]">
            Fill out a simple form with description and image to help others
            identify your lost item.
          </p>
        </div>
        <div className="p-6 bg-[#0f0f1a] rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#00ffff] mb-2">
            Report Found Items
          </h3>
          <p className="text-[#f0f0f0]">
            Quickly upload details of items you’ve found so the rightful owner
            can claim them.
          </p>
        </div>
        <div className="p-6 bg-[#0f0f1a] rounded-lg shadow">
          <h3 className="text-xl font-semibold text-[#00ffff] mb-2">
            Secure Claim System
          </h3>
          <p className="text-[#f0f0f0]">
            Integrated claim requests and private chat help ensure safe and
            verified handovers.
          </p>
        </div>
      </section>
    </div>
  );
}

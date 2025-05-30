import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="text-center py-6 bg-[#0a0a12] text-[#f0f0f0]">
        &copy; {new Date().getFullYear()} TrackIt. All rights reserved.
      </footer>
    </div>
  );
}

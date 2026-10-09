"use client";

import React, { useState } from "react";
import { Download, Check } from "lucide-react";

export function DownloadBrochureButton() {
  const [downloaded, setDownloaded] = useState(false);

  const handleClick = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-6 py-3.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-heritage-gold" />
          Brochure Downloaded (4.6 MB)
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-heritage-gold" />
          Download Brochure (PDF)
        </>
      )}
    </button>
  );
}

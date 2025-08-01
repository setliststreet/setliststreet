// components/SovrnAd.tsx
'use client';

import { useEffect } from 'react';

export default function SovrnAd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ap.lijit.com/www/delivery/fpi.js?z=1287078&width=468&height=60';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="ap_tag_1287078" style={{ width: 468, height: 60 }} />;
}


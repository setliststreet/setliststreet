import React, { useEffect } from 'react';

const SovrnAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ap.lijit.com/www/delivery/fpi.js?z=1287078&width=468&height=60';
    script.type = 'text/javascript';
    script.async = true;

    const container = document.getElementById('sovrn-ad-container');
    if (container) {
      container.innerHTML = ''; // Clear previous content
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div id="sovrn-ad-container" style={{ width: 468, height: 60 }} />
    </div>
  );
};

export default SovrnAd;

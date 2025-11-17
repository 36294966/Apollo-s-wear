import React from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const Layout = ({ children }) => {
  const whatsappNumber = '254746311274';
  const prefilledMessage = encodeURIComponent(
    'Hello Sir Apollo, I want to clarify about your products'
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-4">{children}</main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[998] hover:scale-110 transition-transform"
        aria-label="Chat with Sir Apollo on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="56"
          height="56"
          className="drop-shadow-lg text-green-500"
        >
          <path d="M20.52 3.48A11.787 11.787 0 0012.01 0C5.38 0 .01 5.37.01 12c0 2.11.55 4.16 1.59 5.97L0 24l6.19-1.58A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12a11.94 11.94 0 00-3.48-8.52zM12 22.02c-1.81 0-3.57-.48-5.1-1.37l-.36-.21-3.67.93.97-3.57-.24-.37A9.944 9.944 0 012.02 12C2.02 6.49 6.5 2 12.01 2c2.67 0 5.18 1.04 7.07 2.93A9.944 9.944 0 0122 12c0 5.51-4.48 10.02-10 10.02z" />
          <path d="M17.49 14.89l-2.53-.72a.999.999 0 00-.97.26l-.73.75a7.064 7.064 0 01-3.36-3.35l.75-.73a1 1 0 00.26-.97l-.72-2.53a1 1 0 00-1.2-.7C7.35 7.26 6.5 8.94 6.5 10.75c0 .2.01.4.04.6a10.1 10.1 0 005.59 7.68c.16.07.33.13.5.18.4.1.8.15 1.2.15 1.81 0 3.49-.85 4.26-2.26a1 1 0 00-.7-1.2z" />
        </svg>
      </a>
    </div>
  );
};

export default Layout;




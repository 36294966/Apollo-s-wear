import React from 'react';
import Logo from '../Assests/logo.jpg';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const mapAddress = 'Intermark Business Centre, Taveta Rd, Nairobi';
  const encodedAddress = encodeURIComponent(mapAddress);
  const googleMapsBase = 'https://www.google.com/maps/dir/?api=1';

  const whatsappShareLink = `https://wa.me/?text=Check%20out%20Sir%20Apollo's%20Menswear%20location:%20${encodeURIComponent(
    `https://www.google.com/maps/place/${encodedAddress}`
  )}`;

  const smsShareLink = `sms:?body=Check%20out%20Sir%20Apollo's%20Menswear%20location:%20https://www.google.com/maps/place/${encodedAddress}`;

  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6 text-sm">
      <style>{`
        @keyframes colorBlink {
          0%, 100% { color: #60a5fa; }
          25% { color: #f87171; }
          50% { color: #34d399; }
          75% { color: #fbbf24; }
        }
        .blinking-text {
          animation: colorBlink 4s linear infinite;
          font-style: oblique 25deg;
        }
        /* Styling for the links */
        .quick-link {
          text-decoration: none;
          color: #bbb;
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .quick-link:hover {
          color: #fff;
        }
        .quick-link:hover::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #fbbf24;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        
        {/* Logo and Brand (Original Size Retained) */}
        <div className="flex flex-col items-center md:items-start flex-shrink-0 pl-6 md:pl-12">
          <img
            src={Logo}
            alt="Sir Apollo Logo"
            className="h-28 w-28 rounded-full object-cover"
          />
          <p className="mt-3 blinking-text text-lg font-semibold underline text-center">
            Sir Apollo's Menswear
          </p>
        </div>

        {/* Location Info */}
        <div className="text-center md:text-left space-y-2 max-w-md">
          <h3 className="font-semibold flex items-center justify-center md:justify-start gap-2 text-base">
            <MapPin className="w-4 h-4 text-blue-400" />
            Location
          </h3>
          <p className="leading-snug text-gray-300">
            <strong className="whitespace-nowrap">
              Intermark Business Centre, 3rd Floor, Shop No. 83
            </strong><br />
            Behind Odeon, along Taveta Road,<br />
            Opposite Taveta Court, Nairobi CBD
          </p>

          {/* Embedded Map (English Language) */}
          <div className="rounded overflow-hidden shadow w-full max-w-xs mx-auto md:mx-0">
            <iframe
              title="Sir Apollo Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.152664702305!2d36.81655132333374!3d-1.2835733999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e4dba2a98d%3A0xf6a27c2d25ef313e!2sIntermark%20Business%20Centre%2C%20Taveta%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske&language=en"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Directions & Travel Mode */}
          <div className="mt-2 space-y-1">
            <a
              href={`${googleMapsBase}&destination=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white font-medium py-1 px-3 rounded hover:bg-green-700"
            >
              🚗 Directions from My Location
            </a>
            <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
              {['driving', 'walking', 'bicycling', 'transit'].map((mode) => (
                <a
                  key={mode}
                  href={`${googleMapsBase}&destination=${encodedAddress}&travelmode=${mode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white py-1 px-2 rounded text-xs hover:bg-gray-600"
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Current traffic, estimated time & mode included in Google Maps.
            </p>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-2 mt-2 justify-center md:justify-start">
            <a
              href={whatsappShareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
            >
              Share via WhatsApp
            </a>
            <a
              href={smsShareLink}
              className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded text-sm"
            >
              Share via SMS
            </a>
          </div>
        </div>

        {/* Contact Info (Original Size Retained) */}
        <div className="text-left space-y-4 pr-8 md:pr-16">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-base text-gray-300">Call, Text or WhatsApp:</p>
          <div className="flex items-center gap-2 text-blue-300">
            <Phone className="w-5 h-5" />
            <span className="text-lg font-medium">0746311274</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <Mail className="w-5 h-5" />
            <a
              href="mailto:sirapolloke@gmail.com"
              className="text-blue-400 hover:underline text-lg font-medium"
            >
              sirapolloke@gmail.com
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="text-left space-y-2 pr-8 md:pr-16">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li><a href="/suits/3piecesuits" className="quick-link">Three Piece Suits</a></li>
            <li><a href="/suits/2piecesuits" className="quick-link">Two Piece Suits</a></li>
            <li><a href="/suits/tuxedo" className="quick-link">Tuxedo Dinner Suit</a></li>
            <li><a href="/suits/kaunda" className="quick-link">Kaunda Suit</a></li>
            <li><a href="/shirts/official" className="quick-link">Official Shirt</a></li>
            <li><a href="/shirts/cassual" className="quick-link">Cassual Shirt</a></li>
            <li><a href="/jeans" className="quick-link">Jean</a></li>
            <li><a href="/accessories/ties" className="quick-link">Ties</a></li>
            <li><a href="/accessories/belt" className="quick-link">Belt</a></li>
            <li><a href="/accessories/socks" className="quick-link">Socks</a></li>
            <li><a href="/jackets/leather" className="quick-link">Leather Jackets</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-white/20 pt-8 pb-2 text-center">
        <p className="text-gray-400 text-xs">
          © 2025, Sir Apollo's Menswear — Powered by Dr Erastus Coding Co-oporation
        </p>
      </div>
    </footer>
  );
};

export default Footer;



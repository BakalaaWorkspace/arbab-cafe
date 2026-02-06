import React from "react";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const mapLocation = "https://maps.app.goo.gl/pgLWanSyN5XCiRjy5";
  const phoneNumber = "+918108038973";
  const address = "Shop No.3, Sunshine Apartment, opp. Virani Petrol Pump, Tetavli, Kausa, Mumbra, Thane, Maharashtra 400612";

  return (
    <footer className="relative bg-[#0a0a0a] text-gray-300 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-red-600/40 to-transparent" />

      <div className="mx-auto px-6 sm:px-12 2xl:max-w-400 3xl:max-w-[1920px] py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">

          {/* BRAND + CONTACT INFO */}
          <div className="flex flex-col space-y-6 items-center lg:items-start text-center lg:text-left max-w-md">
            <img
              src="src/assets/logo.png"
              alt="Arbab Cafe Logo"
              className="h-16 w-auto brightness-110"
            />

            {/* ADDRESS */}
            <a
              href={mapLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition"
            >
              <MapPin size={18} className="text-red-600 mt-0.5" />
              <span>
                {address}
              </span>
            </a>

            {/* PHONE */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition"
            >
              <Phone size={18} className="text-red-600" />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* LINKS + SOCIAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 w-full lg:w-auto">

            {/* EXPLORE */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600 mb-8">
                Explore
              </h4>
              <ul className="space-y-4">
                {[
                  "Terms & Conditions",
                  "Delivery Policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group relative text-sm text-gray-400 hover:text-white transition"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-600 transition-all group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIAL */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600 mb-8">
                Connect
              </h4>
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 text-sm text-gray-400 hover:text-white transition group"
                >
                  <span className="text-gray-500 group-hover:text-red-500">
                    <Instagram size={18} />
                  </span>
                  <span>Instagram</span>
                </a>

                <a
                  href="#"
                  className="flex items-center space-x-3 text-sm text-gray-400 hover:text-white transition group"
                >
                  <span className="text-gray-500 group-hover:text-red-500">
                    <Facebook size={18} />
                  </span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 border-t border-white/5" />

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
            © {new Date().getFullYear()} Arbab Cafe. All rights reserved.
          </p>

          <a
            href={mapLocation}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-red-500 transition group"
          >
            <MapPin size={14} className="text-red-600" />
            <span className="border-b border-transparent group-hover:border-red-600">
              View on Map
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

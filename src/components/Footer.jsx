import logo from "../assets/Logo/Mahitala.png";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center lg:items-start">
              <img 
                src={logo} 
                className="w-44 h-auto mb-4" 
                alt="Mahitala Logo" 
              />
              <p className="text-gray-600 text-base leading-relaxed text-center lg:text-left max-w-sm">
                Solusi terpercaya untuk membantu petani mengelola risiko terkait perubahan cuaca ekstrem.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center lg:text-left">
              Navigasi
            </h3>
            <nav className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className="text-gray-600 hover:text-[#6C7D41] font-medium transition-colors duration-300 text-center lg:text-left py-1"
              >
                Halaman Utama
              </NavLink>
              <NavLink
                to="/peta"
                className="text-gray-600 hover:text-[#6C7D41] font-medium transition-colors duration-300 text-center lg:text-left py-1"
              >
                Peta
              </NavLink>
              <NavLink
                to="/forum"
                className="text-gray-600 hover:text-[#6C7D41] font-medium transition-colors duration-300 text-center lg:text-left py-1"
              >
                Forum Diskusi
              </NavLink>
              <NavLink
                to="/tentang-kami"
                className="text-gray-600 hover:text-[#6C7D41] font-medium transition-colors duration-300 text-center lg:text-left py-1"
              >
                Tentang Kami
              </NavLink>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center lg:text-left">
              Ikuti Kami
            </h3>
            <div className="flex justify-center lg:justify-start space-x-5">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-gray-100 hover:bg-[#6C7D41] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-gray-100 hover:bg-[#6C7D41] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaXTwitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-gray-100 hover:bg-[#6C7D41] rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Mahitala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
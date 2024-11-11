import logo from "../assets/Logo/Mahitala 1.png";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 p-8 mt-20">
      <div className="flex container mx-auto flex-col md:flex-row items-center justify-between px-5 py-4">
        <div className="flex flex-col md:items-start items-center mb-4 md:mb-0">
          <img src={logo} className="w-40 mb-3" alt="Mahitala Logo" />
          <p className="text-gray-700 text-sm md:text-base text-center">
            Solusi terpercaya untuk membantu petani mengelola risiko terkait perubahan cuaca ekstrem.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center text-gray-800 mb-4 md:mb-0">
          <NavLink
            to="/forum"
            className="block px-4 py-2 text-sm font-semibold hover:text-[#6C7D41] transition-colors duration-200"
            aria-current="page"
          >
            Forum Diskusi
          </NavLink>
          <NavLink
            to="/tentang-kami"
            className="block px-4 py-2 text-sm font-semibold hover:text-[#6C7D41] transition-colors duration-200"
            aria-current="page"
          >
            Tentang Kami
          </NavLink>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6C7D41] transition-colors duration-200">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6C7D41] transition-colors duration-200">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6C7D41] transition-colors duration-200">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} Mahitala. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

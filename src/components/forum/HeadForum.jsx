import React, { useState, useCallback, useEffect } from "react";
import { FaSearch, FaPlus, FaList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, LogOut, Newspaper } from "lucide-react";
import { loginAuth, registerAuth, logoutAuth } from "../../hooks/forum/auth/Authentication";
import { useUser } from "../../utils/userContext";

import { Modal, LoginForm, RegisterForm } from "./SubComponents/ModalAuth";

const HeadForum = () => {
  const { setIsAuthenticated, setCurrentUser, isAuthenticated } = useUser();
  const [searchText, setSearchText] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerToken] = useState(Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const toggleLoginModal = useCallback(() => {
    setIsError(false);
    setIsLoginOpen((prev) => !prev);
  }, []);

  const toggleRegisterModal = useCallback(() => {
    setIsError(false);
    setIsRegisterOpen((prev) => !prev);
  }, []);

  const handleLogin = useCallback(async (formData) => {
    try {
      if (!formData.username || !formData.token) {
        setIsError(true);
        setErrorMessage("Username dan token harus diisi");
        return;
      }

      const res = await loginAuth(formData);
      if (res.status === 200) {
        const { user } = res.data;
        setIsAuthenticated(true);
        setCurrentUser(user);
        setIsLoginOpen(false);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setIsError(true);
        setErrorMessage(res.message || "Terjadi kesalahan, silahkan coba lagi");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Terjadi kesalahan, silahkan coba lagi");
    }
  }, []);
  
  const handleRegister = useCallback(async (formData) => {
    try {
      if (!formData.username) {
        setIsError(true);
        setErrorMessage("Username harus diisi");
        return;
      }

      const res = await registerAuth(formData);
  
      if (res.status === 200) {
        const { user } = res.data;
        setIsAuthenticated(true);
        setCurrentUser(user);
        setIsRegisterOpen(false);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setIsError(true);
        setErrorMessage(res.message || "Terjadi kesalahan, silahkan coba lagi");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Terjadi kesalahan, silahkan coba lagi");
    }
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    logoutAuth();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full md:px-0 space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full">
            <div className="flex items-center px-4 py-2 transition-all duration-300 rounded-lg bg-gray-200 focus-within:bg-gray-300">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Cari diskusi"
                value={searchText}
                onChange={handleInputChange}
                className="pl-4 text-gray-700 w-full focus:outline-none bg-transparent"
              />
            </div>
          </div>
          {searchText && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Link
                to={`/forum/cari/${searchText}`}
                className="ml-2 px-4 py-2 text-md font-semibold text-white bg-[#6C7D41] rounded-lg hover:bg-[#5b6936] transition-all duration-300"
              >
                Cari
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
        {isAuthenticated ? (
          <>
            <Link
              to="/forum/buat-diskusi"
              className="flex items-center justify-center px-4 py-2 text-md font-semibold text-[#6C7D41] hover:text-white bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] transition-all duration-300 w-full md:w-auto"
            >
              <FaPlus className="mr-2" /> Buat Diskusi
            </Link>
            <div className="grid grid-cols-2 w-full gap-2 md:hidden">
              <div className="grid grid-cols-1">
                <Link
                  to="/forum/diskusi-terakhir"
                  className="flex items-center justify-center px-4 py-2 text-md font-semibold text-[#6C7D41] hover:text-white bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] transition-all duration-300 w-full md:w-auto"
                >
                  <FaList className="mr-2" /> Diskusi Terakhir
                </Link>
              </div>
              <div className="grid grid-cols-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center px-4 py-2 w-full md:w-auto text-md font-semibold text-red-500 bg-transparent border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Keluar
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/forum/diskusi-terakhir"
                className="flex items-center justify-center px-4 py-2 text-md font-semibold text-[#6C7D41] hover:text-white bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] transition-all duration-300"
              >
                <FaList className="mr-2" /> Diskusi Terakhir
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-2 text-md font-semibold text-red-500 bg-transparent border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Keluar
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={toggleLoginModal}
              className="flex px-8 py-2 text-md font-semibold items-center justify-center text-[#6C7D41] bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] hover:text-white transition-all duration-300 w-full md:w-auto"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Masuk
            </button>
            <button
              onClick={toggleRegisterModal}
              className="flex px-8 py-2 text-md font-semibold items-center justify-center text-[#6C7D41] bg-transparent border border-[#6C7D41] rounded-lg hover:bg-[#6C7D41] hover:text-white transition-all duration-300 w-full md:w-auto"
            >
              <Newspaper className="w-5 h-5 mr-2" />
              Daftar
            </button>
          </>
        )}
      </div>

      <Modal
        isOpen={isLoginOpen}
        onClose={toggleLoginModal}
        isError={isError}
        errorMessage={errorMessage}
        title="Selamat Datang"
        description="Silahkan masuk untuk melanjutkan diskusi"
      >
        <LoginForm onSubmit={handleLogin} />
      </Modal>

      <Modal
        isOpen={isRegisterOpen}
        onClose={toggleRegisterModal}
        isError={isError}
        errorMessage={errorMessage}
        title="Buat Akun"
        description="Silahkan buat akun untuk bergabung dalam diskusi"
      >
        <RegisterForm onSubmit={handleRegister} initialToken={registerToken} />
      </Modal>
    </div>
  );
};

export default HeadForum;

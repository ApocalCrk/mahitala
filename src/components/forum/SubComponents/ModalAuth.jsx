import React, { useState } from "react";
import { X, Copy, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = React.memo(({ isOpen, onClose, title, description, children }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] "
            style={{ marginTop: "env(safe-area-inset-top)", marginBottom: "env(safe-area-inset-bottom)" }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4">
            <motion.div
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-500">{description}</p>
              </div>

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

const LoginForm = React.memo(({ onSubmit }) => {
  const [formData, setFormData] = useState({ username: "", token: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pengguna</label>
        <input
          type="text"
          name="username"
          placeholder="Masukkan nama pengguna"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5b6936] focus:ring-2 focus:ring-[#5b6936] transition-all duration-200 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Token Unik</label>
        <input
          type="text"
          name="token"
          placeholder="Masukkan token Anda"
          value={formData.token}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5b6936] focus:ring-2 focus:ring-[#5b6936] transition-all duration-200 outline-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg font-medium bg-[#6C7D41] text-white hover:bg-[#5b6936] transition-all duration-300"
      >
        Masuk
      </motion.button>
    </div>
  );
});

const RegisterForm = React.memo(({ onSubmit, initialToken }) => {
  const [formData, setFormData] = useState({ username: "", token: initialToken });
  const [copySuccess, setCopySuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(formData.token);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pengguna</label>
        <input
          type="text"
          name="username"
          placeholder="Masukkan nama pengguna"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5b6936] focus:ring-2 focus:ring-[#5b6936] transition-all duration-200 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Token Unik (Otomatis)</label>
        <div className="relative">
          <input
            type="text"
            value={formData.token}
            readOnly
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 pr-12"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyToken}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {copySuccess ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg font-medium bg-[#6C7D41] text-white hover:bg-[#5b6936] transition-all duration-300"
      >
        Daftar
      </motion.button>
    </div>
  );
});

export { Modal, LoginForm, RegisterForm };
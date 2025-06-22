import { Download, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const STORAGE_KEY = "mahitala-update-dismissed";

function PwaHandler() {
  const {
    needRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("Service Worker Registered", r);
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });

  const [showReloadPrompt, setShowReloadPrompt] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (needRefresh && !dismissed) {
      setShowReloadPrompt(true);
    }
  }, [needRefresh]);

  const handleReload = () => {
    localStorage.removeItem(STORAGE_KEY);
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShowReloadPrompt(false);
  };

  if (!showReloadPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-sm w-full mx-4 sm:mx-0 z-[9999] animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-2xl shadow-black/10 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
        >
          <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 pt-0.5">
            <h3 className="text-gray-900 font-semibold text-sm mb-1">Pembaruan Tersedia</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Versi terbaru aplikasi dengan fitur dan perbaikan baru telah tersedia.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleReload}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-green-600/25 hover:shadow-green-600/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Perbarui Sekarang
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Nanti
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-20"></div>
      </div>
    </div>
  );
}

export default PwaHandler;

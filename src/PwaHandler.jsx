import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

// Komponen ini sekarang tidak akan merender UI apapun,
// hanya akan menangani logika PWA di latar belakang.
function PwaHandler() {
  const {
    needRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered:", r);
    },
    onRegisterError(error) {
      console.log("SW registration error:", error);
    },
  });

  // Effect untuk menangani pembaruan secara otomatis.
  useEffect(() => {
    if (needRefresh) {
      // Jika ada versi baru, langsung panggil updateServiceWorker
      // untuk memuat ulang dan mengaktifkannya secara otomatis.
      updateServiceWorker(true);
    }
  }, [needRefresh]);

  // Karena komponen ini tidak menampilkan apa-apa,
  // ia hanya mengembalikan null.
  return null;
}

// Nama komponen diubah untuk mencerminkan fungsinya yang baru.
export default PwaHandler;

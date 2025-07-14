import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { InterfaceModal } from "./InterfaceModal";

export const ModalComponent: React.FC<InterfaceModal> = ({
  open,
  setOpen,
  title,
  children,
  messageButton,
  handleButton,
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Crear el contenedor del portal solo una vez
    const container = document.createElement("div");
    container.id = "modal-portal";
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      // Limpieza al desmontar
      document.body.removeChild(container);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!portalContainer || !open) return null;

  return createPortal(
    <div className="fixed bg-red-500 inset-0 flex items-center justify-center z-[300] bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/3 max-w-2xl mx-auto rounded-2xl shadow-xl bg-white animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del modal */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-t-2xl text-white shadow-lg">
          <p className="text-xl sm:text-2xl font-semibold">{title}</p>
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-gray-100 transition duration-200 focus:outline-none"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="text-gray-800">{children}</div>
        </div>

        {/* Footer del modal (opcional) */}
        {messageButton && handleButton && (
          <div className="p-4 bg-gray-50 rounded-b-2xl text-center">
            <button
              onClick={handleButton}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              {messageButton}
            </button>
          </div>
        )}
      </div>
    </div>,
    portalContainer
  );
};

// Añade esto a tu archivo de estilos global o en un tag <style>:
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// @keyframes scaleIn {
//   from { transform: scale(0.95); }
//   to { transform: scale(1); }
// }
// .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
// .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
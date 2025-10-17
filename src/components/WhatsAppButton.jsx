import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '5521994078286'; // Formato internacional sem espaços
  const message = 'Olá! Vi seu portfólio e gostaria de conversar.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group"
      >
        <div className="flex items-center gap-3 py-3 px-4">
          <MessageCircle size={28} className="animate-pulse" />
          <span 
            className={`font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            Fale no WhatsApp
          </span>
        </div>
      </a>
      
      {/* Efeito de pulso */}
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 pointer-events-none" />
    </div>
  );
};

export default WhatsAppButton;


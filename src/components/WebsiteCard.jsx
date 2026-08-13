import React from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WebsiteCard = ({ website }) => {
  const { addToCart, cartItems } = useCart();
  
  const isInCart = cartItems.some(item => item.id === website.id);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={website.image} 
          alt={website.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {website.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-1" title={website.name}>{website.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{website.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-extrabold text-primary">{website.price} AZN</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <a 
            href={website.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
          >
            <ExternalLink size={16} />
            Demo Baxış
          </a>
          
          <button 
            onClick={() => addToCart(website)}
            disabled={isInCart}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
              isInCart 
                ? 'bg-green-500 text-white cursor-not-allowed' 
                : 'bg-accent hover:bg-primary text-white hover:shadow-lg hover:shadow-accent/30'
            }`}
          >
            <ShoppingCart size={16} />
            {isInCart ? 'Səbətdədir' : 'Səbətə At'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;

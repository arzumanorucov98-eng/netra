import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { createOrder } from '../firebase/api';

const CartSidebar = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const { companyInfo } = useData();

  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!customerName || !customerPhone) {
      alert("Zəhmət olmasa ad, soyad və əlaqə nömrənizi daxil edin.");
      return;
    }

    // 1. WhatsApp Mesajını Hazırla və Yönləndir
    let message = `Salam. Netra Marketing saytından aşağıdakı veb saytları sifariş etmək istəyirəm:\n\n`;
    cartItems.forEach(item => {
      message += `- ${item.name} - ${item.price} AZN\n`;
    });
    message += `\nÜmumi məbləğ: ${cartTotal} AZN\n\n`;
    message += `Əlaqə:\nAd Soyad: ${customerName}\nTelefon: ${customerPhone}`;

    const encodedMessage = encodeURIComponent(message);
    const rawPhone = companyInfo?.phone || '994519784946';
    const phoneNumber = rawPhone.replace(/\D/g, ''); // Removes all non-digit characters
    
    // Açılan pəncərənin qarşısını almamaq üçün birbaşa açırıq
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Səbəti bağla
    setIsCartOpen(false);

    // 2. Bazaya (Firebase) Sifarişi Göndər (Arxa planda)
    try {
      await createOrder({
        customerName,
        customerPhone,
        totalPrice: cartTotal,
        items: cartItems.map(item => ({ id: item.id, name: item.name, price: item.price }))
      });
    } catch (err) {
      console.error("Firebase sifariş göndərmə xətası:", err);
      // Xəta olsa belə WhatsApp artıq açılıb
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2 text-primary">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-bold">Səbətiniz</h2>
            <span className="bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p className="text-lg">Səbətiniz boşdur</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-secondary text-sm line-clamp-1" title={item.name}>{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-primary">{item.price} AZN</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-1"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white space-y-4">
            <div className="space-y-3 pb-3 border-b border-gray-100">
              <input 
                type="text" 
                placeholder="Ad Soyad"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary"
              />
              <input 
                type="tel" 
                placeholder="Əlaqə Nömrəsi"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Ümumi:</span>
              <span className="text-2xl font-black text-primary">{cartTotal} AZN</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-accent hover:bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.124.553 4.195 1.603 6.012L.15 23.364l5.44-1.428A11.97 11.97 0 0012.032 24c6.645 0 12.031-5.388 12.031-12.035C24.062 5.388 18.676 0 12.031 0zm3.565 17.202c-.15.426-.874.832-1.222.846-.35.015-.758.117-2.392-.533-1.975-.785-3.238-2.827-3.336-2.956-.098-.13-1.096-1.464-1.096-2.793 0-1.33.687-1.986.932-2.261.246-.275.534-.344.712-.344.178 0 .356.002.518.01.162.008.38-.063.593.456.213.518.728 1.776.793 1.905.064.13.106.282.025.445-.08.163-.122.264-.244.408-.122.144-.258.318-.366.417-.122.115-.25.242-.11.485.14.242.624 1.032 1.34 1.666.924.816 1.7 1.066 1.944 1.181.244.115.386.096.53-.069.144-.165.623-.728.791-.978.168-.25.336-.208.563-.122.227.086 1.442.68 1.686.8.244.12.408.181.468.283.06.102.06.593-.09 1.019z"/>
              </svg>
              Sifarişi Tamamla
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

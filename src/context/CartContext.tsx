import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ColorOption, AccessoryOption, Order, PageType } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, color: ColorOption, accessory: AccessoryOption | null, engravingText: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  checkoutStep: 'shipping' | 'payment' | 'success';
  setCheckoutStep: (step: 'shipping' | 'payment' | 'success') => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    color: ColorOption,
    accessory: AccessoryOption | null,
    engravingText: string
  ) => {
    const hash = `${product.id}-${color.id}-${accessory?.id || 'none'}-${engravingText}`;
    
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === hash);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: hash,
            product,
            selectedColor: color,
            selectedAccessory: accessory,
            engravingText,
            quantity: 1,
          },
        ];
      }
    });
    setIsCartOpen(true); // Open the drawer so the user knows it succeeded!
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.basePrice + (item.selectedAccessory?.price || 0) + (item.engravingText ? 8 : 0); // 8€ engraving charge
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        checkoutStep,
        setCheckoutStep,
        activeOrder,
        setActiveOrder,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

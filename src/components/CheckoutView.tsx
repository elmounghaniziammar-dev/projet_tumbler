import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { SVGTumbler } from './SVGTumbler';
import { ShippingAddress, Order } from '../types';
import { ChevronRight, ShieldCheck, CreditCard, Gift, Loader, CheckCircle, Package, Truck, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutView: React.FC = () => {
  const {
    cartItems,
    cartTotal,
    checkoutStep,
    setCheckoutStep,
    activeOrder,
    setActiveOrder,
    clearCart,
    setCurrentPage,
  } = useCart();

  const [shippingForm, setShippingForm] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [trackingIndex, setTrackingIndex] = useState(0);

  const shippingCost = cartTotal >= 50 ? 0 : 4.9;
  const orderTotal = cartTotal + shippingCost;

  // Simulate progress on the success page tracker
  useEffect(() => {
    if (checkoutStep === 'success') {
      const interval = setInterval(() => {
        setTrackingIndex((prev) => (prev < 3 ? prev + 1 : prev));
      }, 5000); // Progresses tracker step every 5 seconds
      return () => clearInterval(interval);
    }
  }, [checkoutStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd validate here
    setCheckoutStep('payment');
  };

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate standard credit card processing lag
    setTimeout(() => {
      const mockOrder: Order = {
        id: `AURA-${Math.floor(Math.random() * 900000 + 100000)}`,
        items: [...cartItems],
        shippingAddress: shippingForm,
        subtotal: cartTotal,
        shippingCost,
        total: orderTotal,
        date: new Date().toLocaleDateString('fr-FR'),
        status: 'placed',
      };
      setActiveOrder(mockOrder);
      setIsProcessing(false);
      setCheckoutStep('success');
      clearCart(); // empty cart
    }, 2000);
  };

  const steps = [
    { id: 'shipping', label: '1. Livraison' },
    { id: 'payment', label: '2. Règlement' },
    { id: 'success', label: '3. Confirmation' },
  ];

  return (
    <section className="bg-[#faf8fe] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Checkout Header Progress Tracker */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between">
            {steps.map((st, idx) => {
              const isActive = checkoutStep === st.id;
              const isDone =
                (checkoutStep === 'payment' && st.id === 'shipping') ||
                (checkoutStep === 'success' && (st.id === 'shipping' || st.id === 'payment'));
              
              return (
                <div key={st.id} className="flex-1 flex items-center">
                  <div className="flex items-center space-x-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                      isActive
                        ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-md shadow-[#0066FF]/15'
                        : isDone
                        ? 'bg-black border-black text-white'
                        : 'bg-white border-neutral-200 text-neutral-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      isActive ? 'text-[#0066FF]' : isDone ? 'text-black' : 'text-neutral-400'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-[1px] flex-1 mx-4 ${isDone ? 'bg-black' : 'bg-neutral-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic checkout panels */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Shipping Address Form */}
          {checkoutStep === 'shipping' && (
            <motion.div
              key="shipping-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto"
            >
              
              {/* Form Input Block - Column Span 7 */}
              <form onSubmit={submitShipping} className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-neutral-200/50 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-black tracking-tight uppercase font-mono border-b border-neutral-100 pb-4">
                  Adresse de Livraison
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Prénom</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={shippingForm.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Nom</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={shippingForm.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      placeholder="jean.dupont@gmail.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Téléphone</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Adresse</label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={shippingForm.address}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                    placeholder="12 Ruelle de la Paix"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Ville</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={shippingForm.city}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      placeholder="Paris"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Code Postal</label>
                    <input
                      required
                      type="text"
                      name="postalCode"
                      value={shippingForm.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                      placeholder="75001"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-neutral-900 shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Continuer vers le Paiement</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              {/* Order summary sidebar - Column Span 5 */}
              <div className="lg:col-span-5 bg-[#F5F5F7] p-8 rounded-3xl border border-neutral-200/40 shadow-inner h-fit space-y-6">
                <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-neutral-400 border-b border-neutral-200/60 pb-3">
                  Aperçu de la commande
                </h3>

                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 bg-white rounded-lg p-1 border border-neutral-200/50 flex items-center justify-center">
                        <SVGTumbler productId={item.product.id} selectedColor={item.selectedColor} animate={false} className="w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-black block truncate">{item.product.name}</span>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono font-semibold">
                          Qté: {item.quantity} × {item.selectedColor.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-black font-sans">
                        {(item.product.basePrice + (item.selectedAccessory?.price || 0) + (item.engravingText ? 8 : 0)) * item.quantity} €
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200/60 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Articles</span>
                    <span className="font-mono">{cartTotal} €</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Livraison</span>
                    <span className="font-mono text-emerald-600">
                      {shippingCost === 0 ? 'GRATUIT' : `${shippingCost} €`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-neutral-200 my-2" />
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-black">Total final</span>
                    <span className="text-xl font-extrabold text-black font-sans">{orderTotal} €</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 2: Payment Details Credit Card Form */}
          {checkoutStep === 'payment' && (
            <motion.div
              key="payment-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto"
            >
              
              {/* Card Inputs - Column Span 7 */}
              <form onSubmit={submitPayment} className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-neutral-200/50 shadow-sm space-y-6">
                
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <h2 className="text-xl font-bold text-black tracking-tight uppercase font-mono flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-[#0066FF]" />
                    <span>Paiement Sécurisé</span>
                  </h2>
                  <div className="flex items-center space-x-1">
                    <span className="w-6 h-4 bg-neutral-100 rounded border border-neutral-200"></span>
                    <span className="w-6 h-4 bg-neutral-100 rounded border border-neutral-200"></span>
                    <span className="w-6 h-4 bg-neutral-100 rounded border border-neutral-200"></span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Titulaire de la carte</label>
                  <input
                    required
                    type="text"
                    name="cardName"
                    value={paymentForm.cardName}
                    onChange={handlePaymentChange}
                    className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1"
                    placeholder="JEAN DUPONT"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Numéro de carte</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="cardNumber"
                      maxLength={19}
                      value={paymentForm.cardNumber}
                      onChange={(e) => {
                        // formats 4-4-4-4
                        const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setPaymentForm((prev) => ({ ...prev, cardNumber: val }));
                      }}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1"
                      placeholder="4242 •••• •••• 4242"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Date d'expiration</label>
                    <input
                      required
                      type="text"
                      name="cardExpiry"
                      maxLength={5}
                      value={paymentForm.cardExpiry}
                      onChange={(e) => {
                        // formats MM/YY
                        let val = e.target.value.replace(/\//g, '');
                        if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                        setPaymentForm((prev) => ({ ...prev, cardExpiry: val }));
                      }}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">CVC</label>
                    <input
                      required
                      type="text"
                      name="cardCvc"
                      maxLength={3}
                      value={paymentForm.cardCvc}
                      onChange={handlePaymentChange}
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1"
                      placeholder="123"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#0066FF] hover:bg-[#0050cc] text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-lg shadow-[#0066FF]/15 flex items-center justify-center space-x-2.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Traitement de la transaction...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4.5 h-4.5 stroke-[2]" />
                      <span>Régler {orderTotal} €</span>
                    </>
                  )}
                </button>
              </form>

              {/* Order review side bar - Column Span 5 */}
              <div className="lg:col-span-5 bg-[#F5F5F7] p-8 rounded-3xl border border-neutral-200/40 shadow-inner h-fit space-y-6">
                <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-neutral-400 border-b border-neutral-200/60 pb-3">
                  Résumé de livraison
                </h3>
                <div className="text-xs space-y-1.5 text-neutral-500">
                  <span className="font-bold text-black block">{shippingForm.firstName} {shippingForm.lastName}</span>
                  <span className="block">{shippingForm.address}</span>
                  <span className="block">{shippingForm.postalCode} {shippingForm.city}</span>
                  <span className="block">{shippingForm.country}</span>
                  <span className="block pt-1.5 font-mono text-[10px]">{shippingForm.phone}</span>
                </div>
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="text-xs font-bold text-[#0066FF] hover:underline uppercase tracking-wide cursor-pointer"
                >
                  Modifier l'adresse
                </button>
              </div>

            </motion.div>
          )}

          {/* STEP 3: Order Confirmation and REAL-TIME Live Custom Engraving Tracker */}
          {checkoutStep === 'success' && activeOrder && (
            <motion.div
              key="success-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto bg-white rounded-3xl border border-neutral-200/50 shadow-xl p-8 md:p-16 text-center space-y-10"
            >
              
              {/* Big Success Tick */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-[bounce_1s_ease-out_1]">
                  <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-[#0066FF] font-bold uppercase tracking-wider block">Commande validée</span>
                  <h2 className="text-3xl font-extrabold text-black tracking-tight">Merci pour votre achat !</h2>
                  <span className="font-mono text-sm font-bold text-neutral-400 uppercase">Référence : {activeOrder.id}</span>
                </div>
              </div>

              {/* Order details outline */}
              <div className="p-6 bg-[#faf8fe] rounded-2xl border border-neutral-200/50 text-left max-w-lg mx-auto space-y-4">
                <span className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest text-center border-b border-neutral-200 pb-3">
                  Suivi de fabrication & livraison
                </span>
                
                {/* 4-Step Interactive Customization Progress Tracker */}
                <div className="space-y-8 relative py-4 pl-4">
                  {/* Line backdrop */}
                  <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-neutral-200" />
                  
                  {[
                    { label: "Commande Reçue", desc: "Votre commande est enregistrée dans notre système central.", icon: CheckCircle, idx: 0 },
                    { label: "Gravure Laser & Contrôle", desc: "Notre atelier parisien grave au laser et inspecte les finitions.", icon: Compass, idx: 1 },
                    { label: "Préparation du Colis", desc: "Emballage soigné dans notre boîte écologique en carton kraft.", icon: Package, idx: 2 },
                    { label: "Expédition Chronopost", desc: "Livraison suivie sous 24h à 48h.", icon: Truck, idx: 3 },
                  ].map((step, idx) => {
                    const isCompleted = trackingIndex >= idx;
                    const isCurrent = trackingIndex === idx;

                    return (
                      <div key={idx} className="flex items-start space-x-4 relative z-10">
                        {/* Circular node with icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border ${
                          isCompleted
                            ? 'bg-[#0066FF] border-[#0066FF] text-white'
                            : 'bg-white border-neutral-200 text-neutral-300'
                        } ${isCurrent ? 'animate-pulse ring-4 ring-[#0066FF]/10' : ''}`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-bold block ${isCompleted ? 'text-black' : 'text-neutral-400'}`}>
                            {step.label}
                            {isCurrent && (
                              <span className="ml-2 text-[10px] bg-amber-500 text-white font-mono uppercase tracking-widest px-1.5 py-0.5 rounded">
                                En cours
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-neutral-400 block pt-0.5 font-normal leading-relaxed">{step.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl text-center">
                  <span className="text-[10px] font-mono text-amber-600 block uppercase tracking-wider font-bold">
                    💡 Info Simulation
                  </span>
                  <span className="text-neutral-500 text-[11px] block pt-1 leading-relaxed">
                    Les étapes se mettent à jour automatiquement en direct toutes les 5 secondes pour simuler le flux d'atelier parisien d'Aura Precision.
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setCheckoutStep('shipping');
                  setActiveOrder(null);
                }}
                className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 cursor-pointer transition-all"
              >
                <span>Retourner à l'Accueil</span>
              </button>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};

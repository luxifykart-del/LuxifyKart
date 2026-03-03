import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2, Loader2, ShoppingBag, Home, User, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

/**
 * CheckoutPage - Full checkout form with auto submission to Google Sheets
 * Uses Google Apps Script as backend to save orders directly to Google Sheets
 * No redirect to Google Form needed - customer stays on website
 */

// Google Apps Script Web App URL - Direct to Google Sheets
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6EEbUByrCKzPHKJ0FC_Vst0Ka3MGrkHjjaCP1OUs_UP6SSye9JvfJcKdgDsFzD24e/exec';

export function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' as 'cod' | 'upi',
    upiTransactionId: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  // Redirect if cart is empty
  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  // Generate product string from cart
  const productString = cart.map(item => `${item.name} (₹${item.price} x ${item.quantity})`).join(', ');
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle payment method change
  const handlePaymentChange = (method: 'cod' | 'upi') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  // Submit order directly to Google Sheets via Apps Script
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your delivery address');
      return;
    }
    if (formData.paymentMethod === 'upi' && !formData.upiTransactionId.trim()) {
      toast.error('Please enter your UPI Transaction ID');
      return;
    }

    setIsSubmitting(true);

    // Prepare order data
    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      products: productString,
      quantity: totalQuantity.toString(),
      amount: cartTotal.toString(),
      paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI / Online Payment',
      upiTransactionId: formData.upiTransactionId || ''
    };

    try {
      // Method 1: Try Google Apps Script
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      // If we get here, assume success
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully! We will contact you soon.');
      
    } catch (error) {
      // Method 2 fallback: Open WhatsApp with order details
      console.log('Apps Script failed, using fallback');
      
      const whatsappMessage = `*New Order from LuxifyKart*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n*Products:* ${productString}\n*Quantity:* ${totalQuantity}\n*Amount:* ₹${cartTotal}\n*Payment:* ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI / Online Payment'}${formData.upiTransactionId ? `\n*UPI ID:* ${formData.upiTransactionId}` : ''}`;
      
      const whatsappUrl = `https://wa.me/918826923506?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed! We have received your details via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thank You / Order Confirmed Page
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">
            Order Confirmed!
          </h2>
          
          <p className="text-neutral-600 mb-6 text-lg">
            Thank you for your order! We have received your details and will process your order shortly.
          </p>

          <div className="bg-neutral-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-neutral-900 mb-2">Order Details:</h3>
            <p className="text-sm text-neutral-600"><strong>Products:</strong> {productString}</p>
            <p className="text-sm text-neutral-600"><strong>Total:</strong> ₹{cartTotal.toLocaleString()}</p>
            <p className="text-sm text-neutral-600"><strong>Payment:</strong> {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI / Online'}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex-1 py-3 px-6 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mb-2">Checkout</h1>
          <p className="text-neutral-600">Complete your order by filling in the details below</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              ref={formRef}
              onSubmit={handlePlaceOrder}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Delivery Details
              </h2>

              {/* Name Field */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 pl-12 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Phone Field */}
              <div className="mb-5">
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 pl-12 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Address Field */}
              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                  Delivery Address *
                </label>
                <div className="relative">
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                    className="w-full px-4 py-3 pl-12 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white transition-all duration-200 resize-none"
                  />
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Payment Method Selection */}
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h3>

              {/* Cash on Delivery Option */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handlePaymentChange('cod')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${
                  formData.paymentMethod === 'cod'
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      formData.paymentMethod === 'cod' ? 'border-neutral-900' : 'border-neutral-300'
                    }`}
                  >
                    {formData.paymentMethod === 'cod' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-neutral-900"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Cash on Delivery (COD)</h4>
                      <p className="text-sm text-neutral-600">Pay with cash when delivered</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* UPI / Online Payment Option */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handlePaymentChange('upi')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-4 ${
                  formData.paymentMethod === 'upi'
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      formData.paymentMethod === 'upi' ? 'border-neutral-900' : 'border-neutral-300'
                    }`}
                  >
                    {formData.paymentMethod === 'upi' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-neutral-900"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">UPI / Online Payment</h4>
                      <p className="text-sm text-neutral-600">Pay using UPI, Cards, Net Banking</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* UPI Transaction ID Field - Show when UPI is selected */}
              {formData.paymentMethod === 'upi' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <label htmlFor="upiTransactionId" className="block text-sm font-medium text-neutral-700 mb-2">
                    UPI Transaction ID *
                  </label>
                  <input
                    type="text"
                    id="upiTransactionId"
                    name="upiTransactionId"
                    value={formData.upiTransactionId}
                    onChange={handleInputChange}
                    placeholder="Enter your UPI transaction ID"
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    Payment details: ₹{cartTotal.toLocaleString()} - Transfer to your UPI app and enter transaction ID
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-semibold text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </motion.button>

              {/* Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Secure checkout - Your data is safe</span>
              </div>
            </motion.form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-neutral-100 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-900 font-medium truncate">{item.name}</p>
                      <p className="text-neutral-500 text-xs">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                    </div>
                    <span className="text-neutral-900 font-medium ml-2">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-neutral-900">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Delivery:</strong> Within 5-7 business days
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


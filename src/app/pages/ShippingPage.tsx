import { motion } from 'framer-motion';
import { Truck, Package, Clock, RefreshCw, MapPin } from 'lucide-react';

export function ShippingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-light">Shipping Policy</h1>
            </div>
            <p className="text-neutral-300">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Delivery Partners</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                We partner with trusted delivery services to ensure your products reach you safely 
                and on time. All orders are processed within 24-48 hours of confirmation.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Delivery Time</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Standard delivery times:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-2">
                <li>Metro cities: 3-5 business days</li>
                <li>Other cities: 5-7 business days</li>
                <li>Remote areas: 7-10 business days</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Shipping Charges</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                <span className="font-semibold text-green-600">FREE shipping</span> on all orders 
                across India! No delivery charges apply regardless of your location.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Delivery Areas</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                We deliver to all major cities and towns across India. For remote or restricted 
                areas, delivery times may vary. Our customer support team will notify you if 
                there are any delivery restrictions to your location.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Order Tracking</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Once your order is shipped, you will receive a tracking number via SMS and email. 
                You can track your order status on our website or the delivery partner's portal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Delivery Instructions</h2>
              <p className="text-neutral-600 leading-relaxed">
                Please ensure someone is available to receive the delivery at the provided address. 
                Our delivery partner will contact you before delivery. For any special delivery 
                instructions, please mention them during checkout.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


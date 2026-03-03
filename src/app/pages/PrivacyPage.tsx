import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin } from 'lucide-react';

export function PrivacyPage() {
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
              <Shield className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-light">Privacy Policy</h1>
            </div>
            <p className="text-neutral-300">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Information We Collect</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                At LuxifyKart, we collect information that you provide directly to us, including:
                your name, phone number, delivery address, and payment information when you 
                place an order. We also collect information about your browsing behavior and 
                preferences to improve our services.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">How We Use Your Information</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support</li>
                <li>Improve our</li>
                 website and services<li>Send you promotional offers (with your consent)</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Data Protection</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                We implement appropriate security measures to protect your personal information. 
                Your data is stored securely and we use industry-standard encryption for 
                sensitive payment information. We do not sell or share your personal 
                information with third parties except as necessary to fulfill your orders.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Contact Us</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-neutral-50 rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3 text-neutral-700">
                  <Mail className="w-5 h-5" />
                  <span>luxifykart@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-700">
                  <Phone className="w-5 h-5" />
                  <span>+91 8826923506</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-700">
                  <MapPin className="w-5 h-5" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


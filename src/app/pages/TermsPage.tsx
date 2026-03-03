import { motion } from 'framer-motion';
import { FileText, Scale, CheckCircle } from 'lucide-react';

export function TermsPage() {
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
              <FileText className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-light">Terms & Conditions</h1>
            </div>
            <p className="text-neutral-300">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-600 leading-relaxed">
                By accessing and using the LuxifyKart website, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by 
                these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">2. Account Responsibilities</h2>
              <p className="text-neutral-600 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account. 
                LuxifyKart reserves the right to refuse service, terminate accounts, or remove 
                content at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">3. Order and Payment</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                By placing an order through LuxifyKart, you agree to:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-2">
                <li>Provide accurate and complete billing information</li>
                <li>Pay all applicable taxes and shipping charges</li>
                <li>Authorize us to charge your payment method for the total order amount</li>
                <li>Ensure you are authorized to use the payment method</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">4. Product Information</h2>
              <p className="text-neutral-600 leading-relaxed">
                We strive to provide accurate product descriptions and pricing. However, 
                LuxifyKart does not warrant that product descriptions, prices, or other content 
                on the website is accurate, complete, reliable, or error-free. We reserve the 
                right to correct any errors and change prices without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-neutral-600 leading-relaxed">
                LuxifyKart shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from the use of this website or any products 
                purchased from us. Our total liability shall not exceed the amount paid for 
                the specific product giving rise to the claim.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">Governing Law</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with 
                the laws of India. Any disputes arising from these terms shall be subject 
                to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


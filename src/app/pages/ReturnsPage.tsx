import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, XCircle, Package } from 'lucide-react';

export function ReturnsPage() {
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
              <RefreshCw className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-light">Returns & Exchange</h1>
            </div>
            <p className="text-neutral-300">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Return Policy</h2>
              <p className="text-neutral-600 leading-relaxed">
                We want you to be completely satisfied with your purchase. If for any reason you 
                are not happy with your order, you can return it within 7 days of delivery for a 
                full refund or exchange.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Eligibility for Returns</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <p className="text-neutral-600">Product must be unused and in original packaging</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <p className="text-neutral-600">Tags and labels must be attached</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <p className="text-neutral-600">Product must be returned within 7 days of delivery</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <p className="text-neutral-600">Original receipt or proof of purchase required</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Non-Returnable Items</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-neutral-600">Used or damaged products</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-neutral-600">Products without original packaging or tags</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-neutral-600">Intimate apparel and personal care items</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-neutral-600">Customized or personalized products</p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">How to Initiate a Return</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed mb-4">
                To initiate a return:
              </p>
              <ol className="list-decimal list-inside text-neutral-600 space-y-2 ml-2">
                <li>Contact our customer support at luxifykart@gmail.com or +91 8826923506</li>
                <li>Provide your order number and reason for return</li>
                <li>Our team will guide you through the return process</li>
                <li>Pack the product securely and ship it back</li>
                <li>Refund will be processed within 5-7 business days after inspection</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Refunds</h2>
              <p className="text-neutral-600 leading-relaxed">
                Once we receive and inspect your returned item, we will notify you about the status 
                of your refund. If approved, the refund will be credited to your original payment 
                method within 5-7 business days. Please note that shipping charges are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Exchange Policy</h2>
              <p className="text-neutral-600 leading-relaxed">
                We offer free exchanges for size, color, or style issues. If you need a different 
                product, you can exchange it for an item of equal or higher value (difference 
                to be paid by customer). Contact our support team to process your exchange.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


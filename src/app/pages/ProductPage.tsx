import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ShoppingCart, Check, Star } from 'lucide-react';
import { products } from '../data/products';
import { productImages } from '../data/images';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-neutral-900 mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Go Home</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    toast.success(product.name + ' added to cart!');
    setTimeout(() => setAdded(false), 2000);
  };

  const productGallery = [
    productImages[product.image],
    productImages[product.image],
    productImages[product.image],
    productImages[product.image],
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={productGallery[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === idx ? 'border-neutral-900' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-neutral-500">(128 Reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-green-700">
                ₹{product.price.toLocaleString()}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-white bg-green-600 px-2 py-0.5 rounded">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-neutral-600 text-lg">{product.description}</p>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {(product.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-neutral-600">
                    <Check className="w-4 h-4 text-green-600" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                added ? 'bg-green-600 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {added ? (
                <><Check className="w-5 h-5" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}


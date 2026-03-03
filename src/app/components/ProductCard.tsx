import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { productImages } from '../data/images';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router';


interface ProductCardProps {
  product: Product;
}

export function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const { addToCart, cart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setShowSparkle(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => {
      setJustAdded(false);
      setShowSparkle(false);
    }, 2000);
  };

  const sparkleAngles = [0, 60, 120, 180, 240, 300];
  const isAdded = justAdded || isInCart;

    return (
    <Link to={`/product/${product.id}`}>
    <motion.div

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-200"
    >
      <AnimatePresence>
        {showSparkle && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {sparkleAngles.map((angle, i) => {
              const radians = (angle * Math.PI) / 180;
              const x = Math.cos(radians) * 80;
              const y = Math.sin(radians) * 80;
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x, y, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden bg-neutral-100 aspect-square">
        <motion.img
          src={productImages[product.image]}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-1 bg-white/90 backdrop-blur-sm text-neutral-900 py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-full flex items-center justify-center"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>
        {product.price > 2000 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Sale
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <ul className="space-y-1 mb-4">
          {(product.features || []).slice(0, 2).map((feature, index) => (
            <li key={index} className="text-xs text-neutral-500 flex items-start gap-1">
              <span className="text-neutral-400 mt-0.5">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
          <div>
            <motion.span
              key={product.price}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-neutral-900"
            >
              ₹{product.price.toLocaleString()}
            </motion.span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-md ${
              isAdded
                ? 'bg-green-600 text-white shadow-green-600/30'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            {isAdded ? 'Added' : 'Add to Cart'}
          </motion.button>
        </div>
                {/* Price Section - Replace existing with: */}
<div className="flex items-baseline gap-2">
  <span className="text-2xl font-bold text-green-700">₹{product.price.toLocaleString()}</span>
  {product.mrp && product.mrp > product.price && (
    <>
      <span className="text-base text-neutral-400 line-through">₹{product.mrp.toLocaleString()}</span>
      <span className="text-sm font-semibold text-white bg-green-600 px-2 py-0.5 rounded">
        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
      </span>
    </>
  )}
</div>

      </div>
      
        </motion.div>
    </Link>
  );
}

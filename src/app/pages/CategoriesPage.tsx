import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { categories } from '../data/products';

const categoryImages: Record<string, string> = {
  perfumes: '/website-images/perfumes.png',
  watches: '/website-images/watches.png',
  shoes: '/website-images/shoes.png',
  gadgets: '/website-images/gadgets.png',
  lifestyle: '/website-images/lifestyle-and-daily-uses.png',
};

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <img src="/website-images/homepage.png" alt="LuxifyKart" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Shop by Category</h1>
          <p className="text-neutral-300 text-lg">Explore our curated collection</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link key={category.id} to={'/category/' + category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-neutral-200"
                >
                  <div className="aspect-square overflow-hidden bg-neutral-100">
                    <img src={categoryImages[category.id]} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-neutral-900">{category.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-neutral-900 mb-4">Popular Products</h2>
          <Link to="/category/perfumes">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-neutral-900 text-white px-8 py-4 rounded-full">
              Browse All Products
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}


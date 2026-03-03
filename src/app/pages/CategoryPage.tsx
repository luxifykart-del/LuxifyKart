import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light text-neutral-900 mb-4">Category Not Found</h1>
          <p className="text-neutral-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Category Header */}
      <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-light mb-4">{category.name}</h1>
            <p className="text-neutral-300 text-lg">
              Discover our curated collection of premium {category.name.toLowerCase()}
            </p>
            <div className="mt-6 text-sm text-neutral-400">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}{' '}
              Available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">No products available in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

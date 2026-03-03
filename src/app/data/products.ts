// Product data interface - matches products.json structure
export interface Product {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  description?: string;
  features?: string[];
  category: string;
  image: string;
  selling_price?: number;
  image_url?: string;
  active?: boolean;
}

export const categories = [
  { id: 'perfumes', name: 'Perfumes', icon: '✨' },
  { id: 'watches', name: 'Watches', icon: '⌚' },
  { id: 'shoes', name: 'Shoes', icon: '👟' },
  { id: 'gadgets', name: 'Gadgets', icon: '📱' },
  { id: 'lifestyle', name: 'Lifestyle & Daily Use', icon: '🏡' },
];

// Default static products (fallback if JSON fails to load)
const defaultProducts: Product[] = [
  {
    id: 'p1',
    name: 'Midnight Oud Essence',
    price: 2499,
    mrp: 4999,
    description: 'A luxurious blend of oud, amber, and sandalwood for an unforgettable presence.',
    features: ['Long-lasting fragrance', '100ml bottle', 'Unisex appeal', 'Premium ingredients'],
    category: 'perfumes',
    image: 'perfume-luxury',
  },
  {
    id: 'p2',
    name: 'Citrus Bloom',
    price: 1899,
    mrp: 2599,
    description: 'Fresh and vibrant citrus notes perfect for everyday elegance.',
    features: ['Fresh scent', '50ml bottle', 'Day wear', 'Natural extracts'],
    category: 'perfumes',
    image: 'perfume-citrus',
  },
  {
    id: 'p3',
    name: 'Rose Noir',
    price: 2999,
    mrp: 4799,
    description: 'An elegant rose fragrance with hints of dark chocolate and vanilla.',
    features: ['Evening wear', '75ml bottle', 'Sophisticated', 'Long-lasting'],
    category: 'perfumes',
    image: 'perfume-rose',
  },
  {
    id: 'w1',
    name: 'Chronograph Elite',
    price: 8499,
    mrp: 10499,
    description: 'Precision Swiss movement with sapphire crystal and leather strap.',
    features: ['Swiss movement', 'Water resistant', 'Sapphire crystal', 'Premium leather'],
    category: 'watches',
    image: 'watch-luxury',
  },
  {
    id: 'w2',
    name: 'Minimalist Classic',
    price: 4999,
    mrp: 5899,
    description: 'Timeless design with clean lines and elegant minimalism.',
    features: ['Japanese movement', 'Stainless steel', 'Scratch resistant', 'Slim profile'],
    category: 'watches',
    image: 'watch-minimal',
  },
  {
    id: 'w3',
    name: 'Sport Pro',
    price: 6499,
    mrp: 7200,
    description: 'Rugged yet refined, perfect for active lifestyles.',
    features: ['100m water resistant', 'Shock resistant', 'Luminous hands', 'Durable'],
    category: 'watches',
    image: 'watch-sport',
  },
  {
    id: 's1',
    name: 'Oxford Premium',
    price: 5999,
    mrp: 6599,
    description: 'Handcrafted Italian leather oxfords for the modern gentleman.',
    features: ['Italian leather', 'Handcrafted', 'Cushioned insole', 'Formal wear'],
    category: 'shoes',
    image: 'shoes-oxford',
  },
  {
    id: 's2',
    name: 'Sneaker Luxe',
    price: 4499,
    mrp: 6999,
    description: 'Premium sneakers combining comfort with sophisticated style.',
    features: ['Premium materials', 'Ultra comfortable', 'Versatile style', 'Durable sole'],
    category: 'shoes',
    image: 'shoes-sneaker',
  },
  {
    id: 's3',
    name: 'Loafer Elite',
    price: 5499,
    mrp: 6999,
    description: 'Slip-on luxury with superior comfort and timeless appeal.',
    features: ['Suede finish', 'Memory foam', 'Versatile', 'Premium quality'],
    category: 'shoes',
    image: 'shoes-loafer',
  },
  {
    id: 'g1',
    name: 'Wireless Elite Earbuds',
    price: 3999,
    mrp: 4899,
    description: 'Premium sound quality with active noise cancellation.',
    features: ['ANC technology', '24hr battery', 'Premium sound', 'Wireless charging'],
    category: 'gadgets',
    image: 'gadget-earbuds',
  },
  {
    id: 'g2',
    name: 'Smart Tracker Pro',
    price: 7999,
    mrp: 10199,
    description: 'Advanced fitness tracking with health monitoring features.',
    features: ['Heart rate monitor', 'GPS tracking', '7-day battery', 'Water resistant'],
    category: 'gadgets',
    image: 'gadget-tracker',
  },
  {
    id: 'g3',
    name: 'Power Bank Ultra',
    price: 2999,
    mrp: 4999,
    description: 'High-capacity portable charger with fast charging technology.',
    features: ['20000mAh capacity', 'Fast charging', 'Multiple ports', 'Compact design'],
    category: 'gadgets',
    image: 'gadget-powerbank',
  },
  {
    id: 'l1',
    name: 'Premium Leather Wallet',
    price: 1999,
    mrp: 4999,
    description: 'Handcrafted genuine leather wallet with RFID protection.',
    features: ['RFID blocking', 'Genuine leather', 'Multiple slots', 'Slim design'],
    category: 'lifestyle',
    image: 'lifestyle-wallet',
  },
  {
    id: 'l2',
    name: 'Luxury Travel Bag',
    price: 6999,
    mrp: 8999,
    description: 'Spacious and stylish duffle bag for weekend getaways.',
    features: ['Water resistant', 'Multiple pockets', 'Durable', 'Stylish design'],
    category: 'lifestyle',
    image: 'lifestyle-bag',
  },
  {
    id: 'l3',
    name: 'Desk Organizer Set',
    price: 2499,
    mrp: 3999,
    description: 'Premium wooden desk organizer with elegant finish.',
    features: ['Natural wood', 'Multiple compartments', 'Elegant design', 'Durable'],
    category: 'lifestyle',
    image: 'lifestyle-organizer',
  },
];

// Products array - loads from JSON, falls back to static data
// To use JSON: update /data/products.json and set USE_JSON = true
const USE_JSON = true;

// Google Apps Script URL for products (from automation setup)
const GOOGLE_SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbwUXvHJ0YVYQNvVpTO2McmybsgdxLae2iaOfAV3SBcUcx9noWgXOWdSIwqgWEMw_cJc/exec";

let productsCache: Product[] | null = null;

// Synchronous access (uses cached data or default)
export const products: Product[] = USE_JSON && productsCache 
  ? productsCache 
  : defaultProducts;

// Async function to fetch from Google Sheets (call this to refresh products)
export async function loadProductsFromJSON(): Promise<Product[]> {
  try {
    // First try Google Sheets API (live data)
    let data: any;
    
    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'GET',
        mode: 'no-cors'
      });
      // With no-cors, we get an opaque response, so we can't read the body
      // Fall back to local JSON
      throw new Error('Using fallback');
    } catch {
      // Fall back to local JSON file
      const jsonResponse = await fetch('/data/products.json');
      if (!jsonResponse.ok) throw new Error('Failed to fetch');
      data = await jsonResponse.json();
    }

    // Transform JSON format to our format
    const transformed: Product[] = (data.products || data)
      .filter((p: any) => p.active !== false)
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.selling_price || p.price,
        mrp: p.mrp,
        image: p.image_url ? p.image_url.replace('/images/', '').replace('.png', '') : p.id,
        image_url: p.image_url,
        description: defaultProducts.find(d => d.id === p.id)?.description || '',
        features: defaultProducts.find(d => d.id === p.id)?.features || [],
      }));

    productsCache = transformed;
    return transformed;
  } catch (error) {
    console.warn('Failed to load products, using defaults:', error);
    return defaultProducts;
  }
}


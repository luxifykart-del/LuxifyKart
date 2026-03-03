# LuxifyKart - Premium Ecommerce Website

A fully functional, luxurious ecommerce website built with React, TypeScript, Tailwind CSS, and Motion animations.

## Features

### Pages
- **Homepage**: Hero section, category cards, featured products, trust badges
- **Category Pages**: Filtered products by category with elegant layouts
- **Cart Page**: Full cart management with quantity controls
- **Checkout Page**: Payment options (COD & UPI) with order form integration

### Functionality
- ✅ Fully functional shopping cart with localStorage persistence
- ✅ Add/remove products with smooth animations
- ✅ Quantity management in cart
- ✅ Responsive design for all screen sizes
- ✅ Smooth page transitions and micro-interactions
- ✅ Premium, luxurious design aesthetic

### Categories
1. Perfumes
2. Watches
3. Shoes
4. Gadgets
5. Lifestyle & Daily Use

## Google Form Setup

To complete the order collection system, create a Google Form with the following fields:

### Required Form Fields:

1. **Customer Name** (Short answer)
2. **Phone Number** (Short answer)
3. **Delivery Address** (Long answer/Paragraph)
4. **Product Name** (Short answer)
5. **Quantity** (Number)
6. **Payment Method** (Multiple choice: Cash on Delivery / UPI Payment)
7. **UPI Transaction ID** (Short answer - optional if COD selected)
8. **Payment Screenshot** (File upload - optional)

### How to Setup:

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form titled "LuxifyKart Order Form"
3. Add all the fields mentioned above
4. Make appropriate fields required (Name, Phone, Address, Product, Quantity, Payment Method)
5. For Payment Method, use Multiple Choice with options:
   - Cash on Delivery (COD)
   - UPI / Online Payment
6. Configure form settings:
   - Enable "Collect email addresses" if needed
   - Choose "Limit to 1 response" to prevent duplicates (optional)
7. Click "Send" and copy the form URL
8. Replace the placeholder URL in `/src/app/pages/CheckoutPage.tsx`:
   ```typescript
   const googleFormUrl = 'YOUR_GOOGLE_FORM_URL_HERE';
   ```

### Form Responses

- Responses will be automatically collected in a Google Sheet
- You can set up email notifications for new responses
- Export data to CSV for order processing

## Payment Integration

Currently configured for:
- **Cash on Delivery (COD)**: Default option
- **UPI Payment**: Manual verification system
  - UPI ID: `yourupi@bank` (replace with your actual UPI ID)
  - Customers provide transaction ID in the form
  - Manual verification before dispatch

## Customization

### Update UPI Details
Edit `/src/app/pages/CheckoutPage.tsx` and update:
```typescript
Pay ₹{cartTotal.toLocaleString()} to UPI ID: <span className="font-mono font-semibold">yourupi@bank</span>
```

### Add More Products
Edit `/src/app/data/products.ts` to add new products following the existing structure.

### Change Color Scheme
Edit `/src/styles/theme.css` to modify the color palette.

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons
- **LocalStorage** - Cart persistence

## Project Structure

```
src/app/
├── components/          # Reusable components
│   ├── Layout.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── CategoryPage.tsx
│   ├── CartPage.tsx
│   └── CheckoutPage.tsx
├── context/            # React context
│   └── CartContext.tsx
├── data/               # Product data
│   ├── products.ts
│   └── images.ts
├── routes.tsx          # Route configuration
└── App.tsx            # Main app component
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All product images are from Unsplash (replace with actual product images)
- Cart data persists in browser localStorage
- Google Form integration for order collection
- Manual order verification system
- COD and UPI payment options supported

---

Built with ❤️ for premium ecommerce experiences

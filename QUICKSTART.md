# 🚀 Quick Start Guide - LuxifyKart

## Immediate Next Steps

### 1. Test the Website
The website is fully functional right now! Navigate through:
- Homepage → Browse categories
- Click any category → View products
- Add products to cart → See notifications
- Go to cart → Adjust quantities
- Proceed to checkout → Select payment method

### 2. Create Google Form (5 minutes)

**Go to**: https://forms.google.com

**Create a form with these fields**:

```
Title: LuxifyKart Order Form

Fields:
1. Name* (Short answer)
2. Phone Number* (Short answer)
3. Email Address (Short answer)
4. Delivery Address* (Paragraph)
5. Product Details* (Paragraph)
6. Total Amount* (Short answer)
7. Payment Method* (Multiple choice)
   - Cash on Delivery (COD)
   - UPI / Online Payment
8. UPI Transaction ID (Short answer)
9. Payment Screenshot (File upload)

* = Required field
```

**Get the form URL**:
- Click "Send" button
- Click the link icon
- Copy the URL

### 3. Update Your Details (2 minutes)

**File**: `/src/app/pages/CheckoutPage.tsx`

**Line 14** - Replace with your Google Form URL:
```typescript
const googleFormUrl = 'YOUR_ACTUAL_GOOGLE_FORM_URL_HERE';
```

**Line 175** - Replace with your UPI ID:
```typescript
<span className="font-mono font-semibold">yourupi@bank</span>
// Change to:
<span className="font-mono font-semibold">yourname@okaxis</span>
```

### 4. Customize Products (Optional)

**File**: `/src/app/data/products.ts`

Add more products or modify existing ones:
```typescript
{
  id: 'new1',
  name: 'Your Product Name',
  price: 4999,
  description: 'Product description',
  features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  category: 'perfumes', // or watches, shoes, gadgets, lifestyle
  image: 'product-image-key',
}
```

Then add the image URL in `/src/app/data/images.ts`:
```typescript
'product-image-key': 'https://your-image-url.com/image.jpg',
```

### 5. Test Order Flow

1. Add products to cart
2. Go to checkout
3. Select payment method
4. Click "Place Order"
5. Google Form opens in new tab
6. Fill the form with test data
7. Submit form
8. Check your Google Sheets for the response

## 🎨 Customization Options

### Change Brand Colors
**File**: `/src/styles/theme.css`

Update these values:
```css
--primary: #030213; /* Main brand color */
--accent: #e9ebef; /* Accent color */
```

### Add More Categories
**File**: `/src/app/data/products.ts`

Add to categories array:
```typescript
{ id: 'jewelry', name: 'Jewelry', icon: '💎' }
```

### Update Contact Info
**File**: `/src/app/components/Footer.tsx`

Lines 84-94: Update email, phone, and address

### Add Social Media Links
**File**: `/src/app/components/Footer.tsx`

Lines 25-35: Update href attributes with your social media URLs

## 📱 Mobile Testing

Test on these breakpoints:
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🔍 SEO Optimization (Future)

Add to `/index.html`:
```html
<title>LuxifyKart - Premium Products at Honest Prices</title>
<meta name="description" content="Shop premium perfumes, watches, shoes, gadgets, and lifestyle products. Cash on Delivery available across India.">
```

## 📊 Tracking Orders

Your Google Form responses will be in a Google Sheet:
- Forms → Responses → View in Sheets
- You'll see all order details
- Export to CSV for processing
- Set up email notifications for new orders

## 🎯 Marketing Tips

1. **WhatsApp Integration**: Add WhatsApp button to footer
2. **Instagram**: Link product images to Instagram posts
3. **Discount Codes**: Add promo code field in checkout
4. **Reviews**: Add customer reviews section
5. **Testimonials**: Add to homepage

## 🐛 Troubleshooting

**Cart not saving?**
- Check browser localStorage is enabled
- Clear cache and try again

**Images not loading?**
- Check internet connection
- Unsplash URLs should work globally

**Google Form not opening?**
- Verify the URL is correct
- Make form public (Anyone with link can respond)

## 📞 Support

Common issues and solutions:

**Q: Can I use real payment gateway?**
A: Yes! Integrate Razorpay or Stripe for automated payments

**Q: How to add more products?**
A: Edit `/src/app/data/products.ts` and add image URLs

**Q: Can I change the design?**
A: Yes! All Tailwind classes can be modified

**Q: How to add product search?**
A: The structure supports it - add a search component in Navigation

## ✅ Pre-Launch Checklist

- [ ] Google Form created and URL updated
- [ ] UPI ID updated in checkout page
- [ ] Contact details updated in footer
- [ ] Social media links added
- [ ] Test order placed successfully
- [ ] Mobile view tested
- [ ] All products have correct prices
- [ ] Shipping policy added
- [ ] Return policy added
- [ ] Terms & conditions added

## 🚀 Launch!

Once checklist is complete, your store is ready!

**Share your link**:
- WhatsApp Status
- Instagram Bio
- Facebook Page
- Google My Business

---

Need help? Refer to:
- `/LUXIFYKART_SETUP.md` - Detailed setup
- `/FEATURES.md` - Complete feature list

**Happy Selling! 🎉**

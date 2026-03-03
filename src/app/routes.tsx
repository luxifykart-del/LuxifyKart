import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { ShippingPage } from "./pages/ShippingPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { Layout } from "./components/Layout";
import { ProductPage } from "./pages/ProductPage";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "categories", Component: CategoriesPage },
      { path: "category/:categoryId", Component: CategoryPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "terms", Component: TermsPage },
      { path: "shipping", Component: ShippingPage },
      { path: "returns", Component: ReturnsPage },
      { path: "product/:productId", Component: ProductPage }
    ],
  },
]);

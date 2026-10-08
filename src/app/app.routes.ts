import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'products', component: Products, title: 'Shop' },
  { path: 'products/:id', component: ProductDetail, title: 'Product' },
  { path: 'cart', component: Cart, title: 'Cart' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: '**', redirectTo: '' }
];
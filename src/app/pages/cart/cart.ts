import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  qty: number;
  img: string;
}

@Component({
  selector: 'app-cart',
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  promoCode = '';
  promoMsg = '';
  discount = 0;

  items: CartItem[] = [
    { id: 1, name: 'Classic Leather Watch', category: 'Watches', price: 4500, qty: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80' },
    { id: 2, name: 'Running Sneakers', category: 'Shoes', price: 3200, qty: 2, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
    { id: 3, name: 'Minimalist Tote Bag', category: 'Bags', price: 2800, qty: 1, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80' },
  ];

  subtotal() { return this.items.reduce((sum, i) => sum + i.price * i.qty, 0); }
  shipping() { return this.subtotal() >= 2000 ? 0 : 200; }
  total() { return this.subtotal() + this.shipping() - this.discount; }

  increase(item: CartItem) { item.qty++; }
  decrease(item: CartItem) { if (item.qty > 1) item.qty--; else this.remove(item); }
  remove(item: CartItem) { this.items = this.items.filter(i => i.id !== item.id); }
  clearCart() { this.items = []; }

  applyPromo() {
    if (this.promoCode.toLowerCase() === 'save10') {
      this.discount = Math.round(this.subtotal() * 0.1);
      this.promoMsg = '10% discount applied!';
    } else {
      this.discount = 0;
      this.promoMsg = 'Invalid promo code.';
    }
  }
}
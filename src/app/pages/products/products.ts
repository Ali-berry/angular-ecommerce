import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  img: string;
  isNew: boolean;
}

@Component({
  selector: 'app-products',
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  sidebarOpen = false;
  searchQuery = signal('');
  selectedCategory = signal('All');
  maxPrice = signal(10000);
  minRating = signal(0);
  sortBy = signal('newest');

  categories = ['All', 'Watches', 'Shoes', 'Bags', 'Accessories'];

  allProducts: Product[] = [
    { id: 1, name: 'Classic Leather Watch', category: 'Watches', price: 4500, rating: 4.8, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', isNew: true },
    { id: 2, name: 'Running Sneakers', category: 'Shoes', price: 3200, rating: 4.5, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', isNew: false },
    { id: 3, name: 'Minimalist Tote Bag', category: 'Bags', price: 2800, rating: 4.3, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', isNew: true },
    { id: 4, name: 'Silver Chain Bracelet', category: 'Accessories', price: 1200, rating: 4.6, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80', isNew: false },
    { id: 5, name: 'Chronograph Watch', category: 'Watches', price: 7800, rating: 4.9, img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80', isNew: true },
    { id: 6, name: 'Canvas Backpack', category: 'Bags', price: 2200, rating: 4.2, img: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&q=80', isNew: false },
    { id: 7, name: 'Leather Oxford Shoes', category: 'Shoes', price: 5500, rating: 4.7, img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80', isNew: false },
    { id: 8, name: 'Polarized Sunglasses', category: 'Accessories', price: 1800, rating: 4.4, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80', isNew: true },
  ];

  filtered = computed(() => {
    let list = this.allProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchCat = this.selectedCategory() === 'All' || p.category === this.selectedCategory();
      const matchPrice = p.price <= this.maxPrice();
      const matchRating = p.rating >= this.minRating();
      return matchSearch && matchCat && matchPrice && matchRating;
    });

    if (this.sortBy() === 'low-high') list = [...list].sort((a, b) => a.price - b.price);
    else if (this.sortBy() === 'high-low') list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  });

  stars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating) ? 'full' : 'empty');
  }

  setCategory(cat: string) { this.selectedCategory.set(cat); }
  onSearch(e: Event) { this.searchQuery.set((e.target as HTMLInputElement).value); }
  onPrice(e: Event) { this.maxPrice.set(+(e.target as HTMLInputElement).value); }
  onRating(val: number) { this.minRating.set(val); }
  onSort(e: Event) { this.sortBy.set((e.target as HTMLSelectElement).value); }
}
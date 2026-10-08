import { Component, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  link: string;
}

interface Product {
  name: string;
  category: string;
  price: number;
  image: string;
}

interface Category {
  name: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnDestroy {
  currentSlide = 0;

  private sliderTimer?: ReturnType<typeof setInterval>;

  slides: Slide[] = [
    {
      image:
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1800&q=80',
      eyebrow: 'NEW SEASON',
      title: 'Defined by your style.',
      description:
        'Discover refined essentials and statement pieces made for the way you move.',
      cta: 'Shop Women',
      link: '/shop/women'
    },
    {
      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1800&q=80',
      eyebrow: 'THE NEW EDIT',
      title: 'Less noise. More style.',
      description:
        'A considered collection of modern silhouettes, elevated textures and everyday essentials.',
      cta: 'Explore Collection',
      link: '/shop'
    },
    {
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80',
      eyebrow: 'SPRING / SUMMER',
      title: 'Make an entrance.',
      description:
        'Fresh layers, clean lines and effortless pieces designed to stand apart.',
      cta: 'Shop New Arrivals',
      link: '/shop/new-arrivals'
    }
  ];

  products: Product[] = [
    {
      name: 'Relaxed Linen Shirt',
      category: 'Men · Shirts',
      price: 3490,
      image:
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80'
    },
    {
      name: 'Structured Shoulder Bag',
      category: 'Women · Bags',
      price: 5290,
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80'
    },
    {
      name: 'Minimal Tailored Blazer',
      category: 'Women · Blazers',
      price: 7990,
      image:
        'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=900&q=80'
    },
    {
      name: 'Classic Leather Sneakers',
      category: 'Unisex · Footwear',
      price: 6490,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80'
    },
    {
      name: 'Premium Knit Polo',
      category: 'Men · Knitwear',
      price: 4290,
      image:
        'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=900&q=80'
    },
    {
      name: 'Oversized Everyday Coat',
      category: 'Women · Outerwear',
      price: 8990,
      image:
        'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=900&q=80'
    }
  ];

  categories: Category[] = [
    {
      name: 'Women',
      link: '/shop/women',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80'
    },
    {
      name: 'Men',
      link: '/shop/men',
      image:
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80'
    },
    {
      name: 'Accessories',
      link: '/shop/accessories',
      image:
        'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&q=80'
    },
    {
      name: 'Footwear',
      link: '/shop/footwear',
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80'
    }
  ];

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  startSlider(): void {
    this.stopSlider();

    this.sliderTimer = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopSlider(): void {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = undefined;
    }
  }

  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) %
      this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.startSlider();
  }

  trackByName(_: number, item: Product | Category): string {
    return item.name;
  }
}
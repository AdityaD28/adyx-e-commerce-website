// Centralized product database for the entire application
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  subcategory?: string
  rating: number
  reviewCount: number
  sizes?: string[]
  colors: string[]
  stock: number
  description?: string
  features?: string[]
  details?: {
    material?: string
    care?: string
    origin?: string
    fit?: string
    dimensions?: string
    protection?: string
  }
}

export const allProducts: Product[] = [
  // Homepage featured products (1-4)
  {
    id: '1',
    name: 'Elegant Black Midi Dress',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566479179817-c7de3e8cf1f8?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Dresses',
    rating: 4.5,
    reviewCount: 124,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray'],
    stock: 50,
    description: 'A sophisticated midi dress perfect for both professional and evening occasions. Made from high-quality fabric with a flattering silhouette that complements all body types.',
    features: [
      'Premium fabric blend',
      'Professional dry clean recommended',
      'Midi length design',
      'Classic fit',
      'Available in multiple colors'
    ],
    details: {
      material: '70% Polyester, 30% Viscose',
      care: 'Dry clean only',
      origin: 'Made in Italy',
      fit: 'Regular fit'
    }
  },
  {
    id: '2',
    name: 'Classic White Button Shirt',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80'
    ],
    category: 'men',
    subcategory: 'Shirts',
    rating: 4.8,
    reviewCount: 89,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink'],
    stock: 25,
    description: 'A timeless button-down shirt crafted from premium cotton. Perfect for business meetings, casual outings, or formal events.',
    features: [
      '100% Premium cotton',
      'Wrinkle-resistant finish',
      'Classic collar design',
      'Regular fit',
      'Machine washable'
    ],
    details: {
      material: '100% Cotton',
      care: 'Machine wash cold',
      origin: 'Made in Portugal',
      fit: 'Regular fit'
    }
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=800&fit=crop&q=80'
    ],
    category: 'accessories',
    subcategory: 'Bags',
    rating: 4.6,
    reviewCount: 156,
    colors: ['Brown', 'Black', 'Tan'],
    stock: 75,
    description: 'A sophisticated leather crossbody bag that combines style with functionality. Perfect for everyday use with multiple compartments for organization.',
    features: [
      'Genuine leather construction',
      'Multiple compartments',
      'Adjustable strap',
      'Metal hardware accents',
      'Interior organizer pockets'
    ],
    details: {
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      origin: 'Made in Spain',
      dimensions: '10" x 8" x 3"'
    }
  },
  {
    id: '4',
    name: 'Classic Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop&q=80'
    ],
    category: 'accessories',
    subcategory: 'Sunglasses',
    rating: 4.9,
    reviewCount: 203,
    colors: ['Black', 'Tortoise', 'Gold'],
    stock: 15,
    description: 'Timeless sunglasses that offer both style and protection. UV400 protection with premium lens quality.',
    features: [
      'UV400 protection',
      'Polarized lenses',
      'Durable frame construction',
      'Classic design',
      'Includes protective case'
    ],
    details: {
      material: 'Acetate frame, Glass lenses',
      care: 'Clean with microfiber cloth',
      origin: 'Made in Italy',
      protection: 'UV400'
    }
  },

  // Women's Products (11-20)
  {
    id: '11',
    name: 'Floral Maxi Dress',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583135866675-f94e99542cf5?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Dresses',
    rating: 4.2,
    reviewCount: 45,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'Navy'],
    stock: 25,
    description: 'A beautiful flowing maxi dress perfect for summer occasions. Features a flattering floral print and comfortable fit.',
    features: [
      'Flowy maxi length',
      'Comfortable fabric',
      'Flattering fit',
      'Perfect for summer'
    ],
    details: {
      material: '100% Rayon',
      care: 'Machine wash cold',
      origin: 'Made in India',
      fit: 'Relaxed fit'
    }
  },
  {
    id: '12',
    name: 'Silk Blouse',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Tops',
    rating: 4.5,
    reviewCount: 67,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream', 'Pink'],
    stock: 40,
    description: 'Luxurious silk blouse perfect for professional or casual wear. Soft texture with elegant drape.',
    features: [
      'Pure silk fabric',
      'Professional style',
      'Elegant drape',
      'Versatile design'
    ],
    details: {
      material: '100% Silk',
      care: 'Dry clean recommended',
      origin: 'Made in China',
      fit: 'Regular fit'
    }
  },
  {
    id: '13',
    name: 'High-Waist Skinny Jeans',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Bottoms',
    rating: 4.3,
    reviewCount: 89,
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    stock: 60,
    description: 'Flattering high-waist skinny jeans that hug your curves perfectly. Made with premium denim and stretch for comfort.',
    features: [
      'High-waist design',
      'Stretch denim',
      'Flattering fit',
      'Premium quality'
    ],
    details: {
      material: '98% Cotton, 2% Elastane',
      care: 'Machine wash cold',
      origin: 'Made in Turkey',
      fit: 'Skinny fit'
    }
  },
  {
    id: '14',
    name: 'Wool Trench Coat',
    price: 189.99,
    originalPrice: 239.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544966503-7adce5a56def?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Outerwear',
    rating: 4.7,
    reviewCount: 34,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Navy', 'Black'],
    stock: 20,
    description: 'Classic wool trench coat perfect for transitional weather. Features traditional styling with modern updates.',
    features: [
      'Wool blend fabric',
      'Classic trench design',
      'Belt included',
      'Professional style'
    ],
    details: {
      material: '80% Wool, 20% Polyester',
      care: 'Dry clean only',
      origin: 'Made in England',
      fit: 'Regular fit'
    }
  },
  {
    id: '15',
    name: 'Cashmere Sweater',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Sweaters',
    rating: 4.8,
    reviewCount: 92,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Gray', 'Pink', 'Beige'],
    stock: 35,
    description: 'Luxuriously soft cashmere sweater perfect for layering or wearing alone. Classic crew neck design.',
    features: [
      'Pure cashmere',
      'Crew neck design',
      'Soft texture',
      'Perfect for layering'
    ],
    details: {
      material: '100% Cashmere',
      care: 'Hand wash or dry clean',
      origin: 'Made in Scotland',
      fit: 'Regular fit'
    }
  },
  {
    id: '16',
    name: 'Pleated Midi Skirt',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1583743123635-56d39c4a5b83?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583743123635-56d39c4a5b83?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519235106638-30cc49b5dbc5?w=600&h=800&fit=crop&q=80'
    ],
    category: 'women',
    subcategory: 'Skirts',
    rating: 4.4,
    reviewCount: 78,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    stock: 45,
    description: 'Elegant pleated midi skirt perfect for office or evening wear. Features a flattering A-line silhouette.',
    features: [
      'Pleated design',
      'Midi length',
      'A-line silhouette',
      'Versatile styling'
    ],
    details: {
      material: '65% Polyester, 35% Viscose',
      care: 'Machine wash cold',
      origin: 'Made in Vietnam',
      fit: 'Regular fit'
    }
  },

  // Men's Products (21-30)
  {
    id: '21',
    name: 'Slim Fit Chinos',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&q=80'
    ],
    category: 'men',
    subcategory: 'Pants',
    rating: 4.3,
    reviewCount: 156,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Gray'],
    stock: 80,
    description: 'Versatile slim fit chinos perfect for both casual and smart-casual occasions. Made from premium cotton twill.',
    features: [
      'Slim fit design',
      'Premium cotton twill',
      'Versatile styling',
      'Comfortable wear'
    ],
    details: {
      material: '100% Cotton',
      care: 'Machine wash cold',
      origin: 'Made in Bangladesh',
      fit: 'Slim fit'
    }
  },
  {
    id: '22',
    name: 'Wool Blazer',
    price: 199.99,
    originalPrice: 259.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop&q=80'
    ],
    category: 'men',
    subcategory: 'Blazers',
    rating: 4.6,
    reviewCount: 89,
    sizes: ['38', '40', '42', '44', '46'],
    colors: ['Navy', 'Charcoal', 'Brown'],
    stock: 25,
    description: 'Sophisticated wool blazer perfect for business or formal occasions. Features classic tailoring with modern updates.',
    features: [
      'Wool blend fabric',
      'Classic tailoring',
      'Two-button closure',
      'Professional style'
    ],
    details: {
      material: '85% Wool, 15% Polyester',
      care: 'Dry clean only',
      origin: 'Made in Italy',
      fit: 'Tailored fit'
    }
  },
  {
    id: '23',
    name: 'Cotton Polo Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop&q=80'
    ],
    category: 'men',
    subcategory: 'Polo',
    rating: 4.4,
    reviewCount: 203,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Navy', 'Green', 'Red'],
    stock: 90,
    description: 'Classic cotton polo shirt perfect for casual wear. Features a comfortable fit and timeless design.',
    features: [
      'Pure cotton fabric',
      'Classic polo design',
      'Comfortable fit',
      'Breathable material'
    ],
    details: {
      material: '100% Cotton',
      care: 'Machine wash cold',
      origin: 'Made in Pakistan',
      fit: 'Regular fit'
    }
  },

  // Accessories (31-35)
  {
    id: '31',
    name: 'Leather Belt',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611311043256-f9c3d6d5c0c1?w=600&h=800&fit=crop&q=80'
    ],
    category: 'accessories',
    subcategory: 'Belts',
    rating: 4.5,
    reviewCount: 124,
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Black', 'Brown'],
    stock: 50,
    description: 'Premium leather belt with classic buckle. Perfect for both casual and formal wear.',
    features: [
      'Genuine leather',
      'Classic buckle',
      'Durable construction',
      'Versatile styling'
    ],
    details: {
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      origin: 'Made in Italy',
      dimensions: '1.5" width'
    }
  },
  {
    id: '32',
    name: 'Silk Scarf',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605648916319-7832742c8c6f?w=600&h=800&fit=crop&q=80'
    ],
    category: 'accessories',
    subcategory: 'Scarves',
    rating: 4.7,
    reviewCount: 67,
    colors: ['Floral', 'Geometric', 'Solid'],
    stock: 30,
    description: 'Luxurious silk scarf with beautiful prints. Perfect accessory for any outfit.',
    features: [
      'Pure silk fabric',
      'Beautiful prints',
      'Versatile styling',
      'Luxurious feel'
    ],
    details: {
      material: '100% Silk',
      care: 'Dry clean only',
      origin: 'Made in France',
      dimensions: '35" x 35"'
    }
  },

  // Shoes (41-46)
  {
    id: '41',
    name: 'Running Sneakers',
    price: 149.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80'
    ],
    category: 'shoes',
    subcategory: 'Sneakers',
    rating: 4.5,
    reviewCount: 234,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Gray'],
    stock: 50,
    description: 'High-performance running sneakers with advanced cushioning technology. Perfect for running and everyday wear.',
    features: [
      'Advanced cushioning',
      'Breathable mesh upper',
      'Durable outsole',
      'Comfortable fit'
    ],
    details: {
      material: 'Mesh and synthetic materials',
      care: 'Machine washable',
      origin: 'Made in Vietnam',
      fit: 'True to size'
    }
  },
  {
    id: '42',
    name: 'Leather Dress Shoes',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop&q=80'
    ],
    category: 'shoes',
    subcategory: 'Dress',
    rating: 4.7,
    reviewCount: 89,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown'],
    stock: 35,
    description: 'Classic leather dress shoes perfect for formal occasions. Features premium leather construction and comfortable fit.',
    features: [
      'Premium leather construction',
      'Classic design',
      'Comfortable fit',
      'Formal styling'
    ],
    details: {
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      origin: 'Made in Spain',
      fit: 'True to size'
    }
  },
  {
    id: '43',
    name: 'Casual Loafers',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571047222537-9f91b0b8b5b3?w=600&h=800&fit=crop&q=80'
    ],
    category: 'shoes',
    subcategory: 'Casual',
    rating: 4.3,
    reviewCount: 156,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Navy', 'Black'],
    stock: 45,
    description: 'Comfortable casual loafers perfect for everyday wear. Features soft leather and cushioned sole.',
    features: [
      'Soft leather upper',
      'Cushioned sole',
      'Slip-on design',
      'Casual styling'
    ],
    details: {
      material: 'Leather and textile',
      care: 'Clean with damp cloth',
      origin: 'Made in Portugal',
      fit: 'True to size'
    }
  }
]

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category)
}

export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return allProducts.filter(product => 
    product.category === category && product.subcategory === subcategory
  )
}

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => ['1', '2', '3', '4'].includes(product.id))
}

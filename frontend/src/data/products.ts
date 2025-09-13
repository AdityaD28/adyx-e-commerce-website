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
    image: '/images/products/1/Elegant Black Midi Dress.jpg',
    images: [
      '/images/products/1/Elegant Black Midi Dress.jpg',
      '/images/products/1/Elegant Black Midi Dress2.jpg',
      '/images/products/1/Elegant Black Midi Dress3.jpg'
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
    image: '/images/products/2/Classic White Button Shirt .jpg',
    images: [
      '/images/products/2/Classic White Button Shirt .jpg',
      '/images/products/2/Classic White Button Shirt 2.jpg',
      '/images/products/2/Classic White Button Shirt 3.jpg'
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
    image: '/images/products/3/Leather Crossbody Bag .jpg',
    images: [
      '/images/products/3/Leather Crossbody Bag .jpg',
      '/images/products/3/Leather Crossbody Bag 2.jpg',
      '/images/products/3/Leather Crossbody Bag 3.jpg'
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
    image: '/images/products/4/Classic Sunglasses .jpg',
    images: [
      '/images/products/4/Classic Sunglasses .jpg',
      '/images/products/4/Classic Sunglasses 2.jpg',
      '/images/products/4/Classic Sunglasses 3.jpg'
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
    image: '/images/products/11/Floral Maxi Dress .jpg',
    images: [
      '/images/products/11/Floral Maxi Dress .jpg',
      '/images/products/11/Floral Maxi Dress 2.jpg',
      '/images/products/11/Floral Maxi Dress 3.jpg'
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
    image: '/images/products/12/Silk Blouse .jpg',
    images: [
      '/images/products/12/Silk Blouse .jpg',
      '/images/products/12/Silk Blouse 2.jpg',
      '/images/products/12/Silk Blouse 3.jpg'
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
    image: '/images/products/13/High-Waist Skinny Jeans .jpg',
    images: [
      '/images/products/13/High-Waist Skinny Jeans .jpg',
      '/images/products/13/High-Waist Skinny Jeans 2.jpg',
      '/images/products/13/High-Waist Skinny Jeans 3.jpg'
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
    image: '/images/products/14/Wool Trench Coat .jpg',
    images: [
      '/images/products/14/Wool Trench Coat .jpg',
      '/images/products/14/Wool Trench Coat 2.jpg',
      '/images/products/14/Wool Trench Coat 3.jpg'
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
    image: '/images/products/15/Cashmere Sweater .jpg',
    images: [
      '/images/products/15/Cashmere Sweater .jpg',
      '/images/products/15/Cashmere Sweater 2.jpg',
      '/images/products/15/Cashmere Sweater 3.jpg'
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
    image: '/images/products/16/Pleated Midi Skirt .jpg',
    images: [
      '/images/products/16/Pleated Midi Skirt .jpg',
      '/images/products/16/Pleated Midi Skirt 2.jpg',
      '/images/products/16/Pleated Midi Skirt 3.jpg'
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
    image: '/images/products/21/Slim Fit Chinos .jpg',
    images: [
      '/images/products/21/Slim Fit Chinos .jpg',
      '/images/products/21/Slim Fit Chinos 2.jpg',
      '/images/products/21/Slim Fit Chinos 3.jpg'
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
    image: '/images/products/22/Wool Blazer .jpg',
    images: [
      '/images/products/22/Wool Blazer .jpg',
      '/images/products/22/Wool Blazer 2.jpg',
      '/images/products/22/Wool Blazer 3.jpg'
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
    image: '/images/products/23/Cotton Polo Shirt .jpg',
    images: [
      '/images/products/23/Cotton Polo Shirt .jpg',
      '/images/products/23/Cotton Polo Shirt 2.jpg',
      '/images/products/23/Cotton Polo Shirt 3.jpg'
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
    image: '/images/products/31/Leather Belt .jpg',
    images: [
      '/images/products/31/Leather Belt .jpg',
      '/images/products/31/Leather Belt 2.jpg',
      '/images/products/31/Leather Belt 3.jpg'
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
    image: '/images/products/32/Silk Scarf .jpg',
    images: [
      '/images/products/32/Silk Scarf .jpg',
      '/images/products/32/Silk Scarf 2.jpg',
      '/images/products/32/Silk Scarf 3.jpg'
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
    image: '/images/products/41/Running Sneakers .jpg',
    images: [
      '/images/products/41/Running Sneakers .jpg',
      '/images/products/41/Running Sneakers 2.jpg',
      '/images/products/41/Running Sneakers 3.jpg'
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
    image: '/images/products/42/Leather Dress Shoes .jpg',
    images: [
      '/images/products/42/Leather Dress Shoes .jpg',
      '/images/products/42/Leather Dress Shoes 2.jpg',
      '/images/products/42/Leather Dress Shoes 3.jpg'
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
    image: '/images/products/43/Casual Loafers .jpg',
    images: [
      '/images/products/43/Casual Loafers .jpg',
      '/images/products/43/Casual Loafers 2.jpg',
      '/images/products/43/Casual Loafers 3.jpg'
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

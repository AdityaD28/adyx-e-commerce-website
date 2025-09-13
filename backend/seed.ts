import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@adyx.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create categories
  const categories = [
    {
      name: 'Women',
      slug: 'women',
      description: 'Women\'s fashion and accessories',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
    },
    {
      name: 'Men',
      slug: 'men',
      description: 'Men\'s fashion and accessories',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400',
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Fashion accessories for everyone',
      image: 'https://images.unsplash.com/photo-1506629905607-ce19687bc375?w=400',
    },
    {
      name: 'Shoes',
      slug: 'shoes',
      description: 'Footwear for all occasions',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(createdCategory);
  }

  console.log('✅ Categories created:', createdCategories.length);

  // Create subcategories for Women
  const womenCategory = createdCategories.find(c => c.slug === 'women');
  if (womenCategory) {
    const womenSubcategories = [
      {
        name: 'Dresses',
        slug: 'women-dresses',
        description: 'Elegant dresses for every occasion',
        parentId: womenCategory.id,
      },
      {
        name: 'Tops',
        slug: 'women-tops',
        description: 'Stylish tops and blouses',
        parentId: womenCategory.id,
      },
      {
        name: 'Bottoms',
        slug: 'women-bottoms',
        description: 'Pants, skirts, and shorts',
        parentId: womenCategory.id,
      },
    ];

    for (const subcategory of womenSubcategories) {
      await prisma.category.upsert({
        where: { slug: subcategory.slug },
        update: {},
        create: subcategory,
      });
    }
  }

  // Create subcategories for Men
  const menCategory = createdCategories.find(c => c.slug === 'men');
  if (menCategory) {
    const menSubcategories = [
      {
        name: 'Shirts',
        slug: 'men-shirts',
        description: 'Casual and formal shirts',
        parentId: menCategory.id,
      },
      {
        name: 'Pants',
        slug: 'men-pants',
        description: 'Trousers, jeans, and casual pants',
        parentId: menCategory.id,
      },
      {
        name: 'Outerwear',
        slug: 'men-outerwear',
        description: 'Jackets, coats, and blazers',
        parentId: menCategory.id,
      },
    ];

    for (const subcategory of menSubcategories) {
      await prisma.category.upsert({
        where: { slug: subcategory.slug },
        update: {},
        create: subcategory,
      });
    }
  }

  // Sample products for Women's Dresses
  const dressCategory = await prisma.category.findUnique({
    where: { slug: 'women-dresses' }
  });

  if (dressCategory) {
    const dresses = [
      {
        name: 'Elegant Black Midi Dress',
        slug: 'elegant-black-midi-dress',
        description: 'A timeless black midi dress perfect for any occasion. Made from premium cotton blend with a flattering A-line silhouette.',
        price: 129.99,
        comparePrice: 149.99,
        sku: 'WD001',
        published: true,
        featured: true,
        categoryId: dressCategory.id,
        metaTitle: 'Elegant Black Midi Dress - AdyX',
        metaDescription: 'Shop our elegant black midi dress - perfect for work, dinner, or special occasions.',
      },
      {
        name: 'Floral Summer Dress',
        slug: 'floral-summer-dress',
        description: 'Light and airy summer dress with beautiful floral print. Perfect for warm weather and casual outings.',
        price: 89.99,
        comparePrice: 109.99,
        sku: 'WD002',
        published: true,
        featured: false,
        categoryId: dressCategory.id,
        metaTitle: 'Floral Summer Dress - AdyX',
        metaDescription: 'Beautiful floral summer dress for warm weather. Lightweight and comfortable.',
      },
    ];

    for (const dress of dresses) {
      const product = await prisma.product.upsert({
        where: { slug: dress.slug },
        update: {},
        create: dress,
      });

      // Add product images
      await prisma.productImage.createMany({
        data: [
          {
            productId: product.id,
            url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
            alt: `${product.name} - Front view`,
            position: 0,
          },
          {
            productId: product.id,
            url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600',
            alt: `${product.name} - Side view`,
            position: 1,
          },
        ],
        skipDuplicates: true,
      });

      // Add product variants (sizes)
      const sizes = ['XS', 'S', 'M', 'L', 'XL'];
      for (const size of sizes) {
        await prisma.productVariant.upsert({
          where: {
            productId_size_color: {
              productId: product.id,
              size: size,
              color: 'Black',
            },
          },
          update: {},
          create: {
            productId: product.id,
            size: size,
            color: 'Black',
            stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
            sku: `${dress.sku}-${size}-BLK`,
          },
        });
      }
    }
  }

  // Sample products for Men's Shirts
  const shirtCategory = await prisma.category.findUnique({
    where: { slug: 'men-shirts' }
  });

  if (shirtCategory) {
    const shirts = [
      {
        name: 'Classic White Button Shirt',
        slug: 'classic-white-button-shirt',
        description: 'Essential white button-down shirt made from premium cotton. Perfect for business and formal occasions.',
        price: 79.99,
        comparePrice: 99.99,
        sku: 'MS001',
        published: true,
        featured: true,
        categoryId: shirtCategory.id,
        metaTitle: 'Classic White Button Shirt - AdyX',
        metaDescription: 'Premium white button-down shirt for men. Essential wardrobe piece.',
      },
      {
        name: 'Casual Denim Shirt',
        slug: 'casual-denim-shirt',
        description: 'Relaxed fit denim shirt perfect for casual weekends. Soft-washed for comfort.',
        price: 69.99,
        sku: 'MS002',
        published: true,
        featured: false,
        categoryId: shirtCategory.id,
        metaTitle: 'Casual Denim Shirt - AdyX',
        metaDescription: 'Comfortable casual denim shirt for men. Perfect for weekend wear.',
      },
    ];

    for (const shirt of shirts) {
      const product = await prisma.product.upsert({
        where: { slug: shirt.slug },
        update: {},
        create: shirt,
      });

      // Add product images
      await prisma.productImage.createMany({
        data: [
          {
            productId: product.id,
            url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
            alt: `${product.name} - Front view`,
            position: 0,
          },
          {
            productId: product.id,
            url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
            alt: `${product.name} - Detail view`,
            position: 1,
          },
        ],
        skipDuplicates: true,
      });

      // Add product variants (sizes)
      const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
      const colors = ['White', 'Blue'];
      
      for (const size of sizes) {
        for (const color of colors) {
          await prisma.productVariant.upsert({
            where: {
              productId_size_color: {
                productId: product.id,
                size: size,
                color: color,
              },
            },
            update: {},
            create: {
              productId: product.id,
              size: size,
              color: color,
              stock: Math.floor(Math.random() * 30) + 5,
              sku: `${shirt.sku}-${size}-${color.substring(0, 3).toUpperCase()}`,
            },
          });
        }
      }
    }
  }

  // Create sample accessories
  const accessoryCategory = createdCategories.find(c => c.slug === 'accessories');
  if (accessoryCategory) {
    const accessories = [
      {
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        description: 'Premium leather crossbody bag with adjustable strap. Perfect for everyday use.',
        price: 159.99,
        comparePrice: 199.99,
        sku: 'AC001',
        published: true,
        featured: true,
        categoryId: accessoryCategory.id,
      },
      {
        name: 'Classic Sunglasses',
        slug: 'classic-sunglasses',
        description: 'Timeless aviator-style sunglasses with UV protection.',
        price: 89.99,
        sku: 'AC002',
        published: true,
        featured: false,
        categoryId: accessoryCategory.id,
      },
    ];

    for (const accessory of accessories) {
      const product = await prisma.product.upsert({
        where: { slug: accessory.slug },
        update: {},
        create: accessory,
      });

      // Add product images
      await prisma.productImage.createMany({
        data: [
          {
            productId: product.id,
            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
            alt: `${product.name}`,
            position: 0,
          },
        ],
        skipDuplicates: true,
      });

      // Add a single variant for accessories (one size fits all)
      await prisma.productVariant.upsert({
        where: {
          productId_size_color: {
            productId: product.id,
            size: 'One Size',
            color: 'Brown',
          },
        },
        update: {},
        create: {
          productId: product.id,
          size: 'One Size',
          color: 'Brown',
          stock: Math.floor(Math.random() * 20) + 5,
          sku: `${accessory.sku}-OS-BRN`,
        },
      });
    }
  }

  // Create sample discount codes
  const discounts = [
    {
      code: 'WELCOME10',
      description: '10% off for new customers',
      type: 'PERCENTAGE',
      value: 10,
      minimumAmount: 50,
      usageLimit: 1000,
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    {
      code: 'FREESHIP',
      description: 'Free shipping on orders over $100',
      type: 'FREE_SHIPPING',
      value: 0,
      minimumAmount: 100,
      usageLimit: null,
      active: true,
    },
  ];

  for (const discount of discounts) {
    await prisma.discount.upsert({
      where: { code: discount.code },
      update: {},
      create: discount,
    });
  }

  console.log('✅ Products and variants created');
  console.log('✅ Discount codes created');
  console.log('🎉 Database seeded successfully!');
  
  console.log('\n📝 Summary:');
  console.log(`- Admin user: ${adminEmail} (password: ${adminPassword})`);
  console.log('- Categories: 4 main + subcategories');
  console.log('- Products: 6 with variants and images');
  console.log('- Discount codes: 2 active codes');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

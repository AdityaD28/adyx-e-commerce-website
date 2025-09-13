# Product Image Placement Guide

## How to Add Your Product Images

1. **Navigate to the product folder**: `/public/images/products/[product-id]/`

2. **Replace the placeholder images** with your actual product photos:
   - Replace `main.svg` with `main.jpg` (or `main.png`)
   - Add alternative views as `alt1.jpg`, `alt2.jpg`, etc.

3. **Image Requirements**:
   - **Dimensions**: 600x800 pixels (3:4 aspect ratio)
   - **Format**: JPG or PNG
   - **Quality**: High resolution, web-optimized
   - **Background**: Clean, preferably white or neutral

4. **After adding images**, update the file extensions in:
   - `src/data/products.ts` (main product database)
   - `src/app/products/page.tsx` (product listing page)

## Example Structure:
```
public/images/products/
├── 1/
│   ├── main.jpg          ← Replace main.svg with this
│   ├── alt1.jpg          ← Additional view 1
│   ├── alt2.jpg          ← Additional view 2
│   └── alt3.jpg          ← Additional view 3
├── 2/
│   ├── main.jpg
│   └── alt1.jpg
└── ...
```

## Current Products:
- Product 1: Elegant Black Midi Dress
- Product 2: Classic White Button Shirt  
- Product 3: Leather Crossbody Bag
- Product 4: Classic Sunglasses
- Product 5: Floral Summer Dress
- Product 6: Casual Denim Shirt
- Product 7: Striped Long Sleeve (placeholder created)
- Product 8: High-Waisted Trousers (placeholder created)

Once you add your images, the website will automatically display them instead of the placeholder SVGs!

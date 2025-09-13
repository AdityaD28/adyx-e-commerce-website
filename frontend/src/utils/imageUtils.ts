// Utility functions for handling product images

export const getPlaceholderImage = (category: string, width = 400, height = 600) => {
  // Use local category placeholder images instead of external services
  const categoryPlaceholders = {
    women: '/images/categories/women.svg',
    men: '/images/categories/men.svg',
    accessories: '/images/categories/accessories.svg',
    shoes: '/images/categories/shoes.svg',
    default: '/images/categories/women.svg'
  }
  
  return categoryPlaceholders[category.toLowerCase() as keyof typeof categoryPlaceholders] || categoryPlaceholders.default
}

// Removed getRandomImage function to prevent external image loading

export const validateImageUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

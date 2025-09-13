import { useEffect, useState } from 'react'
import { useCartStore } from '@/stores/cart'

// Custom hook to handle hydration for cart state
export function useCartHydration() {
  const [isHydrated, setIsHydrated] = useState(false)
  const cartStore = useCartStore()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return {
    ...cartStore,
    isHydrated,
    // Return 0 for server-side rendering and before hydration
    getTotalItems: () => isHydrated ? cartStore.getTotalItems() : 0,
    getTotalPrice: () => isHydrated ? cartStore.getTotalPrice() : 0,
    clearCart: cartStore.clearCart,
  }
}

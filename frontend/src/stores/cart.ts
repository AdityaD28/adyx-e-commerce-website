import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  size?: string
  color?: string
  quantity: number
  maxQuantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(cartItem => 
          cartItem.productId === item.productId &&
          cartItem.size === item.size &&
          cartItem.color === item.color
        )

        if (existingItem) {
          // Update quantity if item exists
          const newQuantity = Math.min(
            existingItem.quantity + (item.quantity || 1),
            existingItem.maxQuantity
          )
          set({
            items: items.map(cartItem =>
              cartItem.id === existingItem.id
                ? { ...cartItem, quantity: newQuantity }
                : cartItem
            )
          })
        } else {
          // Add new item
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${item.size || 'default'}-${item.color || 'default'}-${Date.now()}`,
            quantity: item.quantity || 1
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'adyx-cart',
      version: 1,
      // Skip hydration if running on server
      skipHydration: typeof window === 'undefined',
    }
  )
)

import { createContext, useContext, useState } from 'react'

export type ProductType = "individual" | "business"

interface ProductContextValue {
  activeType: ProductType
  setActiveType: (type: ProductType) => void
}

const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [activeType, setActiveType] = useState<ProductType>('individual')

  return (
    <ProductContext.Provider
      value={{ activeType, setActiveType }}
    >
      {children}
    </ProductContext.Provider>
  )
}


export function useProduct() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProduct must be used within ProductProvider"
    );
  }

  return context;
}
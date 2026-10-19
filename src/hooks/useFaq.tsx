import { createContext, useContext, useState } from 'react'

interface FaqContextValue {
  loadedAllFaq: boolean
  setLoadState: (state: boolean) => void
}

const FaqContext = createContext<FaqContextValue | null>(null)

export function FaqProvider({ children }: { children: React.ReactNode }) {
  const [loadedAllFaq, setLoadState] = useState<boolean>(false)

  return (
    <FaqContext.Provider value={{ loadedAllFaq, setLoadState }}>
      {children}
    </FaqContext.Provider>
  )
}

export function useFaq() {
  const context = useContext(FaqContext)

  if (!context) {
    throw new Error('useFaq must be used within FaqProvider')
  }

  return context
}

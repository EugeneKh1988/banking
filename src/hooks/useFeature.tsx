import { createContext, useContext, useState } from 'react'

const features = ["banking", "tools", "support"] as const;
export type FeatureType = typeof features[number];

interface FeatureContextValue {
  activeFeature: FeatureType
  setActiveFeature: (type: FeatureType) => void
}

const FeatureContext = createContext<FeatureContextValue | null>(null)

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const [activeFeature, setActiveFeature] = useState<FeatureType>('banking')

  return (
    <FeatureContext.Provider
      value={{ activeFeature, setActiveFeature }}
    >
      {children}
    </FeatureContext.Provider>
  )
}


export function useFeature() {
  const context = useContext(FeatureContext);

  if (!context) {
    throw new Error(
      "useFeature must be used within FeatureProvider"
    );
  }

  return context;
}
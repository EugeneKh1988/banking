import type { FallbackProps } from "react-error-boundary"
import { Button } from "./ui/button"
import { Text } from "./ui/text"

const FallbackError: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex items-center flex-col gap-10 mt-40 md:mt-60 3xl:mt-80">
      <Text>Something went wrong.</Text>
      <Text>{error instanceof Error ? error?.message : 'Unknown error'}</Text>
      <Button
        onClick={resetErrorBoundary}
        className="bg-green-60 hover:bg-green-65 px-15 py-12 h-auto text-white"
      >
        Try again
      </Button>
    </div>
  )
}

export default FallbackError;
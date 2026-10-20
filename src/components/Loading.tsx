import { Spinner } from "./ui/spinner"

const Loading = () => {
  return (
    <div className="flex justify-center mt-50 md:mt-80 3xl:mt-100">
      <Spinner className="size-24" />
    </div>
  )
}

export default Loading;
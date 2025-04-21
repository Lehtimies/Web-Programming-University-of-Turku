const Error500Page = () => {
  return (
    <div className="flex flex-grow flex-col mx-10 overflow-hidden gap-10 items-center justify-center w-full w-max-4xl text-white">
      <h1 className="text-8xl">500</h1>
      <p className="text-2xl text-center">An Internal Server Error occured, try again later!</p>
    </div>
  )
}

export default Error500Page;
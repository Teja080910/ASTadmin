function PromiseBasedToastExample() {
    const toast = useToast()
    return (
      <Button
        onClick={() => {
          const examplePromise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(200), 5000)
          })
  
          // Will display the loading toast until the promise is either resolved
          // or rejected.
          toast.promise(examplePromise, {
            success: { title: 'Promise resolved', description: 'Looks great' },
            error: { title: 'Promise rejected', description: 'Something wrong' },
            loading: { title: 'Promise pending', description: 'Please wait' },
          })
        }}
      >
        Show Toast
      </Button>
    )
  }
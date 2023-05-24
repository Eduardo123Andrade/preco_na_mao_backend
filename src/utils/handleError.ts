interface Error {
  path: string[]
  message: string
}

interface CustomError {
  [key: string]: string
}

export const formatValidationError = (error: string) => {
  const listError = JSON.parse(error)
  const errors: CustomError = {};

  listError
    .filter((err: Error) => !!err.path.length)
    .map((err: Error) => errors[err.path[0]] = err.message)

  return errors
}
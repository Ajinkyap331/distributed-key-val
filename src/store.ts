let store = {}

export const get = () => {
  return store
}

export const add = (data : object) => {
    store = {...store, ...data}
    return store
}
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'

function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const localStorageState = window.localStorage.getItem(key)

    if (localStorageState) {
      try {
        return JSON.parse(localStorageState)
      } catch {
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue
      }
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })
  const prevKeyRef = useRef<string>(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(key)
    }

    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return useMemo(() => [state, setState], [state])
}

export default useLocalStorage

import { useRef, useState, useLayoutEffect } from 'react'

function useResource(optionalRef) {
  const [_, forceUpdate] = useState(false)
  const localRef = useRef(undefined)
  const ref = optionalRef ? optionalRef : localRef
  useLayoutEffect(() => void forceUpdate((i) => !i), [])
  return [ref, ref.current]
}

export default useResource

import { useRef, useState, Suspense } from 'react'
import * as THREE from 'three'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  Loader,
} from '@react-three/drei'
import { Minimap } from './Minimap'
import { damp, useStore } from './Util'

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const scroll = useScroll()
  const clicked = useStore((state) => state.clicked)
  const urls = useStore((state) => state.urls)
  const setClicked = useStore((state) => state.setClicked)
  const [hovered, hover] = useState(false)
  const click = () => setClicked(index === clicked ? null : index)
  const over = () => hover(true)
  const out = () => hover(false)
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    )
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      8,
      delta
    )
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    )
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      )
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      )
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      )
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    )
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? 'white' : '#aaa'),
      hovered ? 0.3 : 0.1
    )
  })
  return (
    <Image
      ref={ref}
      {...props}
      alt='ALT IMG'
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  )
}

function Items({ w = 0.7, gap = 0.15 }) {
  // const { urls } = useSnapshot(state)
  const urls = useStore((state) => state.urls)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap
  return (
    <ScrollControls
      horizontal
      damping={6}
      pages={(width - xW + urls.length * xW) / width}
    >
      <Minimap />
      <Scroll>
        {
          urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  )
}

export const App = () => {
  const setClicked = useStore((state) => state.setClicked)
  return (
    <>
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        onPointerMissed={() => setClicked(null)}
      >
        <Suspense fallback={null}>
          <Items />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

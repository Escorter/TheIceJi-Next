import React, { useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'
import { IJNLogo } from '../../objects/models'

function Instances({ material }) {
  const [sphereRefs] = useState(() => [])
  const initialPositions = useMemo(
    () => [
      [-4, 20, -12],
      [-10, 12, -4],
      [-11, -12, -23],
      [-16, -6, -10],
      [12, -2, -3],
      [13, 4, -12],
      [14, -2, -23],
      [8, 10, -20],
    ],
    []
  )
  useFrame(() => {
    sphereRefs.forEach((el) => {
      el.position.y += 0.02
      if (el.position.y > 19) el.position.y = -18
      el.rotation.x += 0.03
      el.rotation.y += 0.03
      el.rotation.z += 0.01
    })
  })
  return (
    <>
      <IJNLogo material={material} />
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  )
}

export default Instances

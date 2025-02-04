import { InnerHeight } from '@libs/hooks/v2/useWindowSize'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

const ScrollProgress = ({ pageHeight }) => {
  const { scrollY } = useViewportScroll()
  const windowHeight = InnerHeight(-1)
  const X = useTransform(scrollY, [0, pageHeight - windowHeight], ['-100%', '0%'])

  return (
    <div className='flex fixed bottom-0 left-0 z-10'>
      <motion.div
        style={{ x: X }}
        className='w-screen h-0.5 bg-primary-0'
      ></motion.div>
    </div>
  )
}

export default ScrollProgress

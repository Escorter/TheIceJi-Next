import { motion } from 'framer-motion'
import { config as animConf } from 'views/animations'
import { IconDev, IconImage, IconPresent } from '../../../assets'

export default function Header({
  children,
  title,
  subTitle,
  icon = false,
  className,
}) {
  const Anim = animConf.stagger_yUp_O

  return (
    <motion.div
      variants={Anim.parent(0.3)}
      initial='hidden'
      animate='show'
      className={`absolute flex flex-col justify-center w-full pl-4 sm:pl-8 md:pl-20 h-full pointer-events-none ${
        className && className
      }`}
    >
      <motion.h2
        variants={Anim.children}
        className='text-3xl font-semibold text-primary-0 uppercase md:text-5xl xxl:text-7xl'
      >
        {subTitle}
      </motion.h2>
      <motion.h1
        variants={Anim.children}
        className='mt-0 text-7xl font-semibold uppercase md:-mt-4 md:text-9xl xxl:-mt-12 xxl:text-[13rem] text-outline'
      >
        {title}
      </motion.h1>
      {children && (
        <motion.div
          variants={Anim.children}
          className='relative left-28 pt-5 pb-6 w-3/5 bg-white/10 rounded-md backdrop-blur-md lg:left-48 lg:pt-10 lg:pb-12 lg:w-1/2 xxl:left-40'
        >
          <div className='-ml-20 lg:-ml-36'>{children}</div>
        </motion.div>
      )}
      {icon && (
        <motion.div variants={Anim.children} className='flex space-x-10'>
          <IconDev className='Anim AnimOpacity-40' />
          <IconImage className='Anim AnimOpacity-40' />
          <IconPresent className='Anim AnimOpacity-40' />
        </motion.div>
      )}
    </motion.div>
  )
}

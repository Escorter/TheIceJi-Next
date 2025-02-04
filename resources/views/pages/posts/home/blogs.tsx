import Image from 'next/image'
import Link from 'next/link'
import { UseSmoothScroll } from 'views/animations/hooks'
import { FooterPage } from 'views/layouts/footer'

const Blogs = ({ posts }) => {
  return (
    <UseSmoothScroll physics={{ damping: 9.5, mass: 0.4, stiffness: 70 }}>
      <div className='flex justify-center w-screen bg-gradient-to-r from-background-2 to-background-1'>
        <div className='container grid grid-cols-2 px-4 pb-48 mt-24 md:grid-cols-3 md:mt-48 xxl:w-[1440px]'>
          <div className='flex flex-col col-span-2 justify-start items-center pb-24 md:pb-0'>
            <h1 className='pt-16 text-6xl font-semibold uppercase lg:text-8xl'>Blogs</h1>
            <div className='flex space-x-2 text-xs lg:space-x-4 lg:text-base'>
              <button className='Anim AnimOpacity-60'>Coding</button>
              <p className='opacity-60'> | </p>
              <button className='Anim AnimOpacity-60'>Film Production</button>
              <p className='opacity-60'> | </p>
              <button className='Anim AnimOpacity-60'>
                Mix &#38; Mastering
              </button>
            </div>
          </div>
          {posts.map((v, i) => (
            <Link href={'/post/' + v.slug} passHref key={i}>
              <div className='flex relative items-end p-2 h-48 border border-white/20 hover:border-white/100 cursor-pointer sm:h-64 md:p-4 lg:h-80 AnimOpacity-80'>
                <h2 className='z-20 pointer-events-none lg:text-2xl TH'>
                  {v.title}
                </h2>
                <div className='opacity-60 xl:opacity-10 xl:hover:opacity-100 Anim'>
                  <div className='absolute bottom-0 left-0 z-10 w-full h-3/5 bg-gradient-to-t from-background-1 to-background-1/0'></div>
                  <Image
                    src={v.coverImage.url}
                    layout='fill'
                    alt={v.title}
                    objectFit='cover'
                  />
                </div>
              </div>
            </Link>
          ))}
          <div></div>
        </div>
      </div>
      <FooterPage />
    </UseSmoothScroll>
  )
}

export default Blogs

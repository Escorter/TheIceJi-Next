import { useEffect, useState, useRef } from 'react'
import { globalStyles } from 'views/theme/css/global'
import { User } from '@store'

// IJN Components
import Cursor from './components/cursor'
import { NavBar, NavCanvas } from './nav'
import Footer from './footer'
import About from 'layouts/components/about'
import IJNconsole from './components/IJNconsole'
import useAudio from './function/useAudio'

const AudioUrl = '/audio/WebSound-01.mp3'

type IJNlayout = {
  children: React.ReactNode
  showNav: React.ReactNode
  showFooter: React.ReactNode
}

export default function IJNlayout({
  children,
  showNav,
  showFooter,
}: IJNlayout) {
  const _setNotification = User((state) => state.setNotification)
  const _NotificationItems = User((state) => state.notificationItems)
  const _setCart = User((state) => state.setCart)
  const _CartItems = User((state) => state.cartItems)

  useEffect(() => {
    _setNotification(
      typeof _NotificationItems === 'boolean' ? 0 : _NotificationItems.length
    )
    _setCart(typeof _CartItems === 'boolean' ? 0 : _CartItems.length)
  }, [_setNotification, _NotificationItems, _setCart, _CartItems])

  const Darkmode = true
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleAbout, setToggleAbout] = useState(false)

  useEffect(() => {
    console.log(IJNconsole)
  }, [])

  const [audio] = useAudio()
  const BGaudio = useRef(null)

  useEffect(() => {
    audio ? BGaudio.current.play() : BGaudio.current.pause()
  }, [audio])

  return (
    <>
      <About toggleAbout={toggleAbout} setToggleAbout={setToggleAbout} />
      {globalStyles(Darkmode)}
      {showNav && (
        <>
          <NavBar
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
            useAudio={useAudio}
          />
          <NavCanvas toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        </>
      )}
      {children}
      {showFooter && (
        <Footer
          toggleAbout={toggleAbout}
          setToggleAbout={setToggleAbout}
          toggleMenu={toggleMenu}
        />
      )}
      <Cursor />
      <audio ref={BGaudio} loop id='LayoutIdAudio'>
        <source src={AudioUrl} type='audio/mpeg' />
      </audio>
    </>
  )
}

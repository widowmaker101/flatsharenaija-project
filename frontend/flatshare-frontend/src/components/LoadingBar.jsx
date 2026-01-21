import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, speed: 400 })

export default function LoadingBar() {
  const location = useLocation()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [location])

  return null
}

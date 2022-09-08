export type MobileDeviceOS = 'Android' | 'iOS' | 'unknown'

const getMobileOS = (): MobileDeviceOS => {
  var userAgent = navigator.userAgent || navigator.vendor

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS'
  }

  return 'unknown'
}

export default getMobileOS
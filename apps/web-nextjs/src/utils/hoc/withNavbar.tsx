import Link from 'next/link'
import React, { useMemo } from 'react'
import { Navbar } from 'ui/components'
import { ROUTE_CONSTANTS } from '@/utils/constants'
import { useWindowScroll } from 'react-use'
import { rdxScreenSelector } from '@/redux-state/features/screen'
import { useSelector } from 'react-redux'


const withNavbar = (WrappedComponent) => {

  const HocComponents = ({ ...props }) => {
    const isMobile = useSelector(rdxScreenSelector.IsMobile)
    const { y } = useWindowScroll();
    const isScrolling = useMemo(() => y > 0, [y])
    return (


      <React.Fragment>
        <Navbar
          linkAs={Link}
          collectionHref={ROUTE_CONSTANTS.COLLECTION}
          isMobile={isMobile}
          isScrolling={isScrolling}
          homeHref={ROUTE_CONSTANTS.HOME}
        />
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }



  return HocComponents
}

export default withNavbar

import React from 'react'
import Link from 'next/link'
import { BottomTabs } from 'ui/components'
import { ROUTE_CONSTANTS } from '@/utils/constants'

import { rdxScreenSelector } from '@/redux-state/features/screen'
import { useSelector } from 'react-redux'


const withBottomTabs = (WrappedComponent, path: "home" | "collection" | "search") => {

  const HocComponents = ({ ...props }) => {
    const isMobile = useSelector(rdxScreenSelector.IsMobile)

    if (!isMobile) {
      return <WrappedComponent {...props} />
    }

    return (
      <React.Fragment>
        <BottomTabs

          paths={{
            home: {
              href: ROUTE_CONSTANTS.HOME
            },
            search: {
              href: ROUTE_CONSTANTS.SEARCH
            },
            collection: {
              href: ROUTE_CONSTANTS.COLLECTION
            },
          }}
          activePath={path}
          linkAs={Link}
        />
        <WrappedComponent {...props} />
        <div style={{ paddingBottom: "10rem" }} />
      </React.Fragment>
    )
  }
  return HocComponents
}

export default withBottomTabs
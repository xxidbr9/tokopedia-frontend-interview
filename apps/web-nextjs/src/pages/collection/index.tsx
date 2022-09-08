import Meta from '@/components/meta'
import dynamic from 'next/dynamic'
// import { CollectionTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import React from 'react'



const CollectionTemplate = dynamic(() => import('@/components/templates').then((mod) => mod.CollectionTemplate), {
  ssr: false,
});

type CollectionPageProps = {

}
function CollectionPage(props: CollectionPageProps) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Meta />
      <CollectionTemplate />
    </React.Fragment>
  )
}

export default CollectionPage
export const config = { amp: false }




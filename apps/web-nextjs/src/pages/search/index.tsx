import React from "react";
import { withApollo } from '@/utils/hooks/useApollo';
import { SearchTemplate } from '@/components/templates';
import Meta from "@/components/meta";
import { useRouter } from "next/router";

type SearchPageProps = {

}

function SearchPage(props: SearchPageProps) {
  const router = useRouter();
  const page: number = parseInt(router.query.page as string) || 1;
  
  return (
    <React.Fragment>
      <Meta />
      <SearchTemplate page={page} />
    </React.Fragment>
  )
}

export const config = { amp: 'hybrid' }
export default withApollo(SearchPage);

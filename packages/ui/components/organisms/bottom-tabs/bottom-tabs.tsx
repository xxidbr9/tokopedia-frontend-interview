import styled from '@emotion/styled'
import colors from 'ui/theme/colors'
import { Typography } from 'ui/components'
import { HomeIcon, SearchIcon, CollectionIcon } from 'ui/icons'


type Path = 'home' | 'search' | 'collection'
type BottomTabsProps = {
  paths: {
    [keyof in Path]: {
      href: string
    }
  },
  linkAs: React.ElementType<any>
  activePath: Path
}

const BottomTabs = (props: BottomTabsProps) => {
  return (
    <BottomTabsStyled>
      {Object.entries(props.paths).map((path, index) => (
        <LinkStyled href={path[1].href} as={props.linkAs} key={`${index}-${path[0]}`}>
          <TabItemStyled isActive={props.activePath === path[0]}>
            {path[0] === "home" && <HomeIcon />}
            {path[0] === "search" && <SearchIcon />}
            {path[0] === "collection" && <CollectionIcon />}
            <Typography.Text size='xs'>
              {path[0][0].toUpperCase() + path[0].slice(1)}
            </Typography.Text>
          </TabItemStyled>
        </LinkStyled>
      ))
      }

    </BottomTabsStyled >
  )
}


const LinkStyled = styled.a`
  text-decoration: none;
  color: inherit;
`;

export default BottomTabs

const TabItemStyled = styled.li<{ isActive?: boolean }>`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 4px;

flex: none;
order: 0;
flex-grow: 0;
color: ${colors.textSecondary};

svg{
  width: 24px;
  height: 24px;
  path{
    fill: ${props => props.isActive ? colors.primary : colors.textSecondary};
  }
}
`;

const BottomTabsStyled = styled.ul`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
/* padding: 20px 80px 32px; */
gap: 72px;

position: fixed;
background-color: ${colors.surface};
bottom: 0;
z-index: 9999;
width: 100%;
height: 100px;
margin: 0;
padding: 0;
`;
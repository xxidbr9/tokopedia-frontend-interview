import styled from '@emotion/styled'
import React from 'react'
import { Brand, Container, Typography } from 'ui/components'
import colors from 'ui/theme/colors'

type NavbarProps = {
  isScrolling?: boolean
  isMobile?: boolean
  linkAs?: React.ElementType<any>
  collectionHref?: string
}

const NavbarWrapperStyled = styled.nav<NavbarProps>`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9999;
  background: ${props => props.isScrolling ? colors.surface : 'transparent'};
  transition: all 0.15s ease-out;
  ${props => props.isScrolling && `
    box-shadow: 0px 20px 15px rgba(17, 17, 17, 0.5);
  `}
`

const NavItemStyled = styled.div`
  display: flex;
  width: 100%;
  padding:8px 0px;
`;

const LeftNavStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  align-items: center;
  a{
    text-decoration: none;
    color: ${colors.textPrimary};
  }
`;

const CollectionLinkStyled = styled.a`
  display: flex;
  text-decoration: none;
  color: ${colors.textPrimary};
  a{
    text-decoration: none;
    color: ${colors.textPrimary};
  }
`;

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`

const Navbar: React.FC<NavbarProps> = ({ isMobile, isScrolling, linkAs, collectionHref, ...props }) => {
  return (
    <NavbarWrapperStyled isMobile={isMobile} isScrolling={isScrolling} {...props}>
      <Container isMobile={isMobile}>
        <NavItemStyled>
          <LeftNavStyled>
            <BrandWrapper>
              <Brand isLogo height={44} width={40} />
              {!isMobile && (
                <Typography.Title as="h5" weight='bold' style={{ color: colors.primary, margin: 0 }}>
                  We Boo
                </Typography.Title>
              )}
            </BrandWrapper>
            {!isMobile && (
              <CollectionLinkStyled as={linkAs} href={collectionHref}>Koleksi kamu</CollectionLinkStyled>
            )}
          </LeftNavStyled>
        </NavItemStyled>
      </Container>
    </NavbarWrapperStyled>
  )
}

export default Navbar
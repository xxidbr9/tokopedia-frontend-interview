import styled from '@emotion/styled'
import React from 'react'
import { Brand, Button, Container } from 'ui'
import colors from 'ui/theme/colors'

type InstallPromptProps = {
  isMobile: boolean
  isAppleDevice: boolean
  onInstall: () => void
  onDismiss: () => void
}

const InstallPrompt = (props: InstallPromptProps) => {
  const { isMobile, isAppleDevice } = props

  if (isMobile && isAppleDevice) {
    return null
  }

  return (
    <FixedPosition>
      <ContainerRight>
        <WrapperStyled>
          <BrandWrapper>
            <Brand width={40} height={40} />
          </BrandWrapper>
          <TextWrapper>
            <TitleStyled>Tambahkan ke layar &apos;Beranda&apos;</TitleStyled>
            <DescriptionStyled>
              Sekarang kamu bisa instal <b style={{color:colors.primary}}>We Boo</b> ke layar &apos;Beranda&apos; untuk akses cepat
            </DescriptionStyled>
          </TextWrapper>
          <ButtonWrapper>
            <Button variant='link' style={{color:colors.textSecondary}} onClick={props.onDismiss}>Tutup</Button>
            <Button onClick={props.onInstall}>Install</Button>
          </ButtonWrapper>
        </WrapperStyled>
      </ContainerRight>
    </FixedPosition>
  )
}

export default InstallPrompt

const ContainerRight = styled(Container)`
  display: flex;
  justify-content: flex-end;
`;

const FixedPosition = styled.div`
  position: fixed;
  left: 0;
  bottom:0;
  right: 0;
  /* background-color: #fff; */
  padding: 20px;
  z-index: 9999;
`;

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.inputSurface};
  padding: 20px;
  border-radius: 20px;
  width: 300px;
  box-shadow: 0px 12px 12px 8px rgba(17, 17, 17, 0.25);
`;

const BrandWrapper = styled.div`
  position: absolute;
  top: -15px;
  background-color: #151522;
  padding: 12px;
  border-radius: 12px;
`;

const TextWrapper = styled.div`
  position: relative;
  margin-top: 20px;
`;

const TitleStyled = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 10px;
`;

const DescriptionStyled = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  column-gap: 20px;
`;
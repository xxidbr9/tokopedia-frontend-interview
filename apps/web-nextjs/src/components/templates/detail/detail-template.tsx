import { rdxScreenSelector } from '@/redux-state/features/screen'
import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Typography } from 'ui'
import colors from 'ui/theme/colors'
import { Media } from 'weboo-models'

type DetailTemplateProps = {
  data: Media
}

const DetailTemplate = (props: DetailTemplateProps) => {
  const title = props.data.title.romaji || props.data.title.english || props.data.title.native || props.data.title.userPreferred || ""
  return (
    <React.Fragment>
      <DetailHero title={title} banner={props.data.bannerImage} coverImage={props.data.coverImage} />
      {/* Tabs */}



      {/* Episodes */}
      <AnimeEpisodes title={title} data={props.data.streamingEpisodes} />
    </React.Fragment>
  )
}

export default DetailTemplate


type DetailHeroProps = {
  banner: string
  coverImage: Media['coverImage']
  title: string
}
const DetailHero = (props: DetailHeroProps) => {
  const isMobile = useSelector(rdxScreenSelector.IsMobile)
  const isHaveBanner = props.banner !== null
  const banner = isHaveBanner ? props.banner : props.coverImage.extraLarge || props.coverImage.large || props.coverImage.medium

  return (
    <React.Fragment>
      {!isMobile && (
        <React.Fragment>
          <BannerHeroStyled>
            <BannerWrapperStyled>
              <Image alt={`banner ${props.title}`} src={banner} layout="responsive" objectFit='cover' width={1116} height={420} />
            </BannerWrapperStyled>
            <BannerBackgroundStyled banner={banner} />
            <OverlayHeroStyled />
          </BannerHeroStyled>

          <section>
            <Container>

            </Container>
          </section>

        </React.Fragment>
      )}

      {isMobile && (
        <HeroMobileStyled>
          <Image alt={`banner mobile ${props.title}`} src={props.coverImage.extraLarge} layout="responsive" objectFit='cover' width={420} height={520} />
          <OverlayMobileStyled />
        </HeroMobileStyled>
      )}

    </React.Fragment>
  )
};


const HeroMobileStyled = styled.div`
  width: 100%;
  height: 520px;
  position: relative;
`

const OverlayMobileStyled = styled.div`
  position: absolute;
  height: 520px;
  width: 100%;
  z-index: 99;
  top: 0;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, ${colors.surface} 93.23%), linear-gradient(180deg, ${colors.surface} 0%, rgba(17, 17, 17, 0) 36.98%);
`

const BannerMobileStyled = styled.div`

`;



const OverlayHeroStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 420px;
  z-index: 100;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, ${colors.surface} 93.23%), linear-gradient(180deg, ${colors.surface} 0%, rgba(17, 17, 17, 0) 36.98%);
`

const BannerHeroStyled = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
`;


const BannerWrapperStyled = styled.div`
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  position: relative;
  width: 1116px;
  height: 420px;
  position: absolute;
  z-index: 99;
`;

const BannerBackgroundStyled = styled.div<{ banner: string }>`
  background: url(${props => props.banner});
  background-size: cover;
  filter: blur(20px);
  width: 100%;
  height: 420px;
  position: absolute;
  z-index: 10;
  
`;


type AnimeEpisodesProps = {
  data: Media['streamingEpisodes'],
  title: string
}
const AnimeEpisodes = (props: AnimeEpisodesProps) => {
  const isMobile = useSelector(rdxScreenSelector.IsMobile);
  // const reEpisodes = new RegExp(/Episode[\s\d\-]+/g);


  return (
    <Container style={{ padding: isMobile ? "20px 24px" : "32px 0" }}>
      <Grid columns={isMobile ? 4 : 12} style={{ rowGap: "40px" }}>
        {props.data.map((item, index) => (
          <Grid.Item span={isMobile ? 4 : 3} key={index}>
            <EpisodeWrapper href={item.site}>
              <Image alt={`${props.title}, ${item.title}`} src={item.thumbnail} layout="responsive" objectFit='cover' width={318} height={180} />
              <Typography.Text weight='medium'>
                {item.title}
              </Typography.Text>
            </EpisodeWrapper>
          </Grid.Item>
        ))}
      </Grid>
    </Container>
  )
}


const EpisodeWrapper = styled.a`
  text-decoration: none;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  color: ${colors.textPrimary};
`;

// @ts-nocheck

import React from "react";
import styled from "@emotion/styled";
import { Button, Chip, Typography } from 'ui/components/atoms';
import helpers from 'ui/helpers'
import colors from "ui/theme/colors";
import { useRef } from "react";
import { AnimeMediaListItem } from 'weboo-models';
import { PlusIcon } from "ui/icons";
import { cutString } from "../../../helpers/cutString";

type LayoutType = "fill" | "fixed" | "intrinsic" | "responsive"

type AnimeCardProps = {
  isAmp?: boolean,
  height?: number,
  width?: number,
  imageAs?: React.ElementType<any>,
  linkAs?: React.ElementType<any>,
  layout?: LayoutType
  isMobile?: boolean
  isLast?: boolean
  // split this bellow to model
  data: AnimeMediaListItem

  // event
  onBookmarkClick?: () => void
  onTrailerClick?: (trailerId: string) => void
}


const { Text } = Typography
const AnimeCard = (props: AnimeCardProps) => {
  const { data } = props
  const title = data.title.english || data.title.romaji;

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onBookmarkClick()
  }

  const handleTrailerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onTrailerClick(data.trailer.id)
  }

  return (
    <CardWrapperStyled
      data-testid="anime-card"
      banner={data.bannerImage}
      isLast={props.isLast}>
      {props.isAmp ? (
        <amp-img
          src={data.coverImage.extraLarge}
          width={props.width}
          height={props.height}
          layout={props.layout}
          alt={title}
          data-testid="anime-card-image-amp"
        />
      ) : (
        <React.Fragment>
          <CardImageStyled
            as={props.imageAs}
            layout={props.layout}
            src={data.coverImage.extraLarge}
            alt={title}
            height={props.height}
            width={props.width}
            data-testid="anime-card-image"
          />
        </React.Fragment>
      )}
      {!!title && (
        <Text weight="medium" size="md" title={title}>
          {helpers.cutString(`${title}`, 18)}
        </Text>
      )}

      {!props.isMobile && (
        <React.Fragment>
          <div className="__overlay" />
          {/* TODO: split this to independent components */}
          <div className="__info-card">
            <div className="content">
              <div className="banner" />
              {!!data.trailer && (
                <button className="trailer" onClick={handleTrailerClick} data-testid="trailer-btn">
                  <Text isOverline>
                    Lihat Trailer
                  </Text>
                </button>
              )}

              <div className="info">
                <div className="top-content">
                  <div style={{
                    height: 158,
                    width: 115
                  }}>
                    {props.isAmp ? (
                      <amp-img
                        src={data.coverImage.large}
                        layout={"responsive"}
                        height={158}
                        width={115}
                        alt={title}
                      />
                    ) : (
                      <AnimeSmallImageCardStyled
                        as={props.imageAs}
                        alt={title}
                        src={data.coverImage.large}
                        layout={"responsive"}
                        height={158}
                        width={115}
                      />
                    )}
                  </div>
                  <div className="button-group">
                    <Button>
                      Tonton
                    </Button>
                    <Button data-testid="bookmark-btn" isIcon isOpacity onClick={handleBookmarkClick}>
                      <PlusIcon />
                    </Button>
                  </div>
                </div>
                <div className="main-content">
                  <Text weight="bold">
                    {title}
                  </Text>
                  <div>
                    <Text size="xs">
                      {data.isAdult && "18+"}
                    </Text>
                    <Text size="xs">
                      {data.seasonYear}
                    </Text>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", columnGap: 4 }}>
                    {data.genres.slice(0, 2).map((genre, index) => (
                      <Chip label={genre} key={index}>
                        {genre}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="bottom-content">
                  <Text size="xs" style={{ color: colors.textSecondary }} dangerouslySetInnerHTML={{ __html: cutString(data.description, 200) }} />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </CardWrapperStyled>
  )
}


const CardWrapperStyled = styled.div<{ banner?: string, isLast?: boolean }>`
  cursor: pointer;
  position: relative;
  height: 19.75rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 12px;
  
  amp-img{
    height: 88.61%; // (280 / 316) * 100
    object-fit: cover;
    width: 100%;
    border-radius: 12px;
  }
  .__overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 88.61%;
    border-radius: 12px;
    background-color: transparent;
    transition: all ease-in 150ms;
  }

  .__info-card{
    visibility: hidden;
    cursor: default;
    position: absolute;
    z-index: 1000;
    opacity: 0;
    background-color:${colors.surface};
    border-radius: 24px;
    box-shadow: 0px 12px 12px 8px rgba(17, 17, 17, 0.25);
    ${props => !!props.isLast
    ? `right: 50%;`
    : `left: 50%;`}
    overflow: hidden;

    .content{
      flex: none;
      order: 0;
      flex-grow: 0;
      width: 380px;
      background-color:${colors.surface};
      border-radius: 24px 24px 0px 0px;
      position: relative;
      .info{
        position: relative;
        display: flex;
        z-index: 99;
        flex-direction: column;
        gap: 12px;
        /* padding-top:72px; */
        /* height: 158px;; */
        padding: 72px 16px 24px;
        /* width: 100%; */
        .top-content{
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: baseline;
          padding: 0px;
          gap: 12px;
          amp-img{
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
          .button-group{
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 12px;
          }
        }
        .main-content{
          display: flex;
          flex-direction: column;
          row-gap: 4px;
        }
      }

      .banner{
        width: 380px;
        height: 140px;
        position: absolute;
        background: 
        linear-gradient(0deg, rgba(0, 0, 0, 0) 62.73%, ${colors.surface} 106.43%),
        linear-gradient(180deg, rgba(0, 0, 0, 0) 48.44%, ${colors.surface} 100%),
        url(${props => props.banner});
        background-size: cover;
        filter: blur(1px);
        border-radius: 24px 24px 0px 0px;
      }

      .trailer{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 4px 8px;

        position: absolute;
        z-index: 10000;
        height: 28px;
        right: 10px;
        top: 98px;
        cursor: pointer;

        background: ${colors.surface};
        outline: none;
        border: none;
        border-radius: 4px;
        color: ${colors.textPrimary};
        transition: all ease-out 100ms;
        :active{
          scale: .98;
        }
      }
    }
  }

  &:hover{
    .__overlay{
      background-color: rgba(0, 0, 0, 0.5);
    }
    .__info-card{
      visibility: visible;
      opacity: 1;
    }
    
  }
`;

const AnimeSmallImageCardStyled = styled.img<{ layout?: LayoutType }>`
  width: 115px;
  height: 158px;
  border-radius: 12px;
  object-fit: cover;
`;

const CardImageStyled = styled.img<{ layout?: LayoutType }>`
  height: 88.61%; // (280 / 316) * 100
  object-fit: cover;
  width: 100%;
  border-radius: 12px;
`;

export default AnimeCard
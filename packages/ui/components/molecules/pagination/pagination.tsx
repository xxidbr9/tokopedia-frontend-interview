import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import colors from 'ui/theme/colors'
import LeftIcon from './svg/left.svg'
import RightIcon from './svg/right.svg'

type PaginationProps = {
  defaultPage?: number
  onChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
  position: 'left' | 'center' | 'right'
  total?: number
  pageSize?: number
  isMobile?: boolean
  prefixHref?: string
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { defaultPage = 1, onChange, boundaryCount = 1, siblingCount = 1, pageSize = 1, total = 10, position, isMobile } = props

  const count = useMemo(() => {
    const totalPage = Math.ceil(total / pageSize)
    return totalPage
  }, [total, pageSize])

  const [currentPage, setCurrentPage] = React.useState(defaultPage)

  const handlePage = (page: number) => {
    setCurrentPage(page)
    onChange(page)
  }

  const renderRange = useMemo(() => {

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
      Math.min(
        currentPage - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 1,
    );

    const siblingsEnd = Math.min(
      Math.max(
        currentPage + siblingCount,
        boundaryCount + siblingCount * 2 + 2,
      ),
      endPages[0] - 1,
    );

    const itemList = [
      ...startPages,
      ...(siblingsStart > boundaryCount + siblingCount ? ['start-ellipsis'] : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < count - boundaryCount ? ['end-ellipsis'] : []),
      ...endPages,
    ]

    return itemList
  }, [currentPage, count, boundaryCount, siblingCount])

  const prevLink = currentPage > 1 ? props.prefixHref + `page=${currentPage - 1}` : ""
  const nextLink = currentPage < count ? props.prefixHref + `page=${currentPage + 1}` : ""

  return (
    <PaginationWrapperStyled data-testid="pagination" position={position}>
      <li>
        <ButtonStyled
          href={prevLink}
          isMobile={isMobile}
          aria-label='btn-pagination-prev'
          data-testid="pagination-prev"
        // onClick={handlePervious}
        >
          <LeftIcon color={colors.textSecondary} />
        </ButtonStyled>
      </li>
      {renderRange.map((page) => (
        <li key={page}>
          {typeof page === 'number' ? (
            <ButtonStyled
              href={props.prefixHref + `page=${page}`}
              isMobile={isMobile}
              data-testid={`pagination-page-${page}`}
              isActive={page === currentPage}
              onClick={() => typeof page === 'number' && handlePage(page)}
            >
              {page}
            </ButtonStyled>
          ) : (
            <EllipsisStyled>
              ...
            </EllipsisStyled>
          )}
        </li>
      ))}
      <li>
        <ButtonStyled
          href={nextLink}
          isMobile={isMobile}
          aria-label='btn-pagination-next'
          data-testid="pagination-next"
        // onClick={handleNext}
        >
          <RightIcon color={colors.textSecondary} />
        </ButtonStyled>
      </li>
    </PaginationWrapperStyled>
  )
}

const PaginationWrapperStyled = styled.ul<{ position: string }>`
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: ${props => props.position};
  padding: 0;
  li{
    display: list-item;
    text-align: -webkit-match-parent;
  }
`
type ButtonStyledProps = {
  isActive?: boolean
  isMobile?: boolean
}

const ButtonStyled = styled.a<ButtonStyledProps>`
  display: inline-flex;
  height: 32px;
  outline: 0px;
  border: 0px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  ${props => props.isMobile ? 'margin: 0px;' : 'margin: 0 4px;'}
  min-width: 32px;
  border-radius: 4px;
  cursor: pointer;
  ${props => props.isActive && `
    background-color: ${colors.primary};
    color: ${colors.textPrimary};
  `}
  ${props => !props.isActive && `
    background-color: transparent;
    color: ${colors.textSecondary};
    :hover{
      background-color: ${colors.onSurface};
      color: ${colors.textPrimary};
      svg path{
        fill: ${colors.textPrimary};
      }
    }
  `}
  &:active{
    scale: .95;
  }
  transition: all color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`


const EllipsisStyled = styled.div`
  width: 32px;
  height: 32px;
  color: ${colors.textSecondary};
`

export default Pagination

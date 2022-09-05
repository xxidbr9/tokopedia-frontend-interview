import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import colors from 'ui/theme/colors'

type PaginationProps = {
  count?: number
  defaultPage?: number
  onChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { count = 1, defaultPage = 1, onChange, boundaryCount = 1, siblingCount = 1 } = props
  const [currentPage, setCurrentPage] = React.useState(defaultPage)

  const handlePervious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      onChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < count) {
      setCurrentPage(currentPage + 1)
      onChange(currentPage + 1)
    }
  }

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
      endPages.length > 0 ? endPages[0] - 1 : count - 1,
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

  return (
    <PaginationWrapperStyled data-testid="pagination">
      <li>
        <ButtonStyled data-testid="pagination-prev" onClick={handlePervious}>
          Prev
        </ButtonStyled>
      </li>
      {renderRange.map((page) => (
        <li key={page}>
          {typeof page === 'number' ? (
            <ButtonStyled
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
        <ButtonStyled data-testid="pagination-next" onClick={handleNext}>
          Next
        </ButtonStyled>
      </li>
    </PaginationWrapperStyled>
  )
}

const PaginationWrapperStyled = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  li{
    display: list-item;
    text-align: -webkit-match-parent;
  }
`
type ButtonStyledProps = {
  isActive?: boolean
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  height: 32px;
  outline: 0px;
  border: 0px;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
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
    }
  `}

  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`


const EllipsisStyled = styled.div`
  width: 32px;
  height: 32px;
  color: ${colors.textSecondary};
`

export default Pagination

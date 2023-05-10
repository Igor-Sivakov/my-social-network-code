import { FC, memo } from 'react'
import './Pagination.css'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  halfPortionSize?: number
  onPageChanged: (page: number) => void
}

const Pagination: FC<PropsType> = memo(
  ({
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    halfPortionSize = 5,
  }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: number[] = []

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

    let curP = currentPage
    let curPF = curP - halfPortionSize < 0 ? 0 : curP - halfPortionSize
    let curPL = curP + halfPortionSize
    let slicedPages = pages.slice(curPF, curPL)

    return (
      <div className='pagination__container'>
        {slicedPages.map((page) => {
          return (
            <div className='pagination__page' key={page}>
              <span
                key={page}
                className={
                  currentPage === page ? 'pagination__selected-page _hover' : ''
                }
                onClick={(e) => {
                  onPageChanged(page)
                }}
              >
                {page}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
)

export default Pagination

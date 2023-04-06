import { TypedUseQueryStateResult } from '@reduxjs/toolkit/dist/query/react'

interface IQueryResultProps<T> {
  data?: T
  renderData: (data: T) => JSX.Element
  renderNotFound?: () => JSX.Element
  renderError?: () => JSX.Element
  renderLoading?: () => JSX.Element
  isLoading: boolean
  queryResult: TypedUseQueryStateResult<any, unknown, any>
}

export const QueryResult = <T,>({
  data,
  renderData,
  isLoading,
  renderNotFound = () => <>Ничего не найдено.</>,
  renderError = () => <>Произошла ошибка. Попробуйте позже.</>,
  renderLoading = () => <>Загрузка...</>,
  queryResult,
}: IQueryResultProps<T>) => (
    isLoading ? renderLoading() :
      queryResult.error?.status === 404 ? renderNotFound() :
        queryResult.error || !data ? renderError() :
          renderData(data)
  )

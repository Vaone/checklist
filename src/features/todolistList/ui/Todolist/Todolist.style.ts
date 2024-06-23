import styled from 'styled-components'

export const StyledTodolist = styled.div`
  display: flex;
  align-self: flex-start;
  min-height: 300px;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #269599;
  box-shadow: 0 0 10px #00000049;
  background-color: #fafafa;
  border-radius: 5px;
  & + & {
    margin: 0 0 0 20px;
  }
`
export const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 18px;
`
export const BtnsList = styled.div`
  display: flex;
  justify-content: space-between;
`
export const FilterStatus = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`

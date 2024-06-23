import styled, { css } from 'styled-components'

export const FinishedTask = css`
  background-color: #315dbb92;
  color: #000000c7;
  span {
    text-decoration: line-through;
  }
`
export const StyledLi = styled.li<{ $isdone: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  transition: color 0.3s;
  margin-bottom: 10px;
  border: 1px solid #007bff;
  border-radius: 5px;

  ${(props) => props.$isdone && FinishedTask}
`

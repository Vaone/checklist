import { FC, memo } from 'react'
import Button from '@mui/material/Button'
import styled, { css } from 'styled-components'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'Pressed' | 'Delete' | 'Normal' | 'Disabled'
  margin?: string
  border?: string
  variant?: string
}

export const CustomButton: FC<ButtonProps> = memo((props) => {
  return (
    <StyledButton onClick={props.onClick} disabled={props.disabled} type={props.type} {...props}>
      {props.children}
    </StyledButton>
  )
})

export default CustomButton

const DisabledButton = css`
  cursor: default;
  background: #abb4c5;
  color: #49a0a0;
`

const PressedButton = css`
  background-color: #265252;
  color: #ffffff;
`

const DeleteButton = css`
  background-color: #f34747;
  color: #ffffff;
`

// const NormalButton = css`
//   background-color: #158fa1;
//   color: #fff;
// `;

export const StyledButton = styled(Button)<ButtonProps>`
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  margin: ${(props) => props.margin || '0'};
  ${(props) => {
    switch (props.type) {
      case 'Delete':
        return DeleteButton
      case 'Pressed':
        return PressedButton
      case 'Disabled':
        return DisabledButton
      default:
        return ''
    }
  }}
`

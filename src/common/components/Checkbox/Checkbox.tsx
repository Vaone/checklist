import { Checkbox } from '@mui/material'
import { ChangeEvent, FC } from 'react'

type CheckBoxProps = {
  isdone: boolean
  checkboxHandler: (e: boolean) => void
}

const CheckBox: FC<CheckBoxProps> = ({ isdone, checkboxHandler }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    checkboxHandler(e.currentTarget.checked)
  }

  return (
    <>
      <Checkbox checked={isdone} onChange={onChangeHandler} />
    </>
  )
}

export default CheckBox

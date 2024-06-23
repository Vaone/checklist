import { ChangeEvent, FC, memo, useState } from 'react'
import styled from 'styled-components'

export type EditableFieldPropsType = {
  currentText: string
  updateEditableField: (inputText: string) => void
}

const EditableField: FC<EditableFieldPropsType> = memo(({ currentText, updateEditableField }) => {
  // console.log('EditableField');

  const [isEditable, setIsEditable] = useState(false)
  const [inputText, setInputText] = useState(currentText)

  const isEditableHandler = () => {
    setIsEditable(!isEditable)
    updateEditableField(inputText)
  }

  const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }

  return isEditable ? (
    <input value={inputText} onChange={onChangeTextField} onBlur={isEditableHandler} autoFocus />
  ) : (
    <CustomWrapp>
      <CustomSpan onDoubleClick={() => setIsEditable(!isEditable)}>{currentText}</CustomSpan>
    </CustomWrapp>
  )
})

export default EditableField

const CustomSpan = styled.span`
  word-wrap: break-word;
`
export const CustomWrapp = styled.div`
  max-width: 200px;
`

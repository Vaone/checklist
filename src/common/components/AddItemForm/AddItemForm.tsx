import { FC, ChangeEvent, KeyboardEvent, useState, memo } from 'react'
import { CustomButton as Button } from '../Button/Button'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import { BaseResponseType } from '../Types/common.types'

export type AddItemFormPropsType = {
  addInputText: (inputText: string) => Promise<unknown>
  disable?: boolean
}

const AddItemForm: FC<AddItemFormPropsType> = memo(({ addInputText, disable }) => {
  const [newTask, setNewTask] = useState('')
  const [inputError, setInputError] = useState('')
  // const inputLengthError = newTask.length > 15;

  const inputHandlerTask = (e: ChangeEvent<HTMLInputElement>) => {
    Boolean(inputError) && setInputError('')
    setNewTask(e.currentTarget.value)
  }

  const addNewTaskHandler = () => {
    const trimmedInput = newTask.trim()
    if (trimmedInput) {
      addInputText(newTask)
        .then(() => {
          setNewTask('')
        })
        .catch((err: BaseResponseType) => {
          if (err.resultCode) {
            setInputError(err.messages[0])
          }
        })
    } else {
      setInputError('Title is required')
    }
  }

  const onKDwnAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    Boolean(newTask) &&
      // !inputLengthError &&
      e.key === 'Enter' &&
      addNewTaskHandler()
  }

  return (
    <StyledItemForm>
      <StyledInput
        id="outlined-basic"
        variant="outlined"
        value={newTask}
        onChange={inputHandlerTask}
        onKeyDown={onKDwnAddTask}
        size="small"
        error={Boolean(inputError)}
        label={Boolean(inputError) ? 'Please write correct text' : 'Type smth'}
        style={{ margin: '0 10px 10px 0' }}
        disabled={disable}
      />

      {inputError && <span>{inputError}</span>}

      <Button
        variant="contained"
        onClick={addNewTaskHandler}
        // disabled={!newTask || inputLengthError}
        disabled={Boolean(!newTask) || disable}
        // type={!newTask || inputLengthError ? "Disabled" : "Normal"}
        type={Boolean(!newTask) ? 'Disabled' : 'Normal'}
        style={{ height: '40px' }}
      >
        +
      </Button>
    </StyledItemForm>
  )
})

export default AddItemForm

export const StyledItemForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

export const StyledInput = styled(TextField)<{ inputError?: boolean }>`
  width: 100%;
`

import {Label, Input, ErrorMessage} from "./FormInput.styled"

export const FormInputToday = ({ label = "", error, ...props }) => {
  return (
    <Label>
        {label}
        <Input {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
    </Label>
  )
}


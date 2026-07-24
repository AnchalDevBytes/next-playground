import { FormField } from "../schema/data";

const TextInput = ({
    field,
    value,
    onChange    
} : {
    field : FormField,
    value : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}) => {

  return (
    <input
        type={field.type}
        name={field.id}
        value={value}
        onChange={onChange}
        placeholder={field?.placeholder}
        className="border-2 rounded p-2 w-full"
    />
  )
}

export default TextInput;

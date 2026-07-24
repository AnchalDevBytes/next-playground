import { FormField } from "../schema/data";

const SelectInput = ({
    field,
    value,
    onChange    
} : {
    field : FormField,
    value : string,
    onChange : (e : React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
}) => {
  return (
    <select
        name={field.id}
        value={value}
        onChange={onChange}
        className="border-2 rounded p-2 w-full"
    >
        <option value="">Select</option>

        {field.options?.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
  )
}

export default SelectInput;

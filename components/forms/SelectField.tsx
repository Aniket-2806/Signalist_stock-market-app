import {Label} from "@/components/ui/label";
import {Controller} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

/**
 * Reusable form select field component with label, validation, and error display.
 * Uses Base UI Select component and integrates with React Hook Form Controller.
 *
 * @param props - Select field properties
 * @param props.name - Field name for form registration
 * @param props.label - Display label for the select
 * @param props.placeholder - Placeholder text
 * @param props.options - Array of option objects with value and label
 * @param props.control - React Hook Form control object
 * @param props.error - Field error object from validation
 * @param props.required - Whether the field is required (default: false)
 * @returns Rendered select field with label and error message
 */
const SelectField = ({ name, label, placeholder, options, control, error, required = false }: SelectFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">{label}</Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {options.map((option) => (
                                <SelectItem value={option.value} key={option.value} className="focus:bg-gray-600 focus:text-white">
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        {error && <p className="text-sm text-red-500">{error.message}</p>}
                    </Select>
                )}
            />
        </div>
    )
}
export default SelectField
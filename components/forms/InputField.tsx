import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";

interface FormInputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
}

/**
 * Reusable form input field component with label, validation, and error display.
 * Integrates with React Hook Form for form state management.
 *
 * @param props - Input field properties
 * @param props.name - Field name for form registration
 * @param props.label - Display label for the input
 * @param props.placeholder - Placeholder text
 * @param props.type - Input type (default: "text")
 * @param props.register - React Hook Form register function
 * @param props.error - Field error object from validation
 * @param props.validation - Validation rules for the field
 * @param props.disabled - Whether the input is disabled
 * @param props.value - Controlled value for the input
 * @returns Rendered input field with label and error message
 */
const InputField = ({
                        name,
                        label,
                        placeholder,
                        type = "text",
                        register,
                        error,
                        validation,
                        disabled,
                        value
                    }: FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled })}
                {...register(name, validation)}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default InputField;
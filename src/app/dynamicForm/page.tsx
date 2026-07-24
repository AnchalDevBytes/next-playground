"use client";
import { formSchema } from "@/app/dynamicForm/schema/data";
import React, { useState } from "react";
import { ComponentMap } from "./components/ComponentMap";

const DynamicForm = () => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target; 

        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    const validate = () => {
        let newErrors: Record<string,string> = {};

        for(const field of formSchema) {
            if(field.required && !formData[field.id]) {
                newErrors[field.id] = `${field.label} is Required`;
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validate()) return;

        console.log("Form Submitted", formData);
    }

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 bg-white/90 text-black p-20 rounded-2xl"
        >
            {formSchema.map((field) => {
                const Component = ComponentMap[field.type];

                return (
                    <div 
                        key={field.id}
                        className="flex flex-col gap-1"
                    >
                        <label>{field.label} : </label>

                        <Component
                            field={field}
                            value={formData[field.id] || ""}
                            onChange={handleChange}
                        />

                        {errors[field.id] && (
                            <p className="text-red-500 text-xs">
                                {errors[field.id]}
                            </p>
                        )}
                    </div>
                )
            })}

            <button 
                type="submit"
                className="p-2 border-2 border-blue-800 bg-blue-700 rounded text-white mt-4 w-full"
            >
                Submit
            </button>
        </form>

    </div>
  )
}

export default DynamicForm;

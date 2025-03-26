'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { FilterType, StringStringKeyValuePair } from '@/_generated/api'
import { getFilterElementDefaultValue } from './FilterElement'

interface OptionsFilterProps {
    options: StringStringKeyValuePair[]
    onValueChange?: (value: string) => void
}

export function SelectFilter({ options, onValueChange }: OptionsFilterProps) {
    const [value, setValue] = useState<string>(getFilterElementDefaultValue(FilterType.Options, options) as string)

    const handleValueChange = (newValue: string) => {
        setValue(newValue)
        if (onValueChange) {
            onValueChange(newValue)
        }
    }

    return (
        <RadioGroup value={value} onValueChange={handleValueChange} className="space-y-2">
            {options.map(option => {
                return (
                    <div key={option.key} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value!} id={option.key!} />
                        <Label htmlFor={option.key!}>{option.value}</Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}

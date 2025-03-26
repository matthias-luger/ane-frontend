'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FilterType, StringStringKeyValuePair } from '@/_generated/api'
import { getFilterElementDefaultValue } from './FilterElement'

interface BoolFilterProps {
    options?: StringStringKeyValuePair[]
    onValueChange?: (value: boolean) => void
}

export function BooleanFilter({ options = [], onValueChange }: BoolFilterProps) {
    const [checked, setChecked] = useState(getFilterElementDefaultValue(FilterType.Bool, options) as boolean)
    const [trueOption, falseOption] = getTrueFalseOptions(options)

    function getTrueFalseOptions(options: StringStringKeyValuePair[]) {
        let trueOption = options.find(o => o.value === 'true')
        let falseOption = options.find(o => o.value === 'false')

        if (options.length !== 2 || !trueOption || !falseOption) {
            throw new Error('BooleanFilter requires exactly two option. One with value "true" and one with value "false"')
        }
        return [trueOption, falseOption]
    }

    const handleCheckedChange = (value: boolean) => {
        setChecked(value)
        if (onValueChange) {
            onValueChange(value)
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="bool-filter">{trueOption.key}</Label>
            <Switch id="bool-filter" checked={checked} onCheckedChange={handleCheckedChange} />
            <Label htmlFor="bool-filter">{falseOption.key}</Label>
        </div>
    )
}

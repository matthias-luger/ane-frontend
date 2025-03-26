'use client'

import { Label } from '@/components/ui/label'
import { FilterType, StringStringKeyValuePair } from '@/_generated/api'
import { SelectFilter } from './SelectFilter'
import { BooleanFilter } from './BooleanFilter'
import { TextFilter } from './TextFilter'
import { RadiusFilter } from './RadiusFilter'
import { NumberRangeFilter } from './NumberRangeFilter'
import { MultiSelectFilter } from './MultiSelectFilter'
import { DateFilter } from './DateFilter'
import { format } from 'date-fns'

interface GeneralFilterProps {
    label?: string
    filterType?: FilterType
    options?: StringStringKeyValuePair[]
    onValueChange?: (value: any) => void
}

export function FilterElement({ label = 'Filter', filterType, options = [], onValueChange: onFilterChange }: GeneralFilterProps) {
    const handleValueChange = (value: any) => {
        if (onFilterChange) {
            onFilterChange(value)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="filter-type">{label}</Label>
            </div>

            <div className="pt-2">
                {filterType === FilterType.Bool && <BooleanFilter options={options} onValueChange={handleValueChange} />}
                {filterType === FilterType.Date && <DateFilter onValueChange={handleValueChange} />}
                {filterType === FilterType.MultiSelect && <MultiSelectFilter options={options} onValueChange={handleValueChange} />}
                {filterType === FilterType.NumberRange && <NumberRangeFilter onValueChange={handleValueChange} max={100} min={0} />}
                {filterType === FilterType.Options && <SelectFilter options={options} onValueChange={handleValueChange} />}
                {filterType === FilterType.Radius && <RadiusFilter onValueChange={handleValueChange} />}
                {filterType === FilterType.Text && <TextFilter onValueChange={handleValueChange} />}
            </div>
        </div>
    )
}

export function getFilterElementDefaultValue(filterType: FilterType, options: StringStringKeyValuePair[]) {
    switch (filterType) {
        case FilterType.Bool:
            return false
        case FilterType.Date:
            return new Date()
        case FilterType.MultiSelect:
            return options.map(o => o.value || '')
        case FilterType.NumberRange:
            return [10, 20]
        case FilterType.Options:
            return options[0].value || ''
        case FilterType.Radius:
            return 0
        case FilterType.Text:
            return ''
    }
}

export function getFilterElementValueForDisplay(filterType: FilterType, options: StringStringKeyValuePair[], value: any) {
    switch (filterType) {
        case FilterType.Bool:
            return value ? options.find(o => o.value === 'true')?.key : options.find(o => o.value === 'false')?.key
        case FilterType.Date:
            return format(value as Date, 'LLL dd, y')
        case FilterType.MultiSelect:
            return value.join(', ')
        case FilterType.NumberRange:
            return value.join(' - ')
        case FilterType.Options:
            return value
        case FilterType.Radius:
            return `${value} km`
        case FilterType.Text:
            return value
    }
}

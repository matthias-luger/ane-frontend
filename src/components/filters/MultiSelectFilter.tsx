'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { FilterType, StringStringKeyValuePair } from '@/_generated/api'
import { getFilterElementDefaultValue } from './FilterElement'

interface MultiSelectFilterProps {
    options: StringStringKeyValuePair[]
    onValueChange?: (value: string[]) => void
    placeholder?: string
}

export function MultiSelectFilter({ options, onValueChange, placeholder = 'Select options...' }: MultiSelectFilterProps) {
    const [open, setOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>(getFilterElementDefaultValue(FilterType.MultiSelect, options) as string[])

    const handleSelect = (value: string) => {
        let updatedValues: string[]

        if (selectedValues.includes(value)) {
            updatedValues = selectedValues.filter(v => v !== value)
        } else {
            updatedValues = [...selectedValues, value]
        }

        setSelectedValues(updatedValues)
        if (onValueChange) {
            onValueChange(updatedValues)
        }
    }

    const handleRemove = (value: string) => {
        const updatedValues = selectedValues.filter(v => v !== value)
        setSelectedValues(updatedValues)
        if (onValueChange) {
            onValueChange(updatedValues)
        }
    }

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                        {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search options..." />
                        <CommandList>
                            <CommandEmpty>No options found.</CommandEmpty>
                            <CommandGroup>
                                {options.map(option => {
                                    if (!option.value) {
                                        console.error('Option value is missing', option)
                                        return null
                                    }
                                    return (
                                        <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value!)}>
                                            <Check className={cn('mr-2 h-4 w-4', selectedValues.includes(option.value) ? 'opacity-100' : 'opacity-0')} />
                                            {option.key}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {options
                        .filter(option => selectedValues.includes(option.value!))
                        .map(option => {
                            if (!option.value) {
                                console.error('Option value is missing', option)
                                return null
                            }
                            return (
                                <Badge key={option.value} variant="secondary">
                                    {option.key}
                                    <button
                                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onClick={() => handleRemove(option.value!)}
                                    >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Remove {option.key}</span>
                                    </button>
                                </Badge>
                            )
                        })}
                </div>
            )}
        </div>
    )
}

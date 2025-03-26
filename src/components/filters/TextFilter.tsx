'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { getFilterElementDefaultValue } from './FilterElement'
import { FilterType } from '@/_generated/api'

interface TextFilterProps {
    placeholder?: string
    debounceMs?: number
    onValueChange?: (value: string) => void
}

export function TextFilter({ placeholder = 'Search...', debounceMs = 300, onValueChange }: TextFilterProps) {
    const [value, setValue] = useState(getFilterElementDefaultValue(FilterType.Text, []) as string)
    const valueDebounceRef = useRef<NodeJS.Timeout>(null)

    function setValueDebounced(newValue: string) {
        if (valueDebounceRef.current) {
            clearTimeout(valueDebounceRef.current)
        }
        const timer = setTimeout(() => {
            if (onValueChange) {
                onValueChange(newValue)
            }
        }, debounceMs)
        setValue(newValue)
        valueDebounceRef.current = timer
    }

    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder={placeholder} value={value} onChange={e => setValueDebounced(e.target.value)} className="pl-8" />
        </div>
    )
}

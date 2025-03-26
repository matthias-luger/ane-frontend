'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { SelectSingleEventHandler } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { getFilterElementDefaultValue } from './FilterElement'
import { FilterType } from '@/_generated/api'

interface DateFilterProps {
    onValueChange?: (value: Date | undefined) => void
}

export function DateFilter({ onValueChange }: DateFilterProps) {
    const [date, setDate] = useState<Date | undefined>(getFilterElementDefaultValue(FilterType.Date, []) as Date)

    const handleSelect: SelectSingleEventHandler = date => {
        setDate(date)
        if (onValueChange) {
            onValueChange(date)
        }
    }

    return (
        <div className="grid gap-2">
            <Label>Date Range</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button id="date" variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'LLL dd, y') : <span>Pick a date range</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar initialFocus mode="single" defaultMonth={date} selected={date} onSelect={handleSelect} numberOfMonths={2} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

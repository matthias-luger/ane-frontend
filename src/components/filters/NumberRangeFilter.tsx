'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { FilterType } from '@/_generated/api'
import { getFilterElementDefaultValue } from './FilterElement'

interface NumberRangeFilterProps {
    min: number
    max: number
    step?: number
    onValueChange?: (value: [number, number]) => void
}

export function NumberRangeFilter({ min, max, step = 1, onValueChange }: NumberRangeFilterProps) {
    const [range, setRange] = useState<[number, number]>(getFilterElementDefaultValue(FilterType.NumberRange, []) as [number, number])

    useEffect(() => {
        // Ensure range is within bounds when min/max props change
        const newRange: [number, number] = [Math.max(min, range[0]), Math.min(max, range[1])]
        if (newRange[0] !== range[0] || newRange[1] !== range[1]) {
            setRange(newRange)
        }
    }, [min, max, range])

    const handleSliderChange = (newValue: number[]) => {
        const newRange: [number, number] = [newValue[0], newValue[1]]
        setRange(newRange)
        if (onValueChange) {
            onValueChange(newRange)
        }
    }

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Number(e.target.value)
        if (!isNaN(newMin)) {
            const newRange: [number, number] = [Math.max(min, Math.min(newMin, range[1])), range[1]]
            setRange(newRange)
            if (onValueChange) {
                onValueChange(newRange)
            }
        }
    }

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Number(e.target.value)
        if (!isNaN(newMax)) {
            const newRange: [number, number] = [range[0], Math.min(max, Math.max(newMax, range[0]))]
            setRange(newRange)
            if (onValueChange) {
                onValueChange(newRange)
            }
        }
    }

    return (
        <div className="space-y-4">
            <Slider defaultValue={range} min={min} max={max} step={step} value={range} onValueChange={handleSliderChange} className="my-6" />
            <div className="flex items-center space-x-4">
                <div className="grid gap-1.5 flex-1">
                    <Label htmlFor="min-value">Min</Label>
                    <Input id="min-value" type="number" min={min} max={range[1]} value={range[0]} onChange={handleMinInputChange} />
                </div>
                <div className="grid gap-1.5 flex-1">
                    <Label htmlFor="max-value">Max</Label>
                    <Input id="max-value" type="number" min={range[0]} max={max} value={range[1]} onChange={handleMaxInputChange} />
                </div>
            </div>
        </div>
    )
}

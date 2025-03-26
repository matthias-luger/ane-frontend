'use client'

import type React from 'react'
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { getFilterElementDefaultValue } from './FilterElement'
import { FilterType } from '@/_generated/api'

interface RadiusFilterProps {
    min?: number
    max?: number
    onValueChange?: (value: number) => void
}

export function RadiusFilter({ min = 1, max = 100, onValueChange }: RadiusFilterProps) {
    const [radius, setRadius] = useState(getFilterElementDefaultValue(FilterType.Radius, []) as number)

    const handleRadiusChange = (value: number[]) => {
        const newRadius = value[0]
        setRadius(newRadius)
        if (onValueChange) {
            onValueChange(newRadius)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = Number(e.target.value)
        if (!isNaN(newRadius) && newRadius >= min && newRadius <= max) {
            setRadius(newRadius)
            if (onValueChange) {
                onValueChange(newRadius)
            }
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Label>Radius</Label>
                <div className="text-sm text-muted-foreground">({radius} km)</div>
            </div>
            <Slider value={[radius]} min={min} max={max} step={1} onValueChange={handleRadiusChange} />
            <div className="flex items-center space-x-2">
                <Input type="number" value={radius} onChange={handleInputChange} min={min} max={max} className="w-20" />
            </div>
        </div>
    )
}

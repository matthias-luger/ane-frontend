'use client'

import { Slider } from './ui/slider'
import { Search, Filter, ChevronDown, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import { SelectItem, Select, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Label } from './ui/label'

export default function ItemSearch() {
    const [searchQuery, setSearchQuery] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
    const [currentFilterCategory, setCurrentFilterCategory] = useState('')
    const [currentFilterValue, setCurrentFilterValue] = useState('')
    const [appliedFilters, setAppliedFilters] = useState<{ category: string; value: string }[]>([])

    // Add a filter
    const addFilter = (category: string, value: string) => {
        if (category && value) {
            setAppliedFilters([...appliedFilters, { category, value }])
            setCurrentFilterCategory('')
            setCurrentFilterValue('')
            setIsFilterDialogOpen(false)
        }
    }

    // Remove a filter
    const removeFilter = (index: number) => {
        const newFilters = [...appliedFilters]
        newFilters.splice(index, 1)
        setAppliedFilters(newFilters)
    }

    const handlePriceRangeChange = (values: number[]) => {
        setPriceRange(values)

        const priceFilterIndex = appliedFilters.findIndex(filter => filter.category === 'Price Range')
        const newFilters = [...appliedFilters]
        const priceFilterValue = `$${values[0]} - $${values[1]}`

        if (priceFilterIndex >= 0) {
            newFilters[priceFilterIndex] = { category: 'Price Range', value: priceFilterValue }
        } else {
            newFilters.push({ category: 'Price Range', value: priceFilterValue })
        }

        setAppliedFilters(newFilters)
    }

    return (
        <Card className="mb-6 border-border bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-2xl">Find Items on eBay</CardTitle>
                <CardDescription>Search for items and set up notifications for when they become available</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {/* Search Bar */}
                    <div className="flex w-full items-center space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search for anything..."
                                className="pl-8 bg-background"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Search</Button>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-1">
                                    <Filter className="h-4 w-4" />
                                    Add Filter
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-background">
                                <DialogHeader>
                                    <DialogTitle>Add Filter</DialogTitle>
                                    <DialogDescription>Select a filter category and value to narrow your search results.</DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="filter-category">Filter Category</Label>
                                        <Select value={currentFilterCategory} onValueChange={setCurrentFilterCategory}>
                                            <SelectTrigger id="filter-category" className="bg-background">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-background">
                                                {filterCategories.map(category => (
                                                    <SelectItem key={category.name} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {currentFilterCategory && (
                                        <div className="grid gap-2">
                                            {currentFilterCategory === 'Price Range' ? (
                                                <div className="space-y-4">
                                                    <Label>
                                                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                                                    </Label>
                                                    <Slider
                                                        defaultValue={[0, 1000]}
                                                        max={5000}
                                                        step={10}
                                                        value={priceRange}
                                                        onValueChange={setPriceRange}
                                                        className="py-4"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <Label htmlFor="filter-value">Filter Value</Label>
                                                    <Select value={currentFilterValue} onValueChange={setCurrentFilterValue}>
                                                        <SelectTrigger id="filter-value" className="bg-background">
                                                            <SelectValue placeholder="Select value" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-background">
                                                            {filterCategories
                                                                .find(c => c.name === currentFilterCategory)
                                                                ?.options?.map(option => (
                                                                    <SelectItem key={option} value={option}>
                                                                        {option}
                                                                    </SelectItem>
                                                                ))}
                                                        </SelectContent>
                                                    </Select>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (currentFilterCategory === 'Price Range') {
                                                handlePriceRangeChange(priceRange)
                                                setIsFilterDialogOpen(false)
                                            } else {
                                                addFilter(currentFilterCategory, currentFilterValue)
                                            }
                                        }}
                                        disabled={currentFilterCategory === '' || (currentFilterCategory !== 'Price Range' && currentFilterValue === '')}
                                    >
                                        Add Filter
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Quick Filters Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-1">
                                    <ChevronDown className="h-4 w-4" />
                                    Quick Filters
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-background">
                                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {filterCategories.map(category => (
                                    <DropdownMenuSub key={category.name}>
                                        <DropdownMenuSubTrigger>
                                            <span>{category.name}</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent className="bg-background">
                                                {category.type === 'range' ? (
                                                    <DropdownMenuItem onClick={() => setIsFilterDialogOpen(true)}>Set Price Range</DropdownMenuItem>
                                                ) : (
                                                    category.options?.map(option => (
                                                        <DropdownMenuItem key={option} onClick={() => addFilter(category.name, option)}>
                                                            {option}
                                                        </DropdownMenuItem>
                                                    ))
                                                )}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Applied Filters */}
                    {appliedFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {appliedFilters.map((filter, index) => (
                                <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                                    <span>
                                        {filter.category}: {filter.value}
                                    </span>
                                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(index)}>
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Remove filter</span>
                                    </Button>
                                </Badge>
                            ))}
                            {appliedFilters.length > 0 && (
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setAppliedFilters([])}>
                                    Clear All
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

// Filter categories and options
const filterCategories = [
    {
        name: 'Category',
        options: [
            'Electronics',
            'Clothing',
            'Home & Garden',
            'Toys',
            'Sporting Goods',
            'Automotive',
            'Collectibles',
            'Health & Beauty',
            'Jewelry',
            'Business & Industrial'
        ]
    },
    {
        name: 'Condition',
        options: ['New', 'Used', 'Refurbished', 'For parts or not working']
    },
    {
        name: 'Price Range',
        type: 'range'
    },
    {
        name: 'Item Location',
        options: ['US Only', 'North America', 'Europe', 'Asia', 'Worldwide']
    },
    {
        name: 'Seller',
        options: ['Top Rated', 'eBay Store', 'Individual Seller']
    },
    {
        name: 'Shipping Options',
        options: ['Free Shipping', 'Local Pickup', 'Expedited', 'International Shipping']
    },
    {
        name: 'Buying Format',
        options: ['Auction', 'Buy It Now', 'Best Offer', 'Classified Ads']
    }
]

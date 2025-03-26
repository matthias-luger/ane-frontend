'use client'

import { Search, Filter, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import { SelectItem, Select, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Label } from './ui/label'
import { Configuration, FilterApi, FilterOptions } from '@/_generated/api'
import { FilterElement, getFilterElementDefaultValue, getFilterElementValueForDisplay } from './filters/FilterElement'

export default function ItemSearch() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
    const [currentFilterToAdd, setCurrentFilterToAdd] = useState<{ key: string; options: FilterOptions; value: any }>()
    const [filterOptions, setFilterOptions] = useState<{ [key: string]: FilterOptions }>({})
    const [appliedFilters, setAppliedFilters] = useState<{ [key: string]: { options: FilterOptions; value: any } }>({})

    useEffect(() => {
        loadFilters()
    }, [])

    const loadFilters = async () => {
        let configuration: Configuration = new Configuration({
            basePath: 'https://ane.coflnet.com'
        })
        const api = new FilterApi(configuration)
        const options = await api.getOptions()
        setFilterOptions(options)
        console.log(options)
    }

    const addFilter = (key: string, filterOptions: FilterOptions, value: any) => {
        setAppliedFilters({
            ...appliedFilters,
            [key]: {
                options: filterOptions,
                value: getFilterElementValueForDisplay(filterOptions.filterType!, filterOptions.options!, value)
            }
        })
        setCurrentFilterToAdd(undefined)
        setIsFilterDialogOpen(false)
    }

    const removeFilter = (key: string) => {
        const newFilters = { ...appliedFilters }
        delete newFilters[key]
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

                    <div className="flex flex-wrap gap-2 items-center">
                        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-1">
                                    <Filter className="h-4 w-4" />
                                    Add Filter
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-background" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                                <DialogHeader>
                                    <DialogTitle>Add Filter</DialogTitle>
                                    <DialogDescription>Select a filter category and value to narrow your search results.</DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="filter-category">Filter Category</Label>
                                        <Select
                                            value={currentFilterToAdd?.key}
                                            onValueChange={newValue => {
                                                setCurrentFilterToAdd({ key: newValue, options: filterOptions[newValue], value: '' })
                                            }}
                                        >
                                            <SelectTrigger id="filter-category" className="bg-background">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-background">
                                                {Object.keys(filterOptions).map(key => {
                                                    return (
                                                        <SelectItem key={key} value={key}>
                                                            {key}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {currentFilterToAdd && (
                                    <div className="grid gap-2 overflow-scroll" style={{ maxHeight: 'calc(40vh)' }}>
                                        <FilterElement
                                            key={currentFilterToAdd.key}
                                            label={currentFilterToAdd.key}
                                            filterType={currentFilterToAdd.options.filterType}
                                            options={currentFilterToAdd.options.options!}
                                            onValueChange={newValue => {
                                                let current = { ...currentFilterToAdd }
                                                current.value = newValue

                                                setCurrentFilterToAdd(current)
                                            }}
                                        />
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            addFilter(currentFilterToAdd!.key, currentFilterToAdd!.options, currentFilterToAdd!.value)
                                            setIsFilterDialogOpen(false)
                                        }}
                                        disabled={!currentFilterToAdd}
                                    >
                                        Add Filter
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {Object.keys(appliedFilters).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {Object.keys(appliedFilters).map(key => {
                                const filter = appliedFilters[key]
                                return (
                                    <Badge key={key} variant="secondary" className="gap-1 px-3 py-1">
                                        <span>
                                            {key}: {filter.value.toString()}
                                        </span>
                                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(key)}>
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">Remove filter</span>
                                        </Button>
                                    </Badge>
                                )
                            })}
                            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setAppliedFilters({})}>
                                Clear All
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

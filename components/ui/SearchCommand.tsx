"use client"

import { useEffect, useState, useCallback } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { searchStocks } from "@/lib/actions/finnhub.actions"
import { useDebounce } from "@/hooks/useDebounce"

export interface StockWithWatchlistStatus {
    symbol: string
    name: string
    exchange: string
    type: string
    isInWatchlist?: boolean
}

interface SearchCommandProps {
    renderAs?: 'button' | 'text'
    label?: string
    initialStocks: StockWithWatchlistStatus[]
}

export default function SearchCommand({
                                          renderAs = 'button',
                                          label = 'Add stock',
                                          initialStocks
                                      }: SearchCommandProps) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks)

    const isSearchMode = !!searchTerm?.trim()
    const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10)

    // Keep stocks state in sync if initialStocks changes from parent
    useEffect(() => {
        if (!searchTerm?.trim()) {
            setStocks(initialStocks)
        }
    }, [initialStocks, searchTerm])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen(v => !v)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    const handleSearch = useCallback(async (query?: string) => {
        const cleanQuery = typeof query === 'string' ? query.trim() : ''

        if (!cleanQuery) {
            setStocks(initialStocks)
            return
        }

        setLoading(true)
        try {
            const results = await searchStocks(cleanQuery)
            setStocks(results)
        } catch {
            setStocks([])
        } finally {
            setLoading(false)
        }
    }, [initialStocks])

    const debouncedSearch = useDebounce(handleSearch, 300)

    useEffect(() => {
        debouncedSearch(searchTerm)
    }, [searchTerm, debouncedSearch])

    const handleSelectStock = () => {
        setOpen(false)
        setSearchTerm("")
        setStocks(initialStocks)
    }

    return (
        <>
            {renderAs === 'text' ? (
                <span onClick={() => setOpen(true)} className="search-text cursor-pointer">
                    {label}
                </span>
            ) : (
                <Button onClick={() => setOpen(true)} className="search-btn">
                    {label}
                </Button>
            )}
            <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog">
                <div className="search-field">
                    <CommandInput
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        placeholder="Search stocks..."
                        className="search-input"
                    />
                    {loading && <Loader2 className="search-loader animate-spin" />}
                </div>
                <CommandList className="search-list">
                    {loading ? (
                        <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
                    ) : displayStocks?.length === 0 ? (
                        <div className="search-list-indicator p-4 text-center text-sm text-gray-500">
                            {isSearchMode ? 'No results found' : 'No stocks available'}
                        </div>
                    ) : (
                        <ul>
                            <div className="search-count p-2 text-xs font-semibold text-gray-400">
                                {isSearchMode ? 'Search results' : 'Popular stocks'}
                                {` `}({displayStocks?.length || 0})
                            </div>
                            {displayStocks?.map((stock) => (
                                <li key={stock.symbol} className="search-item">
                                    <Link
                                        href={`/stocks/${stock.symbol}`}
                                        onClick={handleSelectStock}
                                        className="search-item-link flex items-center gap-3 p-2 hover:bg-accent rounded-md"
                                    >
                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                        <div className="flex-1">
                                            <div className="search-item-name font-medium">
                                                {stock.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {stock.symbol} | {stock.exchange} | {stock.type}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}
"use client"

import { useEffect, useState, useCallback, useRef } from "react"
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

    // Tracks current query to ignore stale async responses
    const currentQueryRef = useRef<string>("")

    const isSearchMode = !!searchTerm?.trim()
    const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10)

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
        currentQueryRef.current = cleanQuery

        if (!cleanQuery) {
            setStocks(initialStocks)
            setLoading(false)
            return
        }

        setLoading(true)
        try {
            const results = await searchStocks(cleanQuery)
            // Ignore response if user has typed a newer query since request started
            if (currentQueryRef.current === cleanQuery) {
                setStocks(results)
            }
        } catch {
            if (currentQueryRef.current === cleanQuery) {
                setStocks([])
            }
        } finally {
            if (currentQueryRef.current === cleanQuery) {
                setLoading(false)
            }
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
            <CommandDialog open={open} onOpenChange={setOpen}>
                <div className="relative border-b border-gray-800 px-3 py-2 flex items-center">
                    <CommandInput
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        placeholder="Search stocks..."
                        className="w-full bg-transparent outline-none text-white text-sm"
                    />
                    {loading && <Loader2 className="h-4 w-4 animate-spin text-gray-400 ml-2" />}
                </div>
                <CommandList className="max-h-[300px] overflow-y-auto p-2">
                    {loading ? (
                        <CommandEmpty className="py-6 text-center text-sm text-gray-400">Loading stocks...</CommandEmpty>
                    ) : displayStocks?.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-500">
                            {isSearchMode ? 'No results found' : 'No stocks available'}
                        </div>
                    ) : (
                        <ul>
                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-400">
                                {isSearchMode ? 'Search results' : 'Popular stocks'}
                                {` `}({displayStocks?.length || 0})
                            </div>
                            {displayStocks?.map((stock) => (
                                <li key={stock.symbol} className="my-1">
                                    <Link
                                        href={`/stocks/${stock.symbol}`}
                                        onClick={handleSelectStock}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-800/80 rounded-md transition-colors"
                                    >
                                        <TrendingUp className="h-4 w-4 text-gray-400" />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-white truncate text-sm">
                                                {stock.name}
                                            </div>
                                            <div className="text-xs text-gray-400">
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
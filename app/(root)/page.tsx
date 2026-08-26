import TradingViewWidget from "@/components/ui/TradingViewWidget";
import {
    MARKET_OVERVIEW_WIDGET_CONFIG,
    HEATMAP_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG
} from "@/lib/constants";

export default function Home() {
    const scriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-';

    return (
        <div className="flex flex-col min-h-screen gap-8 home-wrapper">
            {/* Top Row */}
            <section className="grid w-full gap-8 home-section md:grid-cols-1 xl:grid-cols-3">
                <div className="md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        title="Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>

                <div className="md:col-span-1 xl:col-span-2">
                    <TradingViewWidget
                        title="Stock Heatmap"
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={HEATMAP_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
            </section>

            {/* Bottom Row */}
            <section className="grid w-full gap-8 home-section md:grid-cols-1 xl:grid-cols-3">
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>

                <div className="h-full md:col-span-1 xl:col-span-2">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={MARKET_DATA_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
            </section>
        </div>
    );
}
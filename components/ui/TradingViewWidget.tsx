'use client';

import React, { useEffect, useRef, memo } from 'react';
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

const TradingViewWidget = ({
                               title,
                               scriptUrl,
                               config,
                               height = 600,
                               className = ""
                           }: TradingViewWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const configString = JSON.stringify(config);

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        // Clean up previous widgets and scripts before mounting new ones
        currentContainer.innerHTML = '';

        // Create inner widget container node required by TradingView
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        widgetContainer.style.height = `${height}px`;
        widgetContainer.style.width = '100%';
        currentContainer.appendChild(widgetContainer);

        // Inject script safely after DOM structure is ready
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = configString;

        currentContainer.appendChild(script);

        // Cleanup on unmount or prop change to avoid orphaned iframe postMessage calls
        return () => {
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        };
    }, [scriptUrl, configString, height]);

    return (
        <div className="w-full">
            {title && <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>}
            <div
                className={cn('tradingview-widget-container w-full overflow-hidden', className)}
                ref={containerRef}
            />
        </div>
    );
};

export default memo(TradingViewWidget);
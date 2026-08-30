'use client';

import React, { memo } from 'react';
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

/**
 * Wrapper component for rendering TradingView widgets with optional title and customizable styling.
 * Component is memoized for performance optimization.
 * @param {TradingViewWidgetProps} props - Component props including title, scriptUrl, config, height, and className
 * @returns {JSX.Element} Rendered TradingView widget container with title
 */
const TradingViewWidget = ({
                               title,
                               scriptUrl,
                               config,
                               height = 600,
                               className = ""
                           }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div className="w-full">
            {title && <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>}
            <div
                className={cn('tradingview-widget-container', className)}
                ref={containerRef}
            >
                <div
                    className="tradingview-widget-container__widget"
                    style={{ height: `${height}px`, width: "100%" }}
                />
            </div>
        </div>
    );
};

export default memo(TradingViewWidget);
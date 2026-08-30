'use client';

import { useEffect, useRef } from "react";

/**
 * Custom React hook for embedding TradingView widgets into the application.
 * Manages widget lifecycle, script loading, and cleanup to prevent duplicate widgets.
 *
 * @param scriptUrl - URL of the TradingView widget script to load
 * @param config - Configuration object for the TradingView widget
 * @param height - Height of the widget container in pixels (default: 600)
 * @returns Ref object to attach to the widget container element
 */
const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        // Clear container to prevent duplicate widgets on re-renders
        currentContainer.innerHTML = '';

        // Create the widget wrapper expected by TradingView
        const widgetWrapper = document.createElement('div');
        widgetWrapper.className = 'tradingview-widget-container__widget';
        widgetWrapper.style.width = '100%';
        widgetWrapper.style.height = `${height}px`;

        // Create the script element
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify(config);

        // Inject script inside wrapper, then append wrapper to container
        widgetWrapper.appendChild(script);
        currentContainer.appendChild(widgetWrapper);

        return () => {
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        };
    }, [scriptUrl, config, height]);

    return containerRef;
};

export default useTradingViewWidget;
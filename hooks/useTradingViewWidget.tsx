'use client';

import { useEffect, useRef } from "react";

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
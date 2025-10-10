"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // Future: Send to analytics endpoint if needed
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     rating: metric.rating,
    //     id: metric.id,
    //   }),
    // });
  });

  return null;
}

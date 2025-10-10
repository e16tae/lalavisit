export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.lalavisit.com/#website",
    name: "라라재가방문요양센터",
    alternateName: [
      "라라재가방문요양센터",
      "라라",
      "라라방문",
      "라라재가",
      "라라요양",
      "라라요양센터",
      "라라방문요양센터",
      "재가",
      "재가요양",
      "재가방문",
      "방문요양",
      "방문요양센터",
      "요양",
      "요양센터",
      "재가방문요양센터",
      "라라재가방문",
      "송파구 방문요양",
      "송파구 라라재가",
      "송파 라라재가",
      "송파 방문요양",
      "송파구 요양",
      "송파구 재가요양",
      "가락동 방문요양",
      "가락동 라라재가",
      "가락동 요양",
      "가락동 재가요양",
      "송파 요양센터",
      "가락동 요양센터",
      "가족요양",
      "입주간병",
      "노인요양",
      "장기요양"
    ],
    url: "https://www.lalavisit.com",
    description: "믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 전문 요양센터",
    inLanguage: "ko-KR",
    publisher: {
      "@id": "https://www.lalavisit.com/#organization"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.lalavisit.com/#organization",
    name: "라라재가방문요양센터",
    image: "https://www.lalavisit.com/logo.svg",
    description: "믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 전문 요양센터",
    url: "https://www.lalavisit.com",
    telephone: "+82-2-430-2351",
    email: "lalavisit@naver.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "송파대로24길 5-14 3층 303호",
      addressLocality: "송파구",
      addressRegion: "서울",
      postalCode: "05831",
      addressCountry: "KR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.4925,
      longitude: 127.1202
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    priceRange: "₩₩",
    areaServed: {
      "@type": "City",
      name: "서울특별시"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "재가 방문요양 서비스",
    provider: {
      "@id": "https://www.lalavisit.com/#organization"
    },
    areaServed: {
      "@type": "City",
      name: "서울특별시"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "요양 서비스",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "방문요양",
            description: "거동이 불편한 어르신의 가정을 직접 방문하여 신체활동 지원 및 일상생활 지원 서비스를 제공합니다"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "가족요양",
            description: "가족이 직접 요양보호사 자격을 취득하여 어르신을 돌보는 서비스입니다"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "입주간병",
            description: "24시간 전문 간병인이 상주하며 어르신을 돌보는 서비스입니다"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

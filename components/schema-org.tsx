export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://lalavisit.com/#organization",
    name: "라라재가방문요양센터",
    image: "https://lalavisit.com/logo.svg",
    description: "믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 전문 요양센터",
    url: "https://lalavisit.com",
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
      "@id": "https://lalavisit.com/#organization"
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

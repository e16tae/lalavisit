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
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": "https://www.lalavisit.com/#organization",
    name: "라라재가방문요양센터",
    alternateName: "라라재가",
    legalName: "라라재가방문요양센터",
    image: "https://www.lalavisit.com/logo.svg",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lalavisit.com/logo.svg",
      width: 200,
      height: 200
    },
    description: "믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 전문 요양센터. 장기요양등급 1~5등급, 인지지원등급 어르신을 위한 전문 케어 서비스를 제공합니다.",
    url: "https://www.lalavisit.com",
    telephone: "+82-2-430-2351",
    faxNumber: "+82-2-430-2352",
    email: "lalavisit@naver.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "송파대로24길 5-14 3층 303호",
      addressLocality: "송파구",
      addressRegion: "서울특별시",
      postalCode: "05831",
      addressCountry: "KR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.4925,
      longitude: 127.1202
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "00:00",
      closes: "23:59"
    },
    priceRange: "₩₩",
    areaServed: [
      {
        "@type": "City",
        name: "서울특별시"
      },
      {
        "@type": "AdministrativeArea",
        name: "송파구"
      }
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 37.4925,
        longitude: 127.1202
      },
      geoRadius: "10000"
    },
    founder: {
      "@type": "Person",
      name: "이경빈",
      jobTitle: "대표자"
    },
    identifier: [
      {
        "@type": "PropertyValue",
        name: "기관기호",
        value: "2-11710-00469"
      },
      {
        "@type": "PropertyValue",
        name: "고유번호",
        value: "530-80-03437"
      }
    ]
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

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.lalavisit.com/#organization",
    name: "라라재가방문요양센터",
    legalName: "라라재가방문요양센터",
    url: "https://www.lalavisit.com",
    logo: "https://www.lalavisit.com/logo.svg",
    description: "믿을 수 있는 방문요양, 가족요양, 입주간병 서비스를 제공하는 전문 요양센터",
    email: "lalavisit@naver.com",
    telephone: "+82-2-430-2351",
    address: {
      "@type": "PostalAddress",
      streetAddress: "송파대로24길 5-14 3층 303호",
      addressLocality: "송파구",
      addressRegion: "서울특별시",
      postalCode: "05831",
      addressCountry: "KR"
    },
    founder: {
      "@type": "Person",
      name: "이경빈",
      jobTitle: "대표자"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-430-2351",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: ["Korean"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "방문요양 서비스는 어떤 분들이 이용할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "장기요양등급 1~5등급 또는 인지지원등급 판정을 받으신 어르신께서 이용하실 수 있습니다. 거동이 불편하거나 일상생활에 도움이 필요하신 분들에게 적합합니다."
        }
      },
      {
        "@type": "Question",
        name: "서비스 이용 시간은 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "24시간 연중무휴로 상담이 가능하며, 방문요양 서비스는 어르신의 필요와 등급에 따라 하루 2~6시간, 주 5~7일 이용하실 수 있습니다."
        }
      },
      {
        "@type": "Question",
        name: "비용은 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "장기요양보험 적용 시 본인부담금은 15~20% 수준이며, 등급과 서비스 종류에 따라 다릅니다. 자세한 비용은 상담을 통해 안내해 드립니다."
        }
      },
      {
        "@type": "Question",
        name: "서비스 지역은 어디까지인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "서울특별시 전역, 특히 송파구, 강동구, 강남구를 중심으로 서비스를 제공하고 있습니다. 기타 지역은 상담을 통해 확인 가능합니다."
        }
      },
      {
        "@type": "Question",
        name: "상담은 어떻게 받을 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "전화(02-430-2351, 010-9573-2351), 카카오톡, 이메일(lalavisit@naver.com) 또는 홈페이지 상담 신청 폼을 통해 문의하실 수 있습니다."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

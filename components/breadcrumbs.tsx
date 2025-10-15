import Link from "next/link";

import { BreadcrumbSchema } from "@/components/schema-org";

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  const lastIndex = items.length - 1;

  return (
    <>
      <nav aria-label="페이지 경로" className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center text-sm text-gray-500 py-3 space-x-2">
            {items.map((item, index) => {
              const isLast = index === lastIndex;
              return (
                <li key={item.url} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-300">/</span>}
                  {isLast ? (
                    <span className="font-semibold text-primary" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.url} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <BreadcrumbSchema items={items} />
    </>
  );
}

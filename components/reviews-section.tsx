"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import reviews from "@/data/reviews.json";

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.reviews.length / reviewsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentReviews = reviews.reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              이용 후기
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            라라재가방문요양센터를 이용하신 고객님들의 솔직한 후기입니다
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{review.name}</p>
                      <p className="text-sm text-gray-500">
                        {review.service} · {review.grade}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "short"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full bg-white shadow-md hover:shadow-lg hover:bg-primary hover:text-white"
                aria-label="이전 후기"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentIndex(i)}
                    className={`h-3 rounded-full p-0 hover:bg-transparent transition-all ${
                      i === currentIndex
                        ? "bg-primary w-8"
                        : "bg-gray-300 hover:bg-gray-400 w-3"
                    }`}
                    aria-label={`${totalPages}개 중 ${i + 1}번째 후기 페이지로 이동`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full bg-white shadow-md hover:shadow-lg hover:bg-primary hover:text-white"
                aria-label="다음 후기"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

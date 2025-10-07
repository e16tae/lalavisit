"use client";

import { useState } from "react";
import { Camera, GraduationCap, Calendar, Tag, Clock } from "lucide-react";
import activitiesData from "@/data/activities.json";

type ActivityType = "field" | "education";

// Note: metadata는 client component에서 export할 수 없으므로
// 별도의 layout.tsx나 page.tsx로 감싸야 합니다.
// 현재는 "use client"로 인해 메타데이터를 직접 설정할 수 없습니다.

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<ActivityType>("field");

  const currentActivities = activeTab === "field" ? activitiesData.field : activitiesData.education;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              활동 갤러리
            </span>
          </h1>
          <p className="text-xl text-gray-600 text-center">
            현장 활동과 교육 활동을 소개합니다
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-white sticky top-16 z-30 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("field")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "field"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Camera className="w-5 h-5" />
              현장 사진
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "education"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              교육 사진
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentActivities.map((activity) => (
              <div
                key={activity.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-video bg-gray-100">
                  {/* 이미지 영역 - 실제 이미지가 없을 경우 플레이스홀더 표시 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    {activeTab === "field" ? (
                      <Camera className="w-16 h-16 text-primary/30" />
                    ) : (
                      <GraduationCap className="w-16 h-16 text-secondary/30" />
                    )}
                  </div>
                  {/* 실제 이미지를 추가하려면 아래 주석을 해제하세요
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(activity.date).toLocaleDateString("ko-KR")}</span>
                    </div>

                    {activeTab === "field" && "careGrade" in activity && (
                      <>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Tag className="w-4 h-4" />
                          <span>요양등급: {activity.careGrade}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Tag className="w-4 h-4" />
                          <span>서비스: {activity.service}</span>
                        </div>
                      </>
                    )}

                    {activeTab === "education" && "educationType" in activity && (
                      <>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Tag className="w-4 h-4" />
                          <span>교육 유형: {activity.educationType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>교육 시간: {activity.hours}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentActivities.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-gray-50 rounded-full mb-6">
                {activeTab === "field" ? (
                  <Camera className="w-16 h-16 text-gray-300" />
                ) : (
                  <GraduationCap className="w-16 h-16 text-gray-300" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                등록된 활동이 없습니다
              </h3>
              <p className="text-gray-500">
                곧 새로운 활동 사진이 업데이트될 예정입니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">활동 사진 업로드</h2>
            <p className="text-gray-700 mb-2">
              활동 사진과 메타데이터는 <code className="bg-white px-2 py-1 rounded">data/activities.json</code> 파일에서 관리됩니다.
            </p>
            <p className="text-gray-600">
              사진 파일은 <code className="bg-white px-2 py-1 rounded">public/activities/</code> 폴더에 저장하고,
              메타데이터를 JSON 파일에 추가하면 자동으로 표시됩니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

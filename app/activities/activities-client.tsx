"use client";

import Image from "next/image";
import { Camera, GraduationCap, Calendar, Tag, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import activitiesData from "@/data/activities.json";
import type { ActivitiesData } from "@/types/activities";

const typedActivitiesData = activitiesData as ActivitiesData;

export function ActivitiesClient() {
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

      {/* Gallery with Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="field" className="w-full">
            <div className="sticky top-16 z-30 bg-white py-4 border-b mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
                <TabsTrigger value="field" className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  현장 사진
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  교육 사진
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="field">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {typedActivitiesData.field.map((activity) => (
                  <Card
                    key={activity.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video bg-gray-100 cursor-pointer overflow-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Camera className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl w-[95vw] p-0">
                        <DialogTitle className="sr-only">{activity.title}</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-contain"
                            sizes="95vw"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {activity.title}
                      </CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={activity.date}>
                          {new Date(activity.date).toLocaleDateString("ko-KR")}
                        </time>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {activity.careGrade}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {activity.service}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {typedActivitiesData.field.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-block p-8 bg-gray-50 rounded-full mb-6">
                    <Camera className="w-16 h-16 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    등록된 활동이 없습니다
                  </h3>
                  <p className="text-gray-500">
                    곧 새로운 활동 사진이 업데이트될 예정입니다.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="education">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {typedActivitiesData.education.map((activity) => (
                  <Card
                    key={activity.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video bg-gray-100 cursor-pointer overflow-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Camera className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl w-[95vw] p-0">
                        <DialogTitle className="sr-only">{activity.title}</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-contain"
                            sizes="95vw"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {activity.title}
                      </CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={activity.date}>
                          {new Date(activity.date).toLocaleDateString("ko-KR")}
                        </time>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {activity.educationType}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.hours}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {typedActivitiesData.education.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-block p-8 bg-gray-50 rounded-full mb-6">
                    <GraduationCap className="w-16 h-16 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    등록된 활동이 없습니다
                  </h3>
                  <p className="text-gray-500">
                    곧 새로운 활동 사진이 업데이트될 예정입니다.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

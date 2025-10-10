"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod 검증 스키마
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "성함은 2자 이상 입력해주세요" })
    .max(50, { message: "성함은 50자 이하로 입력해주세요" }),
  phone: z
    .string()
    .regex(
      /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      { message: "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)" }
    ),
  service: z.string().min(1, { message: "문의 서비스를 선택해주세요" }),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "방문요양",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("상담 신청이 완료되었습니다", {
          description: "빠른 시일 내에 연락드리겠습니다.",
          duration: 5000,
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast.error("전송 실패", {
          description: errorData.error || "다시 시도해주세요.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("오류 발생", {
        description: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* 성함 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                성함 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="성함을 입력해주세요"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 연락처 */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                연락처 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="010-0000-0000"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 문의 서비스 */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                문의 서비스 <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="서비스를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="방문요양">방문요양</SelectItem>
                  <SelectItem value="가족요양">가족요양</SelectItem>
                  <SelectItem value="입주간병">입주간병</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 문의 내용 */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>문의 내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="문의하실 내용을 자유롭게 작성해주세요"
                  className="resize-none"
                  rows={5}
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            "전송 중..."
          ) : (
            <>
              상담 신청하기
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function ContactFormSkeleton() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
      {/* Name field */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Phone field */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Service select */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Message textarea */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

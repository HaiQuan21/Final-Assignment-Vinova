import type { FieldConfig } from "../constants/formTypes";
import { widthClass } from "../constants/formTypes";

interface FormSkeletonProps {
  fields: FieldConfig[];
}

function FieldSkeleton({ field }: { field: FieldConfig }) {
  // Label skeleton
  const labelSkeleton = (
    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
  );

  if (field.type === "textarea") {
    return (
      <div className="w-full">
        {labelSkeleton}
        <div
          className="w-full animate-pulse rounded border-2 border-gray-100 bg-gray-200"
          style={{ height: `${((field as any).rows ?? 4) * 24 + 24}px` }}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="w-full">
        {labelSkeleton}
        {/* Select có dropdown indicator bên phải */}
        <div className="relative">
          <div className="h-[46px] w-full animate-pulse rounded-xl border-2 border-gray-100 bg-gray-200" />
          <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300" />
        </div>
      </div>
    );
  }

  if (field.type === "toggle") {
    const options = (field as any).options ?? [];
    return (
      <div className="w-full">
        {labelSkeleton}
        {/* Toggle: các button ngang nhau */}
        <div className="flex overflow-hidden rounded-lg border-2 border-gray-100">
          {options.map((_: any, idx: number) => (
            <div
              key={idx}
              className={`h-[46px] flex-1 animate-pulse bg-gray-200 ${
                idx !== 0 ? "border-l-2 border-gray-100" : ""
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div className="w-full">
        {labelSkeleton}
        {/* Date có icon calendar bên phải */}
        <div className="relative">
          <div className="h-[46px] w-full animate-pulse rounded border-2 border-gray-100 bg-gray-200" />
          <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300" />
        </div>
      </div>
    );
  }

  if (field.type === "password") {
    return (
      <div className="w-full">
        {labelSkeleton}
        {/* Password có icon eye bên phải */}
        <div className="relative">
          <div className="h-[46px] w-full animate-pulse rounded border-2 border-gray-100 bg-gray-200" />
          <div className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-300" />
        </div>
      </div>
    );
  }

  // text | email | number | tel — input thường
  return (
    <div className="w-full">
      {labelSkeleton}
      <div className="relative">
        <div className="h-[46px] w-full animate-pulse rounded border-2 border-gray-100 bg-gray-200" />
        {/* maxLength counter */}
        {(field as any).maxLength && (
          <div className="absolute right-4 top-1/2 h-3 w-8 -translate-y-1/2 rounded bg-gray-300" />
        )}
        {/* suffix ($, %) */}
        {(field as any).suffix && (
          <div className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300" />
        )}
      </div>
    </div>
  );
}

function FormSkeleton({ fields }: FormSkeletonProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-5">
        {fields.map((field) => (
          <div key={field.name} className={widthClass[field.width ?? "full"]}>
            <FieldSkeleton field={field} />
          </div>
        ))}
      </div>

      {/* Submit button skeleton */}
      <div className="mt-2 h-[46px] w-full animate-pulse rounded-md bg-gray-200" />
    </div>
  );
}

export default FormSkeleton;
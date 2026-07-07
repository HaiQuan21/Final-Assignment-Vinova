import { useGetDoulaDetailById } from "../hooks/useGetDoulaDetailById";

// ── Tab: Information ─────────────────────────────────────────────────────────
export function InformationTab() {
    const {data, isLoading, fetchDoulaDetailById} = useGetDoulaDetailById()

    return (
      <div className="flex flex-col gap-8 p-4">
        {/* Pictures of service */}
        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Pictures of service
          </h3>
          {data?.photos?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {data.photos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`service-${idx}`}
                  className="h-32 w-32 rounded-lg object-cover"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No photos</p>
          )}
        </div>
  
        {/* Services */}
        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-800">Services</h3>
          {data?.categories?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data?.categories.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700"
                >
                  {s?.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No services</p>
          )}
        </div>
  
        {/* Qualifications */}
        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Qualifications
          </h3>
          {data?.qualifications?.length > 0 ? (
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {data?.qualifications.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No qualification</p>
          )}
        </div>
      </div>
    );
  }
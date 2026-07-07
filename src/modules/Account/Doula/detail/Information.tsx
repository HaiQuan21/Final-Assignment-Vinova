import { mockDoula } from "../DoulaDetail";
// ── Tab: Information ─────────────────────────────────────────────────────────
function InformationTab() {
    return (
      <div className="flex flex-col gap-8 p-4">
        {/* Pictures of service */}
        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Pictures of service
          </h3>
          {mockDoula.photos.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {mockDoula.photos.map((url, idx) => (
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
          {mockDoula.services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {mockDoula.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700"
                >
                  {s}
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
          {mockDoula.qualifications.length > 0 ? (
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {mockDoula.qualifications.map((q, idx) => (
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
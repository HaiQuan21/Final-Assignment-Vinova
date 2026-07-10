import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiPencil } from "react-icons/hi";

import TabBar from "../../../components/Tabbar";
import StatusBadge from "../../../components/StatusBadge";
 import { InformationTab } from "./detail/Information";
 import { PackagesTab } from "./detail/Packages";
 import { ReviewsTab } from "./detail/Reviews";
 import { SubscriptionTab } from "./detail/Subscription";
 import { useGetDoulaDetailById } from "./hooks/useDoula/useGetDoulaDetailById";
 import { formatDate } from "../../../lib/formatDate";

// ── Main: DoulaDetail ────────────────────────────────────────────────────────
function DoulaDetail() {
  const navigate = useNavigate();

  const {data, isLoading} = useGetDoulaDetailById();

  const doula = data;


 if (isLoading) {
  return (
    <div className="flex h-64 items-center justify-center text-gray-400">
      Loading...
    </div>
  );
}

if (!doula) return null;

  return (
    <div className="flex flex-col">
      {/* Back + Edit */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => navigate("/account/doula")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <HiArrowLeft size={18} />
          Back
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-medium text-[#E879A9] transition hover:text-[#d1437f]"
        >
          <HiPencil size={16} />
          Edit
        </button>
      </div>

      {/* Doula info card */}
      <div className="mx-6 mb-4 rounded-xl border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-wrap items-start gap-6">
          {/* Avatar */}
          <img
            src={doula?.user?.picture || "-"}
            alt={doula?.user?.fullName || "-"}
            className="h-16 w-16 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(doula.user.fullName)}&background=3A0099&color=fff`;
            }}
          />

          {/* Info grid */}
          <div className="flex flex-1 flex-wrap gap-x-10 gap-y-3">
            <div>
              <p className="text-xs text-gray-400">Full name</p>
              <p className="font-semibold text-gray-800">{doula.user.fullName || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span className="font-semibold text-gray-800"><StatusBadge status={doula.status || "-"} /></span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="font-semibold text-sm text-gray-700">{doula.user.email || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className=" font-semibold text-sm text-gray-700">{doula.user.phoneNumber || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Birthday</p>
              <p className="font-semibold text-sm text-gray-700">{formatDate (true,doula.user.birthDate) || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p className="font-semibold max-w-xs text-sm text-gray-700">{doula.address.fullAddress || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Business name</p>
              <p className="font-semibold text-sm text-gray-700">{doula.businessName || "-"}</p>
            </div>
            <div className="w-full">
              <p className="text-xs text-gray-400">About Doulas</p>
              <p className="font-semibold text-sm text-gray-700">{doula.description || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TabBar */}
      <div className="mx-6">
        <TabBar
          tabs={[
            { label: "Information", content: <InformationTab /> },
            { label: "Subscription", content: <SubscriptionTab doulaId={doula.id}/> },
            { label: "Packages", content: <PackagesTab doulaId={doula.id}/> },
            { label: "Reviews", content: <ReviewsTab doulaId={doula.id} /> },
          ]}
        />
      </div>
    </div>
  );
}

export default DoulaDetail;
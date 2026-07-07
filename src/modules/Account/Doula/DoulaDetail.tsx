import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiPencil } from "react-icons/hi";
import { HiStar } from "react-icons/hi2";
import TabBar from "../../../components/Tabbar";
import StatusBadge from "../../../components/StatusBadge";
import CommonTable from "../../../components/CommonTable";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../lib/formatDate";

// ── Mock data ────────────────────────────────────────────────────────────────
export const mockDoula = {
  id: "28d8b93d-1b9a-4d2a-9d93-7b4601b9ecca",
  fullName: "Robin Nguyen",
  status: "active",
  email: "robin+111@vinova.com.sg",
  phone: "+61 43545453",
  birthday: "18/03/2007",
  address: "Lot 45 Daymar Road South, DAYMAR QLD 4497",
  businessName: "-",
  aboutDoulas: "-",
  avatar: "https://i.pravatar.cc/80?u=robin",
  photos: [
    "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=200",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
  ],
  services: ["Health care"],
  qualifications: [],
};
 

// ── Main: DoulaDetail ────────────────────────────────────────────────────────
function DoulaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: thay mockDoula bằng data từ useGetDoulaDetailById(id)
  const doula = mockDoula;

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
            src={doula.avatar}
            alt={doula.fullName}
            className="h-16 w-16 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(doula.fullName)}&background=3A0099&color=fff`;
            }}
          />

          {/* Info grid */}
          <div className="flex flex-1 flex-wrap gap-x-10 gap-y-3">
            <div>
              <p className="text-xs text-gray-400">Full name</p>
              <p className="font-semibold text-gray-800">{doula.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span className="font-semibold text-gray-800"><StatusBadge status={doula.status} /></span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="font-semibold text-sm text-gray-700">{doula.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className=" font-semibold text-sm text-gray-700">{doula.phone || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Birthday</p>
              <p className="font-semibold text-sm text-gray-700">{doula.birthday}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p className="font-semibold max-w-xs text-sm text-gray-700">{doula.address || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Business name</p>
              <p className="font-semibold text-sm text-gray-700">{doula.businessName || "-"}</p>
            </div>
            <div className="w-full">
              <p className="text-xs text-gray-400">About Doulas</p>
              <p className="font-semibold text-sm text-gray-700">{doula.aboutDoulas || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TabBar */}
      <div className="mx-6">
        <TabBar
          tabs={[
            { label: "Information", content: <InformationTab /> },
            { label: "Subscription", content: <SubscriptionTab /> },
            { label: "Packages", content: <PackagesTab /> },
            { label: "Reviews", content: <ReviewsTab /> },
          ]}
        />
      </div>
    </div>
  );
}

export default DoulaDetail;
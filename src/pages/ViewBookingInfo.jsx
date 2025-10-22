// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { base_url } from "@/utils/baseurl";
// import { getConfig } from "@/utils/config";

// function ViewBookingInfo() {
//     const { booking_id } = useParams();
//     const [selectedBooking, setSelectedBooking] = useState(null);
//     const [loading, setLoading] = useState(true);

//     console.log("booking_id", booking_id)

//     const fetchBookingDetails = async () => {
//         try {
//             const response = await fetch(
//                 `${base_url}/bookings/properties/property/bookinginfo/${booking_id}`,
//                 getConfig()
//             );
//             const data = await response.json();
//             console.log("data" , data)
//             if (data.status) {
//                 setSelectedBooking(data.data);
//             }
//         } catch (err) {
//             console.error("Failed to fetch booking details:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchBookingDetails();
//     }, [booking_id]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-gray-500">
//                 Loading booking details...
//             </div>
//         );
//     }

//     if (!selectedBooking) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-500">
//                 Failed to load booking details.
//             </div>
//         );
//     }

//     const booking = selectedBooking;

//     return (
//         <div className="min-h-screen bg-gray-50 py-4">
//             <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
//                 <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
//                     Booking Details
//                 </h1>

//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                     {/* <Detail label="Booking ID" value={booking._id} />
//                     <Detail label="Property ID" value={booking.property} /> */}
//                     <Detail label="Booked by" value={booking.tokenPaidBy?.name} />
//                     <Detail label="Email" value={booking.tokenPaidBy?.email} />
//                     <Detail label="Property Type" value={booking.propertyType} />
//                     <Detail label="Priority" value={booking.priority} />
//                     <Detail label="Status" value={booking.bookingStatus} />
//                     <Detail label="Locked" value={booking.isLocked ? "Yes" : "No"} />
//                     <Detail label="Confirmed by Developer" value={booking.confirmedByDeveloper ? "Yes" : "No"} />
//                     <Detail label="Booked At" value={new Date(booking.bookedAt).toLocaleString()} />
//                     <Detail label="Updated At" value={new Date(booking.updatedAt).toLocaleString()} />
//                     <Detail label="Final Payment Status" value={booking.finalPaymentStatus} />
//                     <Detail label="Token Payment Status" value={booking.tokenPaymentStatus} />
//                     <Detail label="Token Amount" value={`₹${booking.tokenAmount}`} />
//                 </div>

//                 {/* Refund Section */}
//                 {booking.refundDetails && (
//                     <div className="mt-6 border-t pt-4">
//                         <h2 className="text-lg font-semibold text-gray-700 mb-2">
//                             Refund Details
//                         </h2>
//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                             <Detail label="Refund ID" value={booking.refundDetails.refundId} />
//                             <Detail label="Refund Amount" value={`₹${booking.refundDetails.refundAmount}`} />
//                             <Detail label="Refund Type" value={booking.refundDetails.refundType} />
//                             <Detail label="Refund Status" value={booking.refundDetails.refundStatus} />
//                             <Detail label="Refund Reason" value={booking.refundDetails.refundReason} />
//                             <Detail
//                                 label="Processed At"
//                                 value={new Date(booking.refundDetails.processedAt).toLocaleString()}
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* Cancellation Section */}
//                 {booking.bookingStatus === "CANCELLED" && (
//                     <div className="mt-6 border-t pt-4">
//                         <h2 className="text-lg font-semibold text-red-600 mb-2">
//                             Cancellation Details
//                         </h2>
//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                             <Detail label="Cancelled At" value={new Date(booking.cancelledAt).toLocaleString()} />
//                             <Detail label="Reason" value={booking.cancellationReason || "-"} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// // Reusable detail row
// const Detail = ({ label, value }) => (
//     <div className="flex flex-col">
//         <span className="text-gray-500 font-medium">{label}</span>
//         <span className="text-gray-900 break-words">{value || "-"}</span>
//     </div>
// );

// export default ViewBookingInfo;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "@/utils/baseurl";
import { getConfig } from "@/utils/config";

function ViewBookingInfo() {
    const { booking_id } = useParams();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBookingDetails = async () => {
        try {
            const response = await fetch(
                `${base_url}/bookings/properties/property/bookinginfo/${booking_id}`,
                getConfig()
            );
            const data = await response.json();
            if (data.status) {
                setSelectedBooking(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch booking details:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookingDetails();
    }, [booking_id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 text-lg font-medium">
                Fetching booking details...
            </div>
        );
    }

    if (!selectedBooking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-red-500 text-lg font-medium">
                Booking details could not be loaded.
            </div>
        );
    }

    const booking = selectedBooking;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-5">
                        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                            Booking Details
                        </h1>
                        <div className="px-4 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            ID: {booking._id?.slice(-6) || "N/A"}
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Detail label="Booked by" value={booking.tokenPaidBy?.name} />
                        <Detail label="Email" value={booking.tokenPaidBy?.email} />
                        <Detail label="Property Type" value={booking.propertyType} />
                        <Detail label="Priority" value={booking.priority} />
                        <Detail label="Status" value={booking.bookingStatus} />
                        <Detail label="Locked" value={booking.isLocked ? "Yes" : "No"} />
                        <Detail
                            label="Confirmed by Developer"
                            value={booking.confirmedByDeveloper ? "Yes" : "No"}
                        />
                        <Detail
                            label="Booked At"
                            value={new Date(booking.bookedAt).toLocaleString()}
                        />
                        <Detail
                            label="Updated At"
                            value={new Date(booking.updatedAt).toLocaleString()}
                        />
                        <Detail
                            label="Final Payment Status"
                            value={booking.finalPaymentStatus}
                        />
                        <Detail
                            label="Token Payment Status"
                            value={booking.tokenPaymentStatus}
                        />
                        <Detail
                            label="Token Amount"
                            value={`₹${booking.tokenAmount?.toLocaleString()}`}
                        />
                    </div>

                    {/* Refund Section */}
                    {booking.refundDetails && (
                        <Section title="Refund Details" color="blue">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Detail label="Refund ID" value={booking.refundDetails.refundId} />
                                <Detail
                                    label="Refund Amount"
                                    value={`₹${booking.refundDetails.refundAmount || ' Not Requested'}`}
                                />
                                <Detail label="Refund Type" value={booking.refundDetails.refundType} />
                                <Detail
                                    label="Refund Status"
                                    value={booking.refundDetails.refundStatus}
                                />
                                <Detail
                                    label="Refund Reason"
                                    value={booking.refundDetails.refundReason}
                                />
                                <Detail
                                    label="Processed At"
                                    value={
                                        new Date(booking.refundDetails.processedAt).toLocaleString()
                                    }
                                />
                            </div>
                        </Section>
                    )}

                    {/* Cancellation Section */}
                    {booking.bookingStatus === "CANCELLED" && (
                        <Section title="Cancellation Details" color="red">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Detail
                                    label="Cancelled At"
                                    value={new Date(booking.cancelledAt).toLocaleString()}
                                />
                                <Detail
                                    label="Reason"
                                    value={booking.cancellationReason || "-"}
                                />
                            </div>
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ───────────────────────────────
   Reusable Detail Row
─────────────────────────────── */
const Detail = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <span className="text-gray-900 text-base font-semibold tracking-tight">
            {value || "-"}
        </span>
    </div>
);

/* ───────────────────────────────
   Section Component (for Refund, Cancel)
─────────────────────────────── */
const Section = ({ title, children, color = "gray" }) => {
    const colorMap = {
        red: "text-red-600 border-red-100 bg-red-50/60",
        blue: "text-blue-600 border-blue-100 bg-blue-50/60",
        gray: "text-gray-700 border-gray-100 bg-gray-50/60",
    };

    return (
        <div
            className={`mt-8 rounded-2xl p-6 border ${colorMap[color]} transition-all duration-200`}
        >
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
};

export default ViewBookingInfo;

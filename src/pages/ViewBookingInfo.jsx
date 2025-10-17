import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "@/utils/baseurl";
import { getConfig } from "@/utils/config";

function ViewBookingInfo() {
    const { booking_id } = useParams();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("booking_id", booking_id)

    const fetchBookingDetails = async () => {
        try {
            const response = await fetch(
                `${base_url}/bookings/properties/property/bookinginfo/${booking_id}`,
                getConfig()
            );
            const data = await response.json();
            console.log("data" , data)
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
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading booking details...
            </div>
        );
    }

    if (!selectedBooking) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Failed to load booking details.
            </div>
        );
    }

    const booking = selectedBooking;

    return (
        <div className="min-h-screen bg-gray-50 py-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                    Booking Details
                </h1>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    {/* <Detail label="Booking ID" value={booking._id} />
                    <Detail label="Property ID" value={booking.property} /> */}
                    <Detail label="Booked by" value={booking.tokenPaidBy?.name} />
                    <Detail label="Email" value={booking.tokenPaidBy?.email} />
                    <Detail label="Property Type" value={booking.propertyType} />
                    <Detail label="Priority" value={booking.priority} />
                    <Detail label="Status" value={booking.bookingStatus} />
                    <Detail label="Locked" value={booking.isLocked ? "Yes" : "No"} />
                    <Detail label="Confirmed by Developer" value={booking.confirmedByDeveloper ? "Yes" : "No"} />
                    <Detail label="Booked At" value={new Date(booking.bookedAt).toLocaleString()} />
                    <Detail label="Updated At" value={new Date(booking.updatedAt).toLocaleString()} />
                    <Detail label="Final Payment Status" value={booking.finalPaymentStatus} />
                    <Detail label="Token Payment Status" value={booking.tokenPaymentStatus} />
                    <Detail label="Token Amount" value={`₹${booking.tokenAmount}`} />
                </div>

                {/* Refund Section */}
                {booking.refundDetails && (
                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                            Refund Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <Detail label="Refund ID" value={booking.refundDetails.refundId} />
                            <Detail label="Refund Amount" value={`₹${booking.refundDetails.refundAmount}`} />
                            <Detail label="Refund Type" value={booking.refundDetails.refundType} />
                            <Detail label="Refund Status" value={booking.refundDetails.refundStatus} />
                            <Detail label="Refund Reason" value={booking.refundDetails.refundReason} />
                            <Detail
                                label="Processed At"
                                value={new Date(booking.refundDetails.processedAt).toLocaleString()}
                            />
                        </div>
                    </div>
                )}

                {/* Cancellation Section */}
                {booking.bookingStatus === "CANCELLED" && (
                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-lg font-semibold text-red-600 mb-2">
                            Cancellation Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <Detail label="Cancelled At" value={new Date(booking.cancelledAt).toLocaleString()} />
                            <Detail label="Reason" value={booking.cancellationReason || "-"} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Reusable detail row
const Detail = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className="text-gray-900 break-words">{value || "-"}</span>
    </div>
);

export default ViewBookingInfo;

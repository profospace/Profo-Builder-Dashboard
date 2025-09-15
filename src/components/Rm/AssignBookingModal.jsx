 // Assign Booking Modal
  const AssignBookingModal = () => {
    if (!showAssignModal || !selectedBooking) return null;

    const suitableRMs = rmList.filter(rm => 
      rm.status === 'ACTIVE' && 
      rm.specialization.includes(selectedBooking.propertyType)
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Assign Booking to RM</h2>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-medium">{selectedBooking.property.title}</h3>
              <p className="text-sm text-gray-600">{selectedBooking.customer.name} • {selectedBooking.propertyType}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select RM</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {suitableRMs.map(rm => (
                  <label key={rm.id} className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="selectedRM" value={rm.id} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{rm.name}</span>
                        <span className="text-xs text-gray-500">{rm.activeBookings} active</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {rm.specialization.join(', ')} • {rm.rating}/5 rating
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Assignment Notes</label>
              <textarea
                rows="2"
                placeholder="Special instructions..."
                className="w-full border rounded px-3 py-2 text-sm resize-none"
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Assign Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AssignBookingModal
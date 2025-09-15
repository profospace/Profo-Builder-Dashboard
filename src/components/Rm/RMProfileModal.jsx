  // RM Profile Modal
  const RMProfileModal = ({ selectedRM, onClose }) => {
  if (!selectedRM) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{selectedRM.name} - Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-6">
          {/* RM Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium w-20">Name:</span>
                  <span>{selectedRM.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium w-20">Role:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {selectedRM.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="font-medium w-16">Email:</span>
                  <span className="text-blue-600">{selectedRM.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="font-medium w-16">Phone:</span>
                  <span>{selectedRM.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="font-medium w-16">Joined:</span>
                  <span>{new Date(selectedRM.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="font-medium w-16">Hours:</span>
                  <span>{selectedRM.workingHours}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded border">
                  <p className="text-2xl font-bold text-blue-600">{selectedRM.activeBookings}</p>
                  <p className="text-xs text-gray-600">Active Bookings</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded border">
                  <p className="text-2xl font-bold text-green-600">{selectedRM.completedVisits}</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded border">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <p className="text-xl font-bold text-yellow-600">{selectedRM.rating}</p>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded border">
                  <p className="text-2xl font-bold text-purple-600">92%</p>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-medium text-green-600">
                    {Math.round((selectedRM.completedVisits / (selectedRM.completedVisits + 5)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Response Time:</span>
                  <span className="font-medium">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Satisfaction:</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
              </div>
            </div>
          </div>
          {/* Specialization */}
          <div>
            <h3 className="font-medium mb-2">Specialization & Expertise</h3>
            <div className="flex gap-2 flex-wrap">
              {selectedRM.specialization.map(spec => (
                <span key={spec} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border">
                  {spec}
                </span>
              ))}
            </div>
          </div>
          {/* Recent Performance */}
          <div>
            <h3 className="font-medium mb-3">Recent Performance (Last 7 Days)</h3>
            <div className="bg-gray-50 rounded border">
              <div className="grid grid-cols-3 gap-4 p-2 bg-gray-100 rounded-t text-xs font-medium text-gray-600">
                <span>Date</span>
                <span className="text-center">Visits</span>
                <span className="text-center">Status</span>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { date: 'Jan 15', visits: 3, status: 'All Completed', color: 'text-green-600' },
                  { date: 'Jan 14', visits: 2, status: 'All Completed', color: 'text-green-600' },
                  { date: 'Jan 13', visits: 4, status: '1 Rescheduled', color: 'text-yellow-600' },
                  { date: 'Jan 12', visits: 2, status: 'All Completed', color: 'text-green-600' },
                  { date: 'Jan 11', visits: 3, status: 'All Completed', color: 'text-green-600' }
                ].map((day, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-2 text-sm hover:bg-gray-50">
                    <span className="font-medium">{day.date}</span>
                    <span className="text-center text-gray-600">{day.visits}</span>
                    <span className={`text-center ${day.color} font-medium`}>{day.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Monthly Goals & Progress */}
          <div>
            <h3 className="font-medium mb-3">Monthly Goals & Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Visits Target</span>
                  <span>{selectedRM.completedVisits}/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(selectedRM.completedVisits/50) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span>95%/90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Assign New Booking
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
              View All Bookings
            </button>
            <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMProfileModal
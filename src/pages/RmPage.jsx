// import React, { useState } from 'react';
// import { 
//   Plus, Users, Calendar, BarChart3, Eye, Edit, Trash2, UserPlus, 
//   Filter, Search, Phone, Mail, MapPin, Clock, Star, TrendingUp, 
//   AlertCircle, CheckCircle, XCircle, User
// } from 'lucide-react';

// const RmPage = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showAddRMModal, setShowAddRMModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [selectedRM, setSelectedRM] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   // Mock data
//   const builderStats = {
//     totalRMs: 8,
//     activeBookings: 23,
//     completedVisits: 156,
//     pendingAssignments: 5
//   };

//   const [rmList, setRmList] = useState([
//     {
//       id: '1',
//       name: 'Rajesh Kumar',
//       email: 'rajesh@example.com',
//       phone: '+91 9876543210',
//       role: 'RM',
//       status: 'ACTIVE',
//       activeBookings: 5,
//       completedVisits: 45,
//       rating: 4.5,
//       joinedDate: '2023-06-15',
//       specialization: ['Residential', 'Luxury'],
//       workingHours: '09:00-18:00'
//     },
//     {
//       id: '2',
//       name: 'Sneha Patel',
//       email: 'sneha@example.com',
//       phone: '+91 8765432109',
//       role: 'SALES_PERSON',
//       status: 'ACTIVE',
//       activeBookings: 3,
//       completedVisits: 32,
//       rating: 4.7,
//       joinedDate: '2023-08-20',
//       specialization: ['Commercial', 'Affordable'],
//       workingHours: '10:00-19:00'
//     },
//     {
//       id: '3',
//       name: 'Amit Singh',
//       email: 'amit@example.com',
//       phone: '+91 7654321098',
//       role: 'TEAM_LEAD',
//       status: 'ACTIVE',
//       activeBookings: 7,
//       completedVisits: 78,
//       rating: 4.8,
//       joinedDate: '2023-03-10',
//       specialization: ['Luxury', 'Commercial'],
//       workingHours: '08:00-17:00'
//     }
//   ]);

//   const unassignedBookings = [
//     {
//       id: '1',
//       property: { title: 'Luxury Apartment', address: 'Bandra West, Mumbai', price: '₹2.5 Cr' },
//       customer: { name: 'Rohit Sharma', phone: '+91 9988776655', email: 'rohit@email.com' },
//       scheduledAt: '2024-01-16T10:00:00',
//       tokenAmount: 100,
//       priority: 'HIGH',
//       propertyType: 'Luxury'
//     },
//     {
//       id: '2',
//       property: { title: 'Modern Villa', address: 'Juhu, Mumbai', price: '₹4.2 Cr' },
//       customer: { name: 'Kavya Menon', phone: '+91 8877665544', email: 'kavya@email.com' },
//       scheduledAt: '2024-01-16T14:30:00',
//       tokenAmount: 100,
//       priority: 'MEDIUM',
//       propertyType: 'Luxury'
//     },
//     {
//       id: '3',
//       property: { title: 'Affordable Housing', address: 'Thane West, Mumbai', price: '₹65 Lakh' },
//       customer: { name: 'Suresh Yadav', phone: '+91 7766554433', email: 'suresh@email.com' },
//       scheduledAt: '2024-01-17T11:00:00',
//       tokenAmount: 100,
//       priority: 'LOW',
//       propertyType: 'Affordable'
//     }
//   ];

//   // Dashboard Overview Component
//   const DashboardOverview = () => (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Total RMs</p>
//               <p className="text-3xl font-bold text-blue-600 mt-2">{builderStats.totalRMs}</p>
//               <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//               <Users className="h-6 w-6 text-blue-600" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Active Bookings</p>
//               <p className="text-3xl font-bold text-orange-600 mt-2">{builderStats.activeBookings}</p>
//               <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
//             </div>
//             <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//               <Calendar className="h-6 w-6 text-orange-600" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Completed Visits</p>
//               <p className="text-3xl font-bold text-green-600 mt-2">{builderStats.completedVisits}</p>
//               <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Pending Assignments</p>
//               <p className="text-3xl font-bold text-red-600 mt-2">{builderStats.pendingAssignments}</p>
//               <p className="text-xs text-red-600 mt-1">↓ 5% from yesterday</p>
//             </div>
//             <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
//               <AlertCircle className="h-6 w-6 text-red-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button
//             onClick={() => setShowAddRMModal(true)}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
//           >
//             <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Add RM</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('bookings')}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group"
//           >
//             <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Assign Bookings</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('performance')}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
//           >
//             <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">View Performance</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('rms')}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group"
//           >
//             <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Manage RMs</span>
//           </button>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="font-semibold text-lg text-gray-900 mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           {[
//             { action: 'New booking assigned to Rajesh Kumar', time: '2 hours ago', type: 'assignment' },
//             { action: 'Sneha Patel completed site visit', time: '4 hours ago', type: 'completion' },
//             { action: 'Amit Singh rescheduled appointment', time: '6 hours ago', type: 'reschedule' },
//             { action: 'New RM added to team', time: '1 day ago', type: 'addition' }
//           ].map((activity, index) => (
//             <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//               <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
//                 activity.type === 'completion' ? 'bg-green-500' :
//                 activity.type === 'assignment' ? 'bg-blue-500' :
//                 activity.type === 'reschedule' ? 'bg-yellow-500' : 'bg-purple-500'
//               }`}></div>
//               <div className="flex-1">
//                 <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
//                 <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // RM Management Component
//   const RMManagement = () => {
//     const filteredRMs = rmList.filter(rm => {
//       const matchesSearch = rm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            rm.email.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFilter = filterStatus === 'all' || rm.status === filterStatus;
//       return matchesSearch && matchesFilter;
//     });

//     return (
//       <div className="space-y-6">
//         {/* Search and Filter */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex gap-4 items-center">
//             <div className="flex-1 relative">
//               <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search RMs by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//               />
//             </div>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             >
//               <option value="all">All Status</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="ON_LEAVE">On Leave</option>
//             </select>
//             <button
//               onClick={() => setShowAddRMModal(true)}
//               className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors"
//             >
//               <Plus className="h-4 w-4" />
//               Add RM
//             </button>
//           </div>
//         </div>

//         {/* RM Cards */}
//         <div className="grid gap-6">
//           {filteredRMs.map(rm => (
//             <div key={rm.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <span className="text-white font-semibold text-sm">{rm.name.charAt(0)}</span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 text-lg">{rm.name}</h3>
//                       <div className="flex items-center gap-2">
//                         <span className={`px-2 py-1 text-xs rounded-full font-medium ${
//                           rm.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
//                           rm.status === 'INACTIVE' ? 'bg-red-100 text-red-700' :
//                           'bg-yellow-100 text-yellow-700'
//                         }`}>
//                           {rm.role}
//                         </span>
//                         <span className="text-xs text-gray-500">ID: RM{rm.id.padStart(4, '0')}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <Mail className="h-4 w-4 text-gray-400" />
//                       <span className="text-gray-600 truncate">{rm.email}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Phone className="h-4 w-4 text-gray-400" />
//                       <span className="text-gray-600">{rm.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4 text-gray-400" />
//                       <span className="text-gray-600">{rm.activeBookings} active bookings</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-gray-600">{rm.rating}/5 rating</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => {
//                       setSelectedRM(rm);
//                       setShowProfileModal(true);
//                     }}
//                     className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 border border-blue-200 transition-colors font-medium"
//                   >
//                     <Eye className="h-4 w-4" />
//                   </button>
//                   <button className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors font-medium">
//                     <Edit className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//                 <div className="flex gap-6 text-sm">
//                   <span className="text-gray-600">Completed: <span className="font-semibold text-gray-900">{rm.completedVisits}</span></span>
//                   <span className="text-gray-600">Specialization: <span className="font-semibold text-gray-900">{rm.specialization.join(', ')}</span></span>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Joined: {new Date(rm.joinedDate).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Booking Assignment Component
//   const BookingAssignment = () => (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h3 className="font-semibold text-lg text-gray-900">Unassigned Bookings</h3>
//             <p className="text-sm text-gray-600 mt-1">Manage and assign pending booking requests</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
//               {unassignedBookings.length} pending assignments
//             </span>
//             <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 font-medium transition-colors">
//               Auto Assign
//             </button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {unassignedBookings.map(booking => (
//             <div key={booking.id} className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h4 className="font-semibold text-gray-900 text-lg">{booking.property.title}</h4>
//                     <span className={`px-3 py-1 text-xs rounded-full font-medium ${
//                       booking.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
//                       booking.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
//                       'bg-green-100 text-green-700'
//                     }`}>
//                       {booking.priority} PRIORITY
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                     <div className="space-y-2">
//                       <p className="text-gray-600"><span className="font-medium">Customer:</span> {booking.customer.name}</p>
//                       <p className="text-gray-600"><span className="font-medium">Phone:</span> {booking.customer.phone}</p>
//                     </div>
//                     <div className="space-y-2">
//                       <p className="text-gray-600 flex items-center gap-2">
//                         <MapPin className="h-4 w-4" />
//                         {booking.property.address}
//                       </p>
//                       <p className="text-gray-600"><span className="font-medium">Price:</span> {booking.property.price}</p>
//                     </div>
//                     <div className="space-y-2">
//                       <p className="text-gray-600 flex items-center gap-2">
//                         <Clock className="h-4 w-4" />
//                         {new Date(booking.scheduledAt).toLocaleString()}
//                       </p>
//                       <p className="text-gray-600"><span className="font-medium">Type:</span> {booking.propertyType}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setSelectedBooking(booking);
//                     setShowAssignModal(true);
//                   }}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors"
//                 >
//                   Assign RM
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Performance Dashboard Component
//   const PerformanceDashboard = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Top Performers */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-lg text-gray-900 mb-4">Top Performers (This Month)</h3>
//           <div className="space-y-4">
//             {rmList
//               .sort((a, b) => b.rating - a.rating)
//               .slice(0, 3)
//               .map((rm, index) => (
//                 <div key={rm.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
//                     index === 0 ? 'bg-yellow-100 text-yellow-700' :
//                     index === 1 ? 'bg-gray-100 text-gray-700' :
//                     'bg-orange-100 text-orange-700'
//                   }`}>
//                     {index + 1}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900">{rm.name}</p>
//                     <p className="text-sm text-gray-600">{rm.completedVisits} visits • {rm.rating}/5 rating</p>
//                   </div>
//                   <TrendingUp className="h-5 w-5 text-green-600" />
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Team Statistics */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-lg text-gray-900 mb-4">Team Statistics</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Average Rating</span>
//               <span className="font-bold text-lg text-gray-900">
//                 {(rmList.reduce((sum, rm) => sum + rm.rating, 0) / rmList.length).toFixed(1)}/5
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Total Active Bookings</span>
//               <span className="font-bold text-lg text-gray-900">
//                 {rmList.reduce((sum, rm) => sum + rm.activeBookings, 0)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Total Completed Visits</span>
//               <span className="font-bold text-lg text-gray-900">
//                 {rmList.reduce((sum, rm) => sum + rm.completedVisits, 0)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Team Utilization</span>
//               <span className="font-bold text-lg text-green-600">87%</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Performance Chart */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="font-semibold text-lg text-gray-900 mb-6">Weekly Performance Trends</h3>
//         <div className="h-64 flex items-end justify-between gap-3 bg-gray-50 rounded-lg p-4">
//           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
//             const visits = Math.floor(Math.random() * 20) + 5;
//             const maxVisits = 25;
//             const height = (visits / maxVisits) * 100;

//             return (
//               <div key={day} className="flex flex-col items-center flex-1">
//                 <div 
//                   className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-full min-h-2 transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer"
//                   style={{ height: `${height}%` }}
//                   title={`${day}: ${visits} visits`}
//                 />
//                 <span className="text-sm text-gray-600 mt-2 font-medium">{day}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );

//   // Add RM Modal
//   const AddRMModal = () => {
//     if (!showAddRMModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-lg w-full max-h-90vh overflow-y-auto shadow-2xl">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Add New RM</h2>
//               <button 
//                 onClick={() => setShowAddRMModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input 
//                   type="text" 
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Enter full name"
//                   defaultValue={`Anurag-${Date.now()}`}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input 
//                   type="email" 
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Enter email address"
//                   defaultValue={`anurag-${Date.now()}@gmail.com`}

//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                 <input 
//                   type="tel" 
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Enter phone number"
//                   defaultValue={`${Number(Date.now())}`}

//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
//                 <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
//                   <option value="">Select Role</option>
//                   <option value="RM">RM</option>
//                   <option value="SALES_PERSON">Sales Person</option>
//                   <option value="TEAM_LEAD">Team Lead</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {['Residential', 'Commercial', 'Luxury', 'Affordable'].map(spec => (
//                     <label key={spec} className="flex items-center gap-2">
//                       <input type="checkbox" className="rounded" />
//                       <span className="text-sm">{spec}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-4 border-t border-gray-100">
//               <button 
//                 onClick={() => setShowAddRMModal(false)}
//                 className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors">
//                 Add RM
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // RM Profile Modal
//   const RMProfileModal = () => {
//     if (!showProfileModal || !selectedRM) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-3xl w-full max-h-90vh overflow-y-auto shadow-2xl">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">{selectedRM.name} - Profile</h2>
//               <button
//                 onClick={() => setShowProfileModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//           <div className="p-6 space-y-6">
//             {/* RM Basic Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Personal Information
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <span className="font-medium w-20 text-gray-600">Name:</span>
//                     <span className="text-gray-900">{selectedRM.name}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="font-medium w-20 text-gray-600">Role:</span>
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
//                       {selectedRM.role}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Mail className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Email:</span>
//                     <span className="text-blue-600">{selectedRM.email}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Phone:</span>
//                     <span className="text-gray-900">{selectedRM.phone}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Joined:</span>
//                     <span className="text-gray-900">{new Date(selectedRM.joinedDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Hours:</span>
//                     <span className="text-gray-900">{selectedRM.workingHours}</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5" />
//                   Performance Stats
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
//                     <p className="text-2xl font-bold text-blue-600">{selectedRM.activeBookings}</p>
//                     <p className="text-xs text-gray-600 mt-1">Active Bookings</p>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
//                     <p className="text-2xl font-bold text-green-600">{selectedRM.completedVisits}</p>
//                     <p className="text-xs text-gray-600 mt-1">Completed</p>
//                   </div>
//                   <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
//                     <div className="flex items-center justify-center gap-1">
//                       <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                       <p className="text-xl font-bold text-yellow-600">{selectedRM.rating}</p>
//                     </div>
//                     <p className="text-xs text-gray-600 mt-1">Rating</p>
//                   </div>
//                   <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
//                     <p className="text-2xl font-bold text-purple-600">92%</p>
//                     <p className="text-xs text-gray-600 mt-1">Success Rate</p>
//                   </div>
//                 </div>
//                 {/* Quick Stats */}
//                 <div className="mt-4 space-y-3 text-sm">
//                   <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Conversion Rate:</span>
//                     <span className="font-semibold text-green-600">
//                       {Math.round((selectedRM.completedVisits / (selectedRM.completedVisits + 5)) * 100)}%
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Avg. Response Time:</span>
//                     <span className="font-semibold">2.3 hours</span>
//                   </div>
//                   <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-600">Customer Satisfaction:</span>
//                     <span className="font-semibold text-green-600">95%</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Specialization */}
//             <div>
//               <h3 className="font-semibold text-lg mb-3">Specialization & Expertise</h3>
//               <div className="flex gap-2 flex-wrap">
//                 {selectedRM.specialization.map(spec => (
//                   <span key={spec} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-xl border font-medium">
//                     {spec}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             {/* Recent Performance */}
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Recent Performance (Last 7 Days)</h3>
//               <div className="bg-gray-50 rounded-xl border overflow-hidden">
//                 <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-600">
//                   <span>Date</span>
//                   <span className="text-center">Visits</span>
//                   <span className="text-center">Status</span>
//                 </div>
//                 <div className="divide-y divide-gray-200">
//                   {[
//                     { date: 'Jan 15', visits: 3, status: 'All Completed', color: 'text-green-600' },
//                     { date: 'Jan 14', visits: 2, status: 'All Completed', color: 'text-green-600' },
//                     { date: 'Jan 13', visits: 4, status: '1 Rescheduled', color: 'text-yellow-600' },
//                     { date: 'Jan 12', visits: 2, status: 'All Completed', color: 'text-green-600' },
//                     { date: 'Jan 11', visits: 3, status: 'All Completed', color: 'text-green-600' }
//                   ].map((day, index) => (
//                     <div key={index} className="grid grid-cols-3 gap-4 p-4 text-sm hover:bg-white transition-colors">
//                       <span className="font-medium">{day.date}</span>
//                       <span className="text-center text-gray-600">{day.visits}</span>
//                       <span className={`text-center ${day.color} font-medium`}>{day.status}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {/* Monthly Goals & Progress */}
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Monthly Goals & Progress</h3>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="font-medium">Visits Target</span>
//                     <span className="text-gray-600">{selectedRM.completedVisits}/50</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-3">
//                     <div
//                       className="bg-blue-600 h-3 rounded-full transition-all"
//                       style={{ width: `${(selectedRM.completedVisits/50) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="font-medium">Customer Satisfaction</span>
//                     <span className="text-gray-600">95%/90%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-3">
//                     <div className="bg-green-600 h-3 rounded-full transition-all" style={{ width: '95%' }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Action Buttons */}
//             <div className="flex gap-3 pt-6 border-t border-gray-100">
//               <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
//                 Assign New Booking
//               </button>
//               <button className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium">
//                 View All Bookings
//               </button>
//               <button className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium">
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Assign Booking Modal
//   const AssignBookingModal = () => {
//     if (!showAssignModal || !selectedBooking) return null;

//     const suitableRMs = rmList.filter(rm => 
//       rm.status === 'ACTIVE' && 
//       rm.specialization.includes(selectedBooking.propertyType)
//     );

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Assign Booking to RM</h2>
//               <button 
//                 onClick={() => setShowAssignModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             <div className="bg-gray-50 p-4 rounded-xl">
//               <h3 className="font-semibold text-gray-900">{selectedBooking.property.title}</h3>
//               <p className="text-sm text-gray-600 mt-1">{selectedBooking.customer.name} • {selectedBooking.propertyType}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Select RM</label>
//               <div className="space-y-3 max-h-48 overflow-y-auto">
//                 {suitableRMs.map(rm => (
//                   <label key={rm.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
//                     <input type="radio" name="selectedRM" value={rm.id} className="text-blue-600" />
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-white font-semibold text-sm">{rm.name.charAt(0)}</span>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <span className="font-semibold text-gray-900">{rm.name}</span>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{rm.activeBookings} active</span>
//                       </div>
//                       <div className="text-sm text-gray-600 mt-1">
//                         {rm.specialization.join(', ')} • {rm.rating}/5 rating
//                       </div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Notes</label>
//               <textarea
//                 rows="3"
//                 placeholder="Add special instructions or notes for the RM..."
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div className="flex gap-3 pt-4 border-t border-gray-100">
//               <button
//                 onClick={() => setShowAssignModal(false)}
//                 className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors">
//                 Assign Booking
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Navigation Tabs */}
//         <div className="flex gap-1 mb-8 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
//           {[
//             { key: 'overview', label: 'Overview', icon: BarChart3 },
//             { key: 'rms', label: 'Manage RMs', icon: Users },
//             { key: 'bookings', label: 'Assign Bookings', icon: Calendar },
//             { key: 'performance', label: 'Performance', icon: TrendingUp }
//           ].map(tab => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
//                   activeTab === tab.key
//                     ? 'bg-blue-600 text-white shadow-md'
//                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 {tab.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'overview' && <DashboardOverview />}
//         {activeTab === 'rms' && <RMManagement />}
//         {activeTab === 'bookings' && <BookingAssignment />}
//         {activeTab === 'performance' && <PerformanceDashboard />}
//       </div>

//       {/* Modals */}
//       <AddRMModal />
//       <AssignBookingModal showAssignModal={showAssignModal}/>
//       <RMProfileModal />
//     </div>
//   );
// };

// export default RmPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Plus, Users, Calendar, BarChart3, Eye, Edit, Trash2, UserPlus,
//   Filter, Search, Phone, Mail, MapPin, Clock, Star, TrendingUp,
//   AlertCircle, CheckCircle, XCircle, User, Loader
// } from 'lucide-react';
// import { base_url } from '../utils/baseurl';


// const RmPage = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showAddRMModal, setShowAddRMModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [selectedRM, setSelectedRM] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // State for real data
//   const [builderStats, setBuilderStats] = useState({
//     totalRMs: 0,
//     activeBookings: 0,
//     completedVisits: 0,
//     pendingAssignments: 0
//   });
//   const [rmList, setRmList] = useState([]);
//   const [unassignedBookings, setUnassignedBookings] = useState([]);
//   const [assignedBookings, setAssignedBookings] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       const userObj = JSON.parse(user);
//       return userObj.token;
//     }
//     return null;
//   };

//   // Axios instance with auth header
//   const api = axios.create({
//     baseURL: base_url,
//     headers: {
//       'Authorization': `Bearer ${getAuthToken()}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   // API Functions
//   const fetchAllRMs = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/rm/all');
//       if (response.data.success) {
//         const rms = response.data.data.rms.map(rm => ({
//           id: rm._id,
//           name: rm.name,
//           email: rm.email,
//           phone: rm.phone,
//           role: rm.role,
//           status: rm.status,
//           activeBookings: rm.activeBookingsCount || 0,
//           completedVisits: rm.performance?.completedVisits || 0,
//           rating: rm.performance?.averageRating || 4.5,
//           joinedDate: rm.dateOfJoining || rm.createdAt,
//           specialization: rm.specialization || ['General'],
//           workingHours: '09:00-18:00',
//           employeeId: rm.employeeId
//         }));
//         setRmList(rms);

//         // Update stats
//         setBuilderStats(prev => ({
//           ...prev,
//           totalRMs: rms.length,
//           activeBookings: rms.reduce((sum, rm) => sum + rm.activeBookings, 0),
//           completedVisits: rms.reduce((sum, rm) => sum + rm.completedVisits, 0)
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching RMs:', error);
//       setError('Failed to fetch RMs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUnassignedBookings = async () => {
//     try {
//       // This would be a custom endpoint for unassigned bookings
//       // For now, we'll use a placeholder since the exact endpoint isn't in the provided code
//       const response = await api.get('/bookings/unassigned-bookings');
//       if (response.data.success) {
//         setUnassignedBookings(response.data.data.bookings || []);
//         setBuilderStats(prev => ({
//           ...prev,
//           pendingAssignments: response.data.data.bookings?.length || 0
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching unassigned bookings:', error);
//       // Set dummy data as fallback
//       setUnassignedBookings([
//         {
//           id: '1',
//           property: { title: 'Luxury Apartment', address: 'Bandra West, Mumbai', price: '₹2.5 Cr' },
//           customer: { name: 'Rohit Sharma', phone: '+91 9988776655', email: 'rohit@email.com' },
//           scheduledAt: '2024-01-16T10:00:00',
//           tokenAmount: 100,
//           priority: 'HIGH',
//           propertyType: 'Luxury'
//         }
//       ]);
//     }
//   };

//   const fetchAssignedBookings = async () => {
//     try {
//       // This would be a custom endpoint for unassigned bookings
//       // For now, we'll use a placeholder since the exact endpoint isn't in the provided code
//       const response = await api.get('/bookings/assigned-bookings');
//       if (response.data.success) {
//         setAssignedBookings(response.data.data.bookings || []);
//         // setBuilderStats(prev => ({
//         //   ...prev,
//         //   pendingAssignments: response.data.data.bookings?.length || 0
//         // }));
//       }
//     } catch (error) {
//       console.error('Error fetching unassigned bookings:', error);
//       // Set dummy data as fallback
//       setUnassignedBookings([
//         {
//           id: '1',
//           property: { title: 'Luxury Apartment', address: 'Bandra West, Mumbai', price: '₹2.5 Cr' },
//           customer: { name: 'Rohit Sharma', phone: '+91 9988776655', email: 'rohit@email.com' },
//           scheduledAt: '2024-01-16T10:00:00',
//           tokenAmount: 100,
//           priority: 'HIGH',
//           propertyType: 'Luxury'
//         }
//       ]);
//     }
//   };

//   const fetchLeaderboard = async () => {
//     try {
//       const response = await api.get('/rm/leaderboard?period=month');
//       if (response.data.success) {
//         setLeaderboard(response.data.data.leaderboard || []);
//       }
//     } catch (error) {
//       console.error('Error fetching leaderboard:', error);
//     }
//   };

//   const createRM = async (rmData) => {
//     try {
//       setLoading(true);
//       const response = await api.post('/rm/create', rmData);
//       if (response.data.success) {
//         setShowAddRMModal(false);
//         fetchAllRMs(); // Refresh the list
//         alert('RM created successfully!');
//       }
//     } catch (error) {
//       console.error('Error creating RM:', error);
//       setError('Failed to create RM');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const assignBookingToRM = async (bookingId, rmId, notes) => {
//     console.log("bookingId" , bookingId)
//     try {
//       setLoading(true);
//       const response = await api.post(`/bookings/assign-booking`, {
//         rmId,
//         bookingId,
//         notes
//       });
//       if (response.data.success) {
//         setShowAssignModal(false);
//         fetchUnassignedBookings(); // Refresh bookings
//         fetchAllRMs(); // Refresh RMs
//         alert('Booking assigned successfully!');
//       }
//     } catch (error) {
//       console.error('Error assigning booking:', error);
//       setError('Failed to assign booking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getRMPerformance = async (rmId) => {
//     try {
//       const response = await api.get(`/rm/${rmId}/performance?period=month`);
//       if (response.data.success) {
//         return response.data.data.performance;
//       }
//     } catch (error) {
//       console.error('Error fetching RM performance:', error);
//     }
//     return null;
//   };

//   // Load data on component mount
//   useEffect(() => {
//     const token = getAuthToken();
//     if (!token) {
//       setError('No authentication token found. Please login.');
//       return;
//     }

//     fetchAllRMs();
//     fetchUnassignedBookings();
//     fetchAssignedBookings()
//     fetchLeaderboard();
//   }, []);

//   // Dashboard Overview Component
//   const DashboardOverview = () => (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Total RMs</p>
//               <p className="text-3xl font-bold text-blue-600 mt-2">{builderStats.totalRMs}</p>
//               <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//               <Users className="h-6 w-6 text-blue-600" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Active Bookings</p>
//               <p className="text-3xl font-bold text-orange-600 mt-2">{builderStats.activeBookings}</p>
//               <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
//             </div>
//             <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//               <Calendar className="h-6 w-6 text-orange-600" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Completed Visits</p>
//               <p className="text-3xl font-bold text-green-600 mt-2">{builderStats.completedVisits}</p>
//               <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 font-medium">Pending Assignments</p>
//               <p className="text-3xl font-bold text-red-600 mt-2">{builderStats.pendingAssignments}</p>
//               <p className="text-xs text-red-600 mt-1">↓ 5% from yesterday</p>
//             </div>
//             <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
//               <AlertCircle className="h-6 w-6 text-red-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button
//             onClick={() => setShowAddRMModal(true)}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
//           >
//             <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Add RM</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('bookings')}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group"
//           >
//             <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Assign Bookings</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('performance')}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
//           >
//             <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">View Performance</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('rms')}
//             className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group"
//           >
//             <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Manage RMs</span>
//           </button>
//         </div>
//       </div>

//       {/* Recent Activity - You can fetch this from a specific endpoint */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="font-semibold text-lg text-gray-900 mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           {[
//             { action: 'New RM added to team', time: '2 hours ago', type: 'addition' },
//             { action: 'Booking assigned successfully', time: '4 hours ago', type: 'assignment' },
//             { action: 'Site visit completed', time: '6 hours ago', type: 'completion' },
//             { action: 'Appointment rescheduled', time: '1 day ago', type: 'reschedule' }
//           ].map((activity, index) => (
//             <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//               <div className={`w-3 h-3 rounded-full flex-shrink-0 ${activity.type === 'completion' ? 'bg-green-500' :
//                   activity.type === 'assignment' ? 'bg-blue-500' :
//                     activity.type === 'reschedule' ? 'bg-yellow-500' : 'bg-purple-500'
//                 }`}></div>
//               <div className="flex-1">
//                 <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
//                 <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // RM Management Component
//   const RMManagement = () => {
//     const filteredRMs = rmList.filter(rm => {
//       const matchesSearch = rm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         rm.email.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFilter = filterStatus === 'all' || rm.status === filterStatus;
//       return matchesSearch && matchesFilter;
//     });

//     if (loading && rmList.length === 0) {
//       return (
//         <div className="flex items-center justify-center h-64">
//           <Loader className="h-8 w-8 animate-spin text-blue-600" />
//           <span className="ml-2 text-gray-600">Loading RMs...</span>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         {/* Search and Filter */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex gap-4 items-center">
//             <div className="flex-1 relative">
//               <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search RMs by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//               />
//             </div>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             >
//               <option value="all">All Status</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="ON_LEAVE">On Leave</option>
//             </select>
//             <button
//               onClick={() => setShowAddRMModal(true)}
//               disabled={loading}
//               className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
//             >
//               {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
//               Add RM
//             </button>
//           </div>
//         </div>

//         {/* RM Cards */}
//         <div className="grid gap-6">
//           {filteredRMs.map(rm => (
//             <div key={rm.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <span className="text-white font-semibold text-sm">{rm.name.charAt(0)}</span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 text-lg">{rm.name}</h3>
//                       <div className="flex items-center gap-2">
//                         <span className={`px-2 py-1 text-xs rounded-full font-medium ${rm.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
//                             rm.status === 'INACTIVE' ? 'bg-red-100 text-red-700' :
//                               'bg-yellow-100 text-yellow-700'
//                           }`}>
//                           {rm.role}
//                         </span>
//                         {rm.employeeId && (
//                           <span className="text-xs text-gray-500">ID: {rm.employeeId}</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <Mail className="h-4 w-4 text-gray-400" />
//                       <span className="text-gray-600 truncate">{rm.email}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Phone className="h-4 w-4 text-gray-400" />
//                       <span className="text-gray-600">{rm.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4 text-gray-400" />
//                       <span className="text-gray-600">{rm.activeBookings} active bookings</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-gray-600">{rm.rating.toFixed(1)}/5 rating</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => {
//                       setSelectedRM(rm);
//                       setShowProfileModal(true);
//                     }}
//                     className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 border border-blue-200 transition-colors font-medium"
//                   >
//                     <Eye className="h-4 w-4" />
//                   </button>
//                   <button className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors font-medium">
//                     <Edit className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//                 <div className="flex gap-6 text-sm">
//                   <span className="text-gray-600">Completed: <span className="font-semibold text-gray-900">{rm.completedVisits}</span></span>
//                   <span className="text-gray-600">Specialization: <span className="font-semibold text-gray-900">{rm.specialization.join(', ')}</span></span>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Joined: {new Date(rm.joinedDate).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredRMs.length === 0 && !loading && (
//           <div className="text-center py-12">
//             <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No RMs found</p>
//             <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Booking Assignment Component
//   const BookingAssignment = () => (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h3 className="font-semibold text-lg text-gray-900">Unassigned Bookings</h3>
//             <p className="text-sm text-gray-600 mt-1">Manage and assign pending booking requests</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
//               {unassignedBookings.length} pending assignments
//             </span>
//             <button
//               onClick={fetchUnassignedBookings}
//               disabled={loading}
//               className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 font-medium transition-colors disabled:opacity-50"
//             >
//               {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Refresh'}
//             </button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {unassignedBookings.map(booking => (
//             <div key={booking.id} className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h4 className="font-semibold text-gray-900 text-lg">{booking.property.title}</h4>
//                     <span className={`px-3 py-1 text-xs rounded-full font-medium ${booking.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
//                         booking.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
//                           'bg-green-100 text-green-700'
//                       }`}>
//                       {booking.priority} PRIORITY
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                     <div className="space-y-2">
//                       <p className="text-gray-600"><span className="font-medium">Customer:</span> {booking?.customer?.name}</p>
//                       <p className="text-gray-600"><span className="font-medium">Phone:</span> {booking?.customer?.phone}</p>
//                     </div>
//                     <div className="space-y-2">
//                       <p className="text-gray-600 flex items-center gap-2">
//                         <MapPin className="h-4 w-4" />
//                         {booking.property.address}
//                       </p>
//                       <p className="text-gray-600"><span className="font-medium">Price:</span> {booking.property.price}</p>
//                     </div>
//                     <div className="space-y-2">
//                       <p className="text-gray-600 flex items-center gap-2">
//                         <Clock className="h-4 w-4" />
//                         {new Date(booking.scheduledAt).toLocaleString()}
//                       </p>
//                       <p className="text-gray-600"><span className="font-medium">Type:</span> {booking.propertyType}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setSelectedBooking(booking);
//                     setShowAssignModal(true);
//                   }}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors"
//                 >
//                   Assign RM
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {unassignedBookings.length === 0 && (
//           <div className="text-center py-12">
//             <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No unassigned bookings</p>
//             <p className="text-gray-400 text-sm">All bookings have been assigned to RMs</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Performance Dashboard Component
//   const PerformanceDashboard = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Top Performers */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-lg text-gray-900 mb-4">Top Performers (This Month)</h3>
//           <div className="space-y-4">
//             {leaderboard.length > 0 ? leaderboard
//               .slice(0, 3)
//               .map((rm, index) => (
//                 <div key={rm._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
//                       index === 1 ? 'bg-gray-100 text-gray-700' :
//                         'bg-orange-100 text-orange-700'
//                     }`}>
//                     {index + 1}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900">{rm.name}</p>
//                     <p className="text-sm text-gray-600">{rm.completedVisits} visits • {rm.averageRating?.toFixed(1) || 'N/A'}/5 rating</p>
//                   </div>
//                   <TrendingUp className="h-5 w-5 text-green-600" />
//                 </div>
//               )) :
//               rmList
//                 .sort((a, b) => b.rating - a.rating)
//                 .slice(0, 3)
//                 .map((rm, index) => (
//                   <div key={rm.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
//                         index === 1 ? 'bg-gray-100 text-gray-700' :
//                           'bg-orange-100 text-orange-700'
//                       }`}>
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-900">{rm.name}</p>
//                       <p className="text-sm text-gray-600">{rm.completedVisits} visits • {rm.rating}/5 rating</p>
//                     </div>
//                     <TrendingUp className="h-5 w-5 text-green-600" />
//                   </div>
//                 ))}
//           </div>
//         </div>

//         {/* Team Statistics */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-lg text-gray-900 mb-4">Team Statistics</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Average Rating</span>
//               <span className="font-bold text-lg text-gray-900">
//                 {rmList.length > 0 ? (rmList.reduce((sum, rm) => sum + rm.rating, 0) / rmList.length).toFixed(1) : '0'}/5
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Total Active Bookings</span>
//               <span className="font-bold text-lg text-gray-900">
//                 {rmList.reduce((sum, rm) => sum + rm.activeBookings, 0)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Total Completed Visits</span>
//               <span className="font-bold text-lg text-gray-900">
//                 {rmList.reduce((sum, rm) => sum + rm.completedVisits, 0)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="text-sm text-gray-600 font-medium">Team Utilization</span>
//               <span className="font-bold text-lg text-green-600">
//                 {rmList.length > 0 ? Math.round((rmList.filter(rm => rm.status === 'ACTIVE').length / rmList.length) * 100) : 0}%
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Performance Chart */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="font-semibold text-lg text-gray-900 mb-6">Weekly Performance Trends</h3>
//         <div className="h-64 flex items-end justify-between gap-3 bg-gray-50 rounded-lg p-4">
//           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
//             const visits = Math.floor(Math.random() * 20) + 5;
//             const maxVisits = 25;
//             const height = (visits / maxVisits) * 100;

//             return (
//               <div key={day} className="flex flex-col items-center flex-1">
//                 <div
//                   className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-full min-h-2 transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer"
//                   style={{ height: `${height}%` }}
//                   title={`${day}: ${visits} visits`}
//                 />
//                 <span className="text-sm text-gray-600 mt-2 font-medium">{day}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );

//   // Add RM Modal
//   const AddRMModal = () => {
//     const [formData, setFormData] = useState({
//       name: '',
//       email: '',
//       phone: '',
//       role: '',
//       specialization: []
//     });

//     const handleSubmit = async (e) => {
//       e.preventDefault();

//       if (!formData.name || !formData.email || !formData.phone || !formData.role) {
//         setError('Please fill all required fields');
//         return;
//       }

//       await createRM(formData);
//     };

//     const handleSpecializationChange = (spec, checked) => {
//       if (checked) {
//         setFormData(prev => ({
//           ...prev,
//           specialization: [...prev.specialization, spec]
//         }));
//       } else {
//         setFormData(prev => ({
//           ...prev,
//           specialization: prev.specialization.filter(s => s !== spec)
//         }));
//       }
//     };

//     if (!showAddRMModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-lg w-full max-h-90vh overflow-y-auto shadow-2xl">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Add New RM</h2>
//               <button
//                 onClick={() => setShowAddRMModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Enter full name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Enter email address"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
//                 <input
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
//                 <select
//                   required
//                   value={formData.role}
//                   onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 >
//                   <option value="">Select Role</option>
//                   <option value="RM">RM</option>
//                   <option value="SALES_PERSON">Sales Person</option>
//                   <option value="TEAM_LEAD">Team Lead</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {['Residential', 'Commercial', 'Luxury', 'Affordable'].map(spec => (
//                     <label key={spec} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         className="rounded"
//                         checked={formData.specialization.includes(spec)}
//                         onChange={(e) => handleSpecializationChange(spec, e.target.checked)}
//                       />
//                       <span className="text-sm">{spec}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={() => setShowAddRMModal(false)}
//                 className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
//                 Add RM
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   // RM Profile Modal
//   const RMProfileModal = () => {
//     if (!showProfileModal || !selectedRM) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-3xl w-full max-h-90vh overflow-y-auto shadow-2xl">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">{selectedRM.name} - Profile</h2>
//               <button
//                 onClick={() => setShowProfileModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//           <div className="p-6 space-y-6">
//             {/* RM Basic Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Personal Information
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <span className="font-medium w-20 text-gray-600">Name:</span>
//                     <span className="text-gray-900">{selectedRM.name}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="font-medium w-20 text-gray-600">Role:</span>
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
//                       {selectedRM.role}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Mail className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Email:</span>
//                     <span className="text-blue-600">{selectedRM.email}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Phone:</span>
//                     <span className="text-gray-900">{selectedRM.phone}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Joined:</span>
//                     <span className="text-gray-900">{new Date(selectedRM.joinedDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium w-16 text-gray-600">Hours:</span>
//                     <span className="text-gray-900">{selectedRM.workingHours}</span>
//                   </div>
//                   {selectedRM.employeeId && (
//                     <div className="flex items-center gap-3">
//                       <span className="font-medium w-16 text-gray-600">ID:</span>
//                       <span className="text-gray-900">{selectedRM.employeeId}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5" />
//                   Performance Stats
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
//                     <p className="text-2xl font-bold text-blue-600">{selectedRM.activeBookings}</p>
//                     <p className="text-xs text-gray-600 mt-1">Active Bookings</p>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
//                     <p className="text-2xl font-bold text-green-600">{selectedRM.completedVisits}</p>
//                     <p className="text-xs text-gray-600 mt-1">Completed</p>
//                   </div>
//                   <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
//                     <div className="flex items-center justify-center gap-1">
//                       <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                       <p className="text-xl font-bold text-yellow-600">{selectedRM.rating}</p>
//                     </div>
//                     <p className="text-xs text-gray-600 mt-1">Rating</p>
//                   </div>
//                   <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
//                     <p className="text-2xl font-bold text-purple-600">92%</p>
//                     <p className="text-xs text-gray-600 mt-1">Success Rate</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Specialization */}
//             <div>
//               <h3 className="font-semibold text-lg mb-3">Specialization & Expertise</h3>
//               <div className="flex gap-2 flex-wrap">
//                 {selectedRM.specialization.map(spec => (
//                   <span key={spec} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-xl border font-medium">
//                     {spec}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3 pt-6 border-t border-gray-100">
//               <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
//                 Assign New Booking
//               </button>
//               <button className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium">
//                 View All Bookings
//               </button>
//               <button className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium">
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Assign Booking Modal
//   const AssignBookingModal = () => {
//     const [selectedRMId, setSelectedRMId] = useState('');
//     const [notes, setNotes] = useState('');

//     const handleAssign = async (e) => {
//       e.preventDefault();
//       if (!selectedRMId) {
//         setError('Please select an RM');
//         return;
//       }
//       await assignBookingToRM(selectedBooking?._id, selectedRMId, notes);
//     };

//     if (!showAssignModal || !selectedBooking) return null;

//     const suitableRMs = rmList.filter(rm =>
//       rm.status === 'ACTIVE' &&
//       (rm.specialization.includes(selectedBooking.propertyType) || rm.specialization.includes('General'))
//     );

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Assign Booking to RM</h2>
//               <button
//                 onClick={() => setShowAssignModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//           </div>

//           <form onSubmit={handleAssign} className="p-6 space-y-6">
//             <div className="bg-gray-50 p-4 rounded-xl">
//               <h3 className="font-semibold text-gray-900">{selectedBooking?.property?.title}</h3>
//               <p className="text-sm text-gray-600 mt-1">{selectedBooking?.customer?.name} • {selectedBooking?.propertyType}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Select RM</label>
//               <div className="space-y-3 max-h-48 overflow-y-auto">
//                 {suitableRMs.map(rm => (
//                   <label key={rm.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
//                     <input
//                       type="radio"
//                       name="selectedRM"
//                       value={rm.id}
//                       checked={selectedRMId === rm.id}
//                       onChange={(e) => setSelectedRMId(e.target.value)}
//                       className="text-blue-600"
//                     />
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-white font-semibold text-sm">{rm.name.charAt(0)}</span>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <span className="font-semibold text-gray-900">{rm.name}</span>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{rm.activeBookings} active</span>
//                       </div>
//                       <div className="text-sm text-gray-600 mt-1">
//                         {rm.specialization.join(', ')} • {rm.rating}/5 rating
//                       </div>
//                     </div>
//                   </label>
//                 ))}
//               </div>

//               {suitableRMs.length === 0 && (
//                 <p className="text-gray-500 text-sm text-center py-4">No suitable RMs available</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Notes</label>
//               <textarea
//                 rows="3"
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Add special instructions or notes for the RM..."
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="flex gap-3 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={() => setShowAssignModal(false)}
//                 className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading || !selectedRMId}
//                 className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
//                 Assign Booking
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {error && (
//           <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
//             {error}
//           </div>
//         )}

//         {/* Navigation Tabs */}
//         <div className="flex gap-1 mb-8 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
//           {[
//             { key: 'overview', label: 'Overview', icon: BarChart3 },
//             { key: 'rms', label: 'Manage RMs', icon: Users },
//             { key: 'bookings', label: 'Bookings', icon: Calendar },
//             { key: 'performance', label: 'Performance', icon: TrendingUp }
//           ].map(tab => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === tab.key
//                     ? 'bg-blue-600 text-white shadow-md'
//                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                   }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 {tab.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'overview' && <DashboardOverview />}
//         {activeTab === 'rms' && <RMManagement />}
//         {activeTab === 'bookings' && <BookingAssignment />}
//         {activeTab === 'performance' && <PerformanceDashboard />}
//       </div>

//       {/* Modals */}
//       <AddRMModal />
//       <AssignBookingModal />
//       <RMProfileModal />
//     </div>
//   );
// };

// export default RmPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus, Users, Calendar, BarChart3, Eye, Edit, Trash2, UserPlus,
  Filter, Search, Phone, Mail, MapPin, Clock, Star, TrendingUp,
  AlertCircle, CheckCircle, XCircle, User, Loader, ChevronRight,
  Activity, CalendarDays, FileText,
  SectionIcon,
  Copy,
  Check
} from 'lucide-react';
import { base_url } from '../utils/baseurl';
import { useNavigate } from 'react-router-dom';

const RmPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingSubTab, setBookingSubTab] = useState('unassigned');
  const [showAddRMModal, setShowAddRMModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedRM, setSelectedRM] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate()


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // State for real data
  const [builderStats, setBuilderStats] = useState({
    totalRMs: 0,
    activeBookings: 0,
    completedVisits: 0,
    pendingAssignments: 0
  });
  const [rmList, setRmList] = useState([]);
  const [unassignedBookings, setUnassignedBookings] = useState([]);
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Get auth token from localStorage
  const getAuthToken = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.token;
    }
    return null;
  };

  // Axios instance with auth header
  const api = axios.create({
    baseURL: base_url,
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });

  // Helper function to format dates properly
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Filter bookings by date range
  const filterBookingsByDate = (bookings, dateField = 'createdAt') => {
    if (!dateFilter.from && !dateFilter.to) return bookings;

    return bookings.filter(booking => {
      const bookingDate = new Date(booking[dateField]);
      if (isNaN(bookingDate.getTime())) return false;

      let matchesFrom = true;
      let matchesTo = true;

      if (dateFilter.from) {
        const fromDate = new Date(dateFilter.from);
        matchesFrom = bookingDate >= fromDate;
      }

      if (dateFilter.to) {
        const toDate = new Date(dateFilter.to);
        toDate.setHours(23, 59, 59, 999); // End of day
        matchesTo = bookingDate <= toDate;
      }

      return matchesFrom && matchesTo;
    });
  };

  // API Functions
  const fetchAllRMs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/rm/all');
      if (response.data.success) {
        const rms = response.data.data.rms.map(rm => ({
          id: rm._id,
          name: rm.name,
          email: rm.email,
          password: rm.password,
          phone: rm.phone,
          role: rm.role,
          status: rm.status,
          activeBookings: rm.activeBookingsCount || 0,
          completedVisits: rm.performance?.completedVisits || 0,
          rating: rm.performance?.averageRating || 4.5,
          joinedDate: rm.dateOfJoining || rm.createdAt,
          specialization: rm.specialization || ['General'],
          workingHours: '09:00-18:00',
          employeeId: rm.employeeId
        }));
        setRmList(rms);

        setBuilderStats(prev => ({
          ...prev,
          totalRMs: rms.length,
          activeBookings: rms.reduce((sum, rm) => sum + rm.activeBookings, 0),
          completedVisits: rms.reduce((sum, rm) => sum + rm.completedVisits, 0)
        }));
      }
    } catch (error) {
      console.error('Error fetching RMs:', error);
      setError('Failed to fetch RMs');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnassignedBookings = async () => {
    try {
      const response = await api.get('/bookings/unassigned-bookings');
      if (response.data.success) {
        setUnassignedBookings(response.data.data.bookings || []);
        setBuilderStats(prev => ({
          ...prev,
          pendingAssignments: response.data.data.bookings?.length || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching unassigned bookings:', error);
      setUnassignedBookings([
        {
          id: '1',
          property: { post_title: 'Luxury Apartment', address: 'Bandra West, Mumbai', price: 47100000 },
          tokenPaidBy: { name: 'Rohit Sharma', phone: '+91 9988776655', email: 'rohit@email.com' },
          siteVisitScheduledAt: '2024-01-16T10:00:00.000Z',
          tokenAmount: 100,
          priority: 'HIGH',
          propertyType: 'Luxury',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const fetchAssignedBookings = async () => {
    try {
      const response = await api.get('/bookings/assigned-bookings');
      if (response.data.success) {
        setAssignedBookings(response.data.data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching assigned bookings:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/rm/leaderboard?period=month');
      if (response.data.success) {
        setLeaderboard(response.data.data.leaderboard || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const createRM = async (rmData) => {
    try {
      setLoading(true);
      const response = await api.post('/rm/create', rmData);
      if (response.data.success) {
        setShowAddRMModal(false);
        fetchAllRMs();
        alert('RM created successfully!');
      }
    } catch (error) {
      console.error('Error creating RM:', error);
      setError('Failed to create RM');
    } finally {
      setLoading(false);
    }
  };

  const assignBookingToRM = async (bookingId, rmId, notes) => {
    try {
      setLoading(true);
      const response = await api.post(`/bookings/assign-booking`, {
        rmId,
        bookingId,
        notes
      });
      if (response.data.success) {
        setShowAssignModal(false);
        fetchUnassignedBookings();
        fetchAssignedBookings();
        fetchAllRMs();
        alert('Booking assigned successfully!');
      }
    } catch (error) {
      console.error('Error assigning booking:', error);
      setError('Failed to assign booking');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError('No authentication token found. Please login.');
      return;
    }

    fetchAllRMs();
    fetchUnassignedBookings();
    fetchAssignedBookings();
    fetchLeaderboard();
  }, []);

  const handleCopy = (password) => {
    // if (!rm.password) return;

    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 sec
    });
  };

  // Date Filter Component
  const DateFilterComponent = () => (
    <div className="flex gap-4 items-center bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <CalendarDays className="h-4 w-4" />
        Filter by Date:
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">From:</label>
          <input
            type="date"
            value={dateFilter.from}
            onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">To:</label>
          <input
            type="date"
            value={dateFilter.to}
            onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <button
          onClick={() => setDateFilter({ from: '', to: '' })}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );

  // Unassigned Bookings Component
  const UnassignedBookings = () => {
    const filteredBookings = filterBookingsByDate(unassignedBookings, 'createdAt');
    console.log("filteredBookings", filteredBookings)

    return (
      <div className="space-y-4">
        {filteredBookings.map(booking => (
          <div key={booking._id || booking.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {booking.property?.post_title || booking.property?.title}
                  </h4>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${booking.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                      booking.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                    {booking.priority} PRIORITY
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Customer:</span> {booking.tokenPaidBy?.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span> {booking.tokenPaidBy?.phone}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {booking.tokenPaidBy?.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {booking.property?.address}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Price:</span> ₹{booking.property?.price?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Token:</span> ₹{booking.tokenAmount}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Scheduled: {formatDateTime(booking.siteVisitScheduledAt)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Type:</span> {booking.propertyType}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Created:</span> {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowAssignModal(true);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  Assign RM
                </button>
                <button
                  onClick={() => {
                    navigate(`/user/bookings/${booking?.tokenPaidBy?._id}`);
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-gray-900 text-sm font-medium transition-colors"
                >
                  User Summary
                </button>
                {/* <button
                  onClick={() => {
                    navigate(`/user/search-history/${booking?.tokenPaidBy?._id}`);
                  }}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-gray-900 text-sm font-medium transition-colors"
                >
                  User Searches
                </button> */}
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No unassigned bookings found</p>
            <p className="text-gray-400 text-sm">All bookings have been assigned or no bookings match your filter</p>
          </div>
        )}
      </div>
    );
  };

  // Assigned Bookings Component
  const AssignedBookings = () => {
    const filteredBookings = filterBookingsByDate(assignedBookings, 'assignedAt');

    const getStatusColor = (status) => {
      switch (status) {
        case 'COMPLETED':
          return 'bg-green-100 text-green-700';
        case 'SCHEDULED':
          return 'bg-blue-100 text-blue-700';
        case 'MISSED':
          return 'bg-red-100 text-red-700';
        case 'IN_PROGRESS':
          return 'bg-yellow-100 text-yellow-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    };

    return (
      <div className="space-y-4">
        {filteredBookings.map(booking => (
          <div key={booking._id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {booking.property?.post_title}
                  </h4>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(booking.visitStatus)}`}>
                    {booking.visitStatus}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${booking.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                      booking.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                    {booking.priority}
                  </span>
                  <button
                    onClick={() => {
                      navigate(`/user/bookings/${booking?.tokenPaidBy?._id}`);
                    }}
                    className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-gray-900 text-sm font-medium transition-colors"
                  >
                    User Summary
                  </button>
                </div>
                

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Customer:</span> {booking.tokenPaidBy?.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span> {booking.tokenPaidBy?.phone}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">RM:</span> {booking.assignedRM?.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">RM Phone:</span> {booking.assignedRM?.phone}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Assigned:</span> {formatDate(booking.assignedAt)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Visit Date:</span> {formatDateTime(booking.siteVisitScheduledAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Price:</span> ₹{booking.property?.price?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Token:</span> ₹{booking.tokenAmount}
                    </p>
                  </div>
                  
                </div>

                {booking.visitDetails && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Duration:</span>
                        <p className="text-gray-600">{booking.visitDetails.duration} mins</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Interest:</span>
                        <p className="text-gray-600">{booking.visitDetails.customerInterest}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Rating:</span>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {booking.visitDetails.rmRating}/5
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Follow-up:</span>
                        <p className="text-gray-600">
                          {booking.visitDetails.followUpRequired ?
                            `Required - ${formatDate(booking.visitDetails.followUpDate)}` :
                            'Not Required'
                          }
                        </p>
                      </div>
                    </div>
                    {booking.visitDetails.visitNotes && (
                      <div className="mt-2">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="text-gray-600 mt-1">{booking.visitDetails.visitNotes}</p>
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No assigned bookings found</p>
            <p className="text-gray-400 text-sm">No bookings match your current filter criteria</p>
          </div>
        )}
      </div>
    );
  };

  // RM Activity Component
  const RMActivity = () => {
    const getAllActivities = () => {
      const activities = [];

      assignedBookings.forEach(booking => {
        // Add assignment activity
        activities.push({
          id: `assign-${booking._id}`,
          type: 'ASSIGNMENT',
          booking: booking,
          rmName: booking.assignedRM?.name,
          timestamp: booking.assignedAt,
          description: `Booking assigned to ${booking.assignedRM?.name}`,
          property: booking.property?.post_title,
          customer: booking.tokenPaidBy?.name
        });

        // Add RM actions
        if (booking.rmActions && booking.rmActions.length > 0) {
          booking.rmActions.forEach(action => {
            activities.push({
              id: `action-${action._id}`,
              type: 'RM_ACTION',
              booking: booking,
              action: action.action,
              rmName: booking.assignedRM?.name,
              timestamp: action.performedAt,
              description: `${action.action} - ${action.reason || 'No reason provided'}`,
              property: booking.property?.post_title,
              customer: booking.tokenPaidBy?.name,
              metadata: action.metadata
            });
          });
        }
      });

      return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    const allActivities = getAllActivities();
    const filteredActivities = filterBookingsByDate(allActivities, 'timestamp');

    const getActivityIcon = (type) => {
      switch (type) {
        case 'ASSIGNMENT':
          return <UserPlus className="h-4 w-4 text-blue-600" />;
        case 'RM_ACTION':
          return <Activity className="h-4 w-4 text-green-600" />;
        default:
          return <FileText className="h-4 w-4 text-gray-600" />;
      }
    };

    const getActivityColor = (type) => {
      switch (type) {
        case 'ASSIGNMENT':
          return 'border-blue-200 bg-blue-50';
        case 'RM_ACTION':
          return 'border-green-200 bg-green-50';
        default:
          return 'border-gray-200 bg-gray-50';
      }
    };

    return (
      <div className="space-y-4">
        {filteredActivities.map(activity => (
          <div key={activity.id} className={`border rounded-xl p-6 ${getActivityColor(activity.type)} transition-colors`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{activity.description}</h4>
                  <span className="text-sm text-gray-500">{formatDateTime(activity.timestamp)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Property:</span>
                    <p className="text-gray-600">{activity.property}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Customer:</span>
                    <p className="text-gray-600">{activity.customer}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">RM:</span>
                    <p className="text-gray-600">{activity.rmName}</p>
                  </div>
                </div>

                {activity.metadata && (
                  <div className="mt-3 p-3 bg-white rounded-lg border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {activity.metadata.visitStatus && (
                        <div>
                          <span className="font-medium text-gray-700">Status:</span>
                          <p className="text-gray-600">{activity.metadata.visitStatus}</p>
                        </div>
                      )}
                      {activity.metadata.customerInterest && (
                        <div>
                          <span className="font-medium text-gray-700">Interest:</span>
                          <p className="text-gray-600">{activity.metadata.customerInterest}</p>
                        </div>
                      )}
                      {activity.metadata.duration && (
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <p className="text-gray-600">{activity.metadata.duration} mins</p>
                        </div>
                      )}
                      {activity.metadata.rating && (
                        <div>
                          <span className="font-medium text-gray-700">Rating:</span>
                          <p className="text-gray-600 flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            {activity.metadata.rating}/5
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No RM activities found</p>
            <p className="text-gray-400 text-sm">No activities match your current filter criteria</p>
          </div>
        )}
      </div>
    );
  };

  // // Dashboard Overview Component
  // const DashboardOverview = () => (
  //   <div className="space-y-6">
  //     {/* Stats Cards */}
  //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-sm text-gray-600 font-medium">Total RMs</p>
  //             <p className="text-3xl font-bold text-blue-600 mt-2">{builderStats.totalRMs}</p>
  //             <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
  //           </div>
  //           <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
  //             <Users className="h-6 w-6 text-blue-600" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-sm text-gray-600 font-medium">Active Bookings</p>
  //             <p className="text-3xl font-bold text-orange-600 mt-2">{builderStats.activeBookings}</p>
  //             <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
  //           </div>
  //           <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
  //             <Calendar className="h-6 w-6 text-orange-600" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-sm text-gray-600 font-medium">Completed Visits</p>
  //             <p className="text-3xl font-bold text-green-600 mt-2">{builderStats.completedVisits}</p>
  //             <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
  //           </div>
  //           <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
  //             <CheckCircle className="h-6 w-6 text-green-600" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <p className="text-sm text-gray-600 font-medium">Pending Assignments</p>
  //             <p className="text-3xl font-bold text-red-600 mt-2">{builderStats.pendingAssignments}</p>
  //             <p className="text-xs text-red-600 mt-1">↓ 5% from yesterday</p>
  //           </div>
  //           <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
  //             <AlertCircle className="h-6 w-6 text-red-600" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Quick Actions */}
  //     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  //       <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Actions</h3>
  //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //         <button
  //           onClick={() => setShowAddRMModal(true)}
  //           className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
  //         >
  //           <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
  //           <span className="font-medium">Add RM</span>
  //         </button>
  //         <button
  //           onClick={() => setActiveTab('bookings')}
  //           className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group"
  //         >
  //           <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
  //           <span className="font-medium">Assign Bookings</span>
  //         </button>
  //         <button
  //           onClick={() => setActiveTab('performance')}
  //           className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
  //         >
  //           <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform" />
  //           <span className="font-medium">View Performance</span>
  //         </button>
  //         <button
  //           onClick={() => setActiveTab('rms')}
  //           className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group"
  //         >
  //           <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
  //           <span className="font-medium">Manage RMs</span>
  //         </button>
  //       </div>
  //     </div>

  //     {/* Recent Activity */}
  //     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  //       <h3 className="font-semibold text-lg text-gray-900 mb-4">Recent Activity</h3>
  //       <div className="space-y-4">
  //         {[
  //           { action: 'New RM added to team', time: '2 hours ago', type: 'addition' },
  //           { action: 'Booking assigned successfully', time: '4 hours ago', type: 'assignment' },
  //           { action: 'Site visit completed', time: '6 hours ago', type: 'completion' },
  //           { action: 'Appointment rescheduled', time: '1 day ago', type: 'reschedule' }
  //         ].map((activity, index) => (
  //           <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
  //             <div className={`w-3 h-3 rounded-full flex-shrink-0 ${activity.type === 'completion' ? 'bg-green-500' :
  //                 activity.type === 'assignment' ? 'bg-blue-500' :
  //                   activity.type === 'reschedule' ? 'bg-yellow-500' : 'bg-purple-500'
  //               }`}></div>
  //             <div className="flex-1">
  //               <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
  //               <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );


  const DashboardOverview = () => {
    return (
      <div className="py-2 space-y-8 min-h-screen">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Pending Assignments */}
          <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Pending Assignments</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{builderStats.pendingAssignments}</p>
                <div className="flex items-center text-xs text-red-600">
                  <span>↓ 5% from yesterday</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Active Bookings */}
          <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{builderStats.activeBookings}</p>
                <div className="flex items-center text-xs text-green-600">
                  <span>↑ 8% from last week</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Completed Visits */}
          <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Completed Visits</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{builderStats.completedVisits}</p>
                <div className="flex items-center text-xs text-green-600">
                  <span>↑ 15% from last month</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Total RMs */}
          <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Total RMs</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{builderStats.totalRMs}</p>
                <div className="flex items-center text-xs text-blue-600">
                  <span>↑ 12% from last month</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        {/* <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Quick actions — make the most common tasks reachable from anywhere.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAddRMModal(true)}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg border border-blue-200 transition-colors duration-200"
            >
              Add RM
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Assign Bookings
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              View Performance
            </button>
            <button
              onClick={() => setActiveTab('rms')}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Manage RMs
            </button>
          </div>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-gray-500 hover:text-gray-700">All activity</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { action: 'New RM added to team', time: '2 hours ago', type: 'addition', color: 'bg-purple-500' },
                  { action: 'Booking assigned successfully', time: '4 hours ago', type: 'assignment', color: 'bg-blue-500' },
                  { action: 'Site visit completed', time: '6 hours ago', type: 'completion', color: 'bg-green-500' },
                  { action: 'Appointment rescheduled', time: '1 day ago', type: 'reschedule', color: 'bg-yellow-500' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">10 tasks due</span>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View</button>
                </div>
              </div>
            </div>

            {/* Shortcuts Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shortcuts</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2 hover:bg-gray-50 rounded transition-colors">
                  Assign next booking
                </button>
                <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-2 hover:bg-gray-50 rounded transition-colors">
                  Invite RM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  // RM Management Component
  const RMManagement = () => {
    const filteredRMs = rmList.filter(rm => {
      const matchesSearch = rm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rm.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || rm.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    if (loading && rmList.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading RMs...</span>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search RMs by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ON_LEAVE">On Leave</option>
            </select>
            <button
              onClick={() => setShowAddRMModal(true)}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add RM
            </button>
          </div>
        </div>

        {/* RM Cards */}
        <div className="grid gap-6">
          {filteredRMs.map(rm => (
            <div key={rm.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{rm.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{rm.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${rm.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                          rm.status === 'INACTIVE' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {rm.role}
                        </span>
                        {rm.employeeId && (
                          <span className="text-xs text-gray-500">ID: {rm.employeeId}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 truncate">{rm.email}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <SectionIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{rm.password}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <SectionIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{rm.password}</span>

                      <button
                        onClick={() => handleCopy(rm.password)}
                        className="ml-2 p-1 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        title={copied ? "Copied!" : "Copy password"}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{rm.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{rm.activeBookings} active bookings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600">{rm.rating.toFixed(1)}/5 rating</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedRM(rm);
                      setShowProfileModal(true);
                    }}
                    className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 border border-blue-200 transition-colors font-medium"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors font-medium">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex gap-6 text-sm">
                  <span className="text-gray-600">Completed: <span className="font-semibold text-gray-900">{rm.completedVisits}</span></span>
                  <span className="text-gray-600">Specialization: <span className="font-semibold text-gray-900">{rm.specialization.join(', ')}</span></span>
                </div>
                <div className="text-sm text-gray-500">
                  Joined: {formatDate(rm.joinedDate)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRMs.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No RMs found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Booking Assignment Component with 3 sub-tabs
  const BookingAssignment = () => (
    <div className="space-y-6">
      {/* Date Filter */}
      <DateFilterComponent />

      {/* Sub-tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setBookingSubTab('unassigned')}
            className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 ${bookingSubTab === 'unassigned'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <AlertCircle className="h-4 w-4" />
            Unassigned Bookings ({unassignedBookings.length})
          </button>
          <button
            onClick={() => setBookingSubTab('assigned')}
            className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 ${bookingSubTab === 'assigned'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <CheckCircle className="h-4 w-4" />
            Assigned Bookings ({assignedBookings.length})
          </button>
          <button
            onClick={() => setBookingSubTab('activity')}
            className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 ${bookingSubTab === 'activity'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <Activity className="h-4 w-4" />
            RM Activity
          </button>
        </div>

        <div className="p-6">
          {bookingSubTab === 'unassigned' && <UnassignedBookings />}
          {bookingSubTab === 'assigned' && <AssignedBookings />}
          {bookingSubTab === 'activity' && <RMActivity />}
        </div>
      </div>
    </div>
  );

  // Performance Dashboard Component
  const PerformanceDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Top Performers (This Month)</h3>
          <div className="space-y-4">
            {leaderboard.length > 0 ? leaderboard
              .slice(0, 3)
              .map((rm, index) => (
                <div key={rm._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{rm.name}</p>
                    <p className="text-sm text-gray-600">{rm.completedVisits} visits • {rm.averageRating?.toFixed(1) || 'N/A'}/5 rating</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              )) :
              rmList
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((rm, index) => (
                  <div key={rm.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{rm.name}</p>
                      <p className="text-sm text-gray-600">{rm.completedVisits} visits • {rm.rating}/5 rating</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                ))}
          </div>
        </div>

        {/* Team Statistics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Team Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Average Rating</span>
              <span className="font-bold text-lg text-gray-900">
                {rmList.length > 0 ? (rmList.reduce((sum, rm) => sum + rm.rating, 0) / rmList.length).toFixed(1) : '0'}/5
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Total Active Bookings</span>
              <span className="font-bold text-lg text-gray-900">
                {rmList.reduce((sum, rm) => sum + rm.activeBookings, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Total Completed Visits</span>
              <span className="font-bold text-lg text-gray-900">
                {rmList.reduce((sum, rm) => sum + rm.completedVisits, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 font-medium">Team Utilization</span>
              <span className="font-bold text-lg text-green-600">
                {rmList.length > 0 ? Math.round((rmList.filter(rm => rm.status === 'ACTIVE').length / rmList.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg text-gray-900 mb-6">Weekly Performance Trends</h3>
        <div className="h-64 flex items-end justify-between gap-3 bg-gray-50 rounded-lg p-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const visits = Math.floor(Math.random() * 20) + 5;
            const maxVisits = 25;
            const height = (visits / maxVisits) * 100;

            return (
              <div key={day} className="flex flex-col items-center flex-1">
                <div
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-full min-h-2 transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`${day}: ${visits} visits`}
                />
                <span className="text-sm text-gray-600 mt-2 font-medium">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Add RM Modal
  const AddRMModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      role: '',
      specialization: []
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.name || !formData.email || !formData.phone || !formData.role) {
        setError('Please fill all required fields');
        return;
      }

      await createRM(formData);
    };

    const handleSpecializationChange = (spec, checked) => {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          specialization: [...prev.specialization, spec]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          specialization: prev.specialization.filter(s => s !== spec)
        }));
      }
    };

    if (!showAddRMModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-90vh overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Add New RM</h2>
              <button
                onClick={() => setShowAddRMModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="RM">RM</option>
                  <option value="SALES_PERSON">Sales Person</option>
                  <option value="TEAM_LEAD">Team Lead</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Residential', 'Commercial', 'Luxury', 'Affordable'].map(spec => (
                    <label key={spec} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={formData.specialization.includes(spec)}
                        onChange={(e) => handleSpecializationChange(spec, e.target.checked)}
                      />
                      <span className="text-sm">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowAddRMModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
                Add RM
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // RM Profile Modal
  const RMProfileModal = () => {
    if (!showProfileModal || !selectedRM) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-90vh overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{selectedRM.name} - Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* RM Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium w-20 text-gray-600">Name:</span>
                    <span className="text-gray-900">{selectedRM.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium w-20 text-gray-600">Role:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      {selectedRM.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium w-16 text-gray-600">Email:</span>
                    <span className="text-blue-600">{selectedRM.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="font-medium w-16 text-gray-600">Phone:</span>
                    <span className="text-gray-900">{selectedRM.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium w-16 text-gray-600">Joined:</span>
                    <span className="text-gray-900">{formatDate(selectedRM.joinedDate)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium w-16 text-gray-600">Hours:</span>
                    <span className="text-gray-900">{selectedRM.workingHours}</span>
                  </div>
                  {selectedRM.employeeId && (
                    <div className="flex items-center gap-3">
                      <span className="font-medium w-16 text-gray-600">ID:</span>
                      <span className="text-gray-900">{selectedRM.employeeId}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-2xl font-bold text-blue-600">{selectedRM.activeBookings}</p>
                    <p className="text-xs text-gray-600 mt-1">Active Bookings</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-2xl font-bold text-green-600">{selectedRM.completedVisits}</p>
                    <p className="text-xs text-gray-600 mt-1">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <p className="text-xl font-bold text-yellow-600">{selectedRM.rating}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Rating</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <p className="text-2xl font-bold text-purple-600">92%</p>
                    <p className="text-xs text-gray-600 mt-1">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialization */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Specialization & Expertise</h3>
              <div className="flex gap-2 flex-wrap">
                {selectedRM.specialization.map(spec => (
                  <span key={spec} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-xl border font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-100">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Assign New Booking
              </button>
              <button className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium">
                View All Bookings
              </button>
              <button className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Assign Booking Modal
  const AssignBookingModal = () => {
    const [selectedRMId, setSelectedRMId] = useState('');
    const [notes, setNotes] = useState('');

    const handleAssign = async (e) => {
      e.preventDefault();
      if (!selectedRMId) {
        setError('Please select an RM');
        return;
      }
      await assignBookingToRM(selectedBooking?._id, selectedRMId, notes);
    };

    if (!showAssignModal || !selectedBooking) return null;

    const suitableRMs = rmList.filter(rm =>
      rm.status === 'ACTIVE' &&
      (rm.specialization.includes(selectedBooking.propertyType) || rm.specialization.includes('General'))
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Assign Booking to RM</h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleAssign} className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900">
                {selectedBooking?.property?.post_title || selectedBooking?.property?.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedBooking?.tokenPaidBy?.name} • {selectedBooking?.propertyType}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select RM</label>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {suitableRMs.map(rm => (
                  <label key={rm.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="selectedRM"
                      value={rm.id}
                      checked={selectedRMId === rm.id}
                      onChange={(e) => setSelectedRMId(e.target.value)}
                      className="text-blue-600"
                    />
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{rm.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{rm.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{rm.activeBookings} active</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {rm.specialization.join(', ')} • {rm.rating}/5 rating
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {suitableRMs.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No suitable RMs available</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Notes</label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add special instructions or notes for the RM..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !selectedRMId}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
                Assign Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-1  bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-2">
          {/* {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'rms', label: 'Manage RMs', icon: Users },
            { key: 'bookings', label: 'Bookings', icon: Calendar },
            { key: 'performance', label: 'Performance', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })} */}

          {/* Quick Actions Section */}
          <div className="space-y-4">
            {/* <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Quick actions — make the most common tasks reachable from anywhere.</p>
            </div> */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAddRMModal(true)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg border border-blue-200 transition-colors duration-200"
              >
                Add RM
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Assign Bookings
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                View Performance
              </button>
              <button
                onClick={() => setActiveTab('rms')}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Manage RMs
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <DashboardOverview />}
        {activeTab === 'rms' && <RMManagement />}
        {activeTab === 'bookings' && <BookingAssignment />}
        {activeTab === 'performance' && <PerformanceDashboard />}
      </div>

      {/* Modals */}
      <AddRMModal />
      <AssignBookingModal />
      <RMProfileModal />
    </div>
  );
};

export default RmPage;


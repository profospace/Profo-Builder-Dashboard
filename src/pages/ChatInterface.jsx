// import { useEffect , useState , useRef} from "react";
// import {
//     MessageCircle,
//     User,
//     Clock,
//     Star,
//     Filter,
//     Search,
//     ChevronDown,
//     Phone,
//     Mail,
//     MapPin,
//     Calendar,
//     TrendingUp,
//     Eye,
//     CheckCircle,
//     Home,
//     BarChart3,
//     Settings,
//     LogOut,
//     Bell,
//     Plus,
//     Edit,
//     Send,
//     Paperclip,
//     FileImage,
//     X,
//     ArrowLeft,
//     MoreVertical
// } from 'lucide-react';
// import { base_url } from "@/utils/baseurl";
// // ===== BUILDER MAIN DASHBOARD =====

// const ChatInterface = () => {
//     const [activeTab, setActiveTab] = useState('conversations');
//     const [builderData, setBuilderData] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = JSON.parse(localStorage.getItem('user')).token;

//         const data = localStorage.getItem('builderData');

//         if (token && data) {
//             setBuilderData(JSON.parse(data));
//             setIsAuthenticated(true);
//         }
//     }, []);

//     const handleLogin = (data) => {
//         setBuilderData(data.builder);
//         setIsAuthenticated(true);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('builderToken');
//         localStorage.removeItem('builderData');
//         setIsAuthenticated(false);
//         setBuilderData(null);
//     };



//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <header className="bg-white shadow-sm border-b border-gray-200">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center py-4">
//                         <div className="flex items-center space-x-4">
//                             <img
//                                 src={builderData?.logo || '/default-logo.png'}
//                                 alt="Builder Logo"
//                                 className="h-10 w-10 rounded-full object-cover"
//                             />
//                             <div>
//                                 <h1 className="text-xl font-semibold text-gray-900">
//                                     {builderData?.company || builderData?.name}
//                                 </h1>
//                                 <p className="text-sm text-gray-500">Builder Portal</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center space-x-4">
//                             <button className="p-2 text-gray-400 hover:text-gray-600">
//                                 <Bell className="h-6 w-6" />
//                             </button>
//                             <button
//                                 onClick={handleLogout}
//                                 className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
//                             >
//                                 <LogOut className="h-5 w-5" />
//                                 <span>Logout</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Navigation */}
//             <nav className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex space-x-8">
//                         <button
//                             onClick={() => setActiveTab('conversations')}
//                             className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'conversations'
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700'
//                                 }`}
//                         >
//                             <div className="flex items-center space-x-2">
//                                 <MessageCircle className="h-5 w-5" />
//                                 <span>Conversations</span>
//                             </div>
//                         </button>

//                         <button
//                             onClick={() => setActiveTab('properties')}
//                             className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'properties'
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700'
//                                 }`}
//                         >
//                             <div className="flex items-center space-x-2">
//                                 <Home className="h-5 w-5" />
//                                 <span>Properties</span>
//                             </div>
//                         </button>

//                         <button
//                             onClick={() => setActiveTab('analytics')}
//                             className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700'
//                                 }`}
//                         >
//                             <div className="flex items-center space-x-2">
//                                 <BarChart3 className="h-5 w-5" />
//                                 <span>Analytics</span>
//                             </div>
//                         </button>

//                         <button
//                             onClick={() => setActiveTab('profile')}
//                             className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700'
//                                 }`}
//                         >
//                             <div className="flex items-center space-x-2">
//                                 <Settings className="h-5 w-5" />
//                                 <span>Profile</span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//                 {activeTab === 'conversations' && <ConversationsTab />}
//                 {activeTab === 'properties' && <PropertiesTab />}
//                 {activeTab === 'analytics' && <AnalyticsTab />}
//                 {activeTab === 'profile' && <ProfileTab builderData={builderData} />}
//             </main>
//         </div>
//     );
// };

// // ===== CONVERSATIONS TAB =====

// const ConversationsTab = () => {
//     const [conversations, setConversations] = useState([]);
//     const [stats, setStats] = useState({});
//     const [selectedConversation, setSelectedConversation] = useState(null);
//     const [filters, setFilters] = useState({
//         status: 'ACTIVE',
//         leadStatus: '',
//         search: '',
//         priority: ''
//     });
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         loadConversations();
//     }, [filters]);

//     const loadConversations = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const params = new URLSearchParams({
//                 page: 1,
//                 limit: 20,
//                 ...filters
//             });

//             const response = await fetch(`${base_url}/api/builders/conversations?${params}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setConversations(data.data.conversations);
//                 setStats(data.data.stats);
//             }
//         } catch (error) {
//             console.error('Error loading conversations:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const updateLeadStatus = async (conversationId, leadStatus, notes = '') => {
//         try {
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/conversations/${conversationId}/lead-status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ leadStatus, notes })
//             });

//             if (response.ok) {
//                 loadConversations();
//             }
//         } catch (error) {
//             console.error('Error updating lead status:', error);
//         }
//     };

//     const formatTime = (timestamp) => {
//         const date = new Date(timestamp);
//         const now = new Date();
//         const diffInHours = (now - date) / (1000 * 60 * 60);

//         if (diffInHours < 1) return 'Just now';
//         if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
//         if (diffInHours < 168) return date.toLocaleDateString('en-US', { weekday: 'short' });
//         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     };

//     const getLeadStatusColor = (status) => {
//         const colors = {
//             'INQUIRY': 'bg-blue-100 text-blue-800',
//             'INTERESTED': 'bg-green-100 text-green-800',
//             'VIEWING_SCHEDULED': 'bg-yellow-100 text-yellow-800',
//             'NEGOTIATING': 'bg-orange-100 text-orange-800',
//             'CLOSED_WON': 'bg-green-100 text-green-800',
//             'CLOSED_LOST': 'bg-red-100 text-red-800',
//             'FOLLOW_UP': 'bg-purple-100 text-purple-800'
//         };
//         return colors[status] || 'bg-gray-100 text-gray-800';
//     };

//     if (selectedConversation) {
//         return (
//             <ConversationView
//                 conversation={selectedConversation}
//                 onBack={() => setSelectedConversation(null)}
//                 onUpdateLead={updateLeadStatus}
//             />
//         );
//     }

//     return (
//         <div className="bg-white rounded-lg shadow">
//             {/* Stats Header */}
//             <div className="border-b border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-2xl font-bold text-gray-900">Customer Inquiries</h1>
//                     {stats.totalUnread > 0 && (
//                         <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//                             {stats.totalUnread} unread
//                         </span>
//                     )}
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
//                     <div className="bg-blue-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <MessageCircle className="h-8 w-8 text-blue-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-blue-600">Inquiries</p>
//                                 <p className="text-2xl font-bold text-blue-900">{stats.inquiryCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <TrendingUp className="h-8 w-8 text-green-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-green-600">Interested</p>
//                                 <p className="text-2xl font-bold text-green-900">{stats.interestedCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-yellow-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <Calendar className="h-8 w-8 text-yellow-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-yellow-600">Viewings</p>
//                                 <p className="text-2xl font-bold text-yellow-900">{stats.viewingScheduledCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-orange-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <Clock className="h-8 w-8 text-orange-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-orange-600">Negotiating</p>
//                                 <p className="text-2xl font-bold text-orange-900">{stats.negotiatingCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <CheckCircle className="h-8 w-8 text-green-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-green-600">Closed</p>
//                                 <p className="text-2xl font-bold text-green-900">{stats.closedWonCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-purple-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <Star className="h-8 w-8 text-purple-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-purple-600">Conversion</p>
//                                 <p className="text-2xl font-bold text-purple-900">
//                                     {stats.inquiryCount > 0 ?
//                                         Math.round((stats.closedWonCount / stats.inquiryCount) * 100) : 0}%
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center space-x-2">
//                         <Search className="h-5 w-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search conversations..."
//                             value={filters.search}
//                             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                             className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <select
//                         value={filters.leadStatus}
//                         onChange={(e) => setFilters({ ...filters, leadStatus: e.target.value })}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">All Lead Status</option>
//                         <option value="INQUIRY">Inquiry</option>
//                         <option value="INTERESTED">Interested</option>
//                         <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
//                         <option value="NEGOTIATING">Negotiating</option>
//                         <option value="CLOSED_WON">Closed Won</option>
//                         <option value="CLOSED_LOST">Closed Lost</option>
//                         <option value="FOLLOW_UP">Follow Up</option>
//                     </select>

//                     <select
//                         value={filters.priority}
//                         onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">All Priority</option>
//                         <option value="HIGH">High Priority</option>
//                         <option value="MEDIUM">Medium Priority</option>
//                         <option value="LOW">Low Priority</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Conversations List */}
//             <div className="divide-y divide-gray-200">
//                 {isLoading ? (
//                     <div className="flex items-center justify-center py-12">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-gray-600">Loading conversations...</span>
//                     </div>
//                 ) : conversations.length === 0 ? (
//                     <div className="text-center py-12">
//                         <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">No conversations found</p>
//                     </div>
//                 ) : (
//                     conversations.map((conversation) => (
//                         <div
//                             key={conversation._id}
//                             onClick={() => setSelectedConversation(conversation)}
//                             className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
//                         >
//                             <div className="flex items-start space-x-4">
//                                 <div className="flex-shrink-0 relative">
//                                     <img
//                                         src={conversation.user?.profile?.avatar || '/default-avatar.png'}
//                                         alt="User"
//                                         className="h-12 w-12 rounded-full object-cover"
//                                     />
//                                     {conversation.unreadCount?.builder > 0 && (
//                                         <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
//                                             {conversation.unreadCount.builder}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="flex-1 min-w-0">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <h3 className="font-semibold text-gray-900">
//                                                 {conversation.user?.name || 'Anonymous User'}
//                                             </h3>
//                                             <p className="text-sm text-gray-600 truncate">
//                                                 {conversation.property?.post_title}
//                                             </p>
//                                         </div>

//                                         <div className="flex flex-col items-end space-y-2">
//                                             <span className="text-xs text-gray-500">
//                                                 {formatTime(conversation.lastMessage?.sentAt)}
//                                             </span>

//                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeadStatusColor(conversation.leadStatus)}`}>
//                                                 {conversation.leadStatus.replace('_', ' ')}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
//                                         <span className="flex items-center">
//                                             <MapPin className="h-4 w-4 mr-1" />
//                                             {conversation.property?.city}, {conversation.property?.locality}
//                                         </span>
//                                         <span>
//                                             ₹{conversation.property?.price?.toLocaleString('en-IN')}
//                                         </span>
//                                     </div>

//                                     <p className="mt-2 text-sm text-gray-600 truncate">
//                                         {conversation.lastMessage?.message || 'No messages yet'}
//                                     </p>

//                                     <div className="mt-3 flex items-center space-x-2">
//                                         <select
//                                             value={conversation.leadStatus}
//                                             onChange={(e) => {
//                                                 e.stopPropagation();
//                                                 updateLeadStatus(conversation.conversationId, e.target.value);
//                                             }}
//                                             className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                         >
//                                             <option value="INQUIRY">Inquiry</option>
//                                             <option value="INTERESTED">Interested</option>
//                                             <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
//                                             <option value="NEGOTIATING">Negotiating</option>
//                                             <option value="CLOSED_WON">Closed Won</option>
//                                             <option value="CLOSED_LOST">Closed Lost</option>
//                                             <option value="FOLLOW_UP">Follow Up</option>
//                                         </select>

//                                         {conversation.user?.phone && (
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     window.open(`tel:${conversation.user.phone}`, '_self');
//                                                 }}
//                                                 className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
//                                             >
//                                                 Call
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// // ===== INDIVIDUAL CONVERSATION VIEW =====

// const ConversationView = ({ conversation, onBack, onUpdateLead }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [leadStatus, setLeadStatus] = useState(conversation.leadStatus);
//     const [notes, setNotes] = useState('');
//     const [showLeadUpdate, setShowLeadUpdate] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSending, setIsSending] = useState(false);
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         loadMessages();
//     }, [conversation.conversationId]);

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const loadMessages = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/conversations/${conversation.conversationId}/messages`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setMessages(data.data.messages);
//             }
//         } catch (error) {
//             console.error('Error loading messages:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim() || isSending) return;

//         setIsSending(true);
//         try {
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/messages`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     conversationId: conversation.conversationId,
//                     message: newMessage,
//                     messageType: 'TEXT'
//                 })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setMessages(prev => [...prev, data.data]);
//                 setNewMessage('');
//                 scrollToBottom();
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//         } finally {
//             setIsSending(false);
//         }
//     };

//     const handleLeadUpdate = async () => {
//         try {
//             await onUpdateLead(conversation.conversationId, leadStatus, notes);
//             setShowLeadUpdate(false);
//             setNotes('');
//         } catch (error) {
//             console.error('Error updating lead:', error);
//         }
//     };

//     const scrollToBottom = () => {
//         setTimeout(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//     };

//     const getLeadStatusColor = (status) => {
//         const colors = {
//             'INQUIRY': 'bg-blue-100 text-blue-800',
//             'INTERESTED': 'bg-green-100 text-green-800',
//             'VIEWING_SCHEDULED': 'bg-yellow-100 text-yellow-800',
//             'NEGOTIATING': 'bg-orange-100 text-orange-800',
//             'CLOSED_WON': 'bg-green-100 text-green-800',
//             'CLOSED_LOST': 'bg-red-100 text-red-800',
//             'FOLLOW_UP': 'bg-purple-100 text-purple-800'
//         };
//         return colors[status] || 'bg-gray-100 text-gray-800';
//     };

//     return (
//         <div className="flex flex-col h-screen max-h-[800px] bg-white border border-gray-200 rounded-lg overflow-hidden">
//             {/* Header */}
//             <div className="bg-white border-b border-gray-200 p-4">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                         <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
//                             <ArrowLeft className="h-6 w-6" />
//                         </button>

//                         <img
//                             src={conversation.user?.profile?.avatar || '/default-avatar.png'}
//                             alt="User"
//                             className="h-10 w-10 rounded-full object-cover"
//                         />

//                         <div>
//                             <h3 className="font-semibold text-gray-900">
//                                 {conversation.user?.name}
//                             </h3>
//                             <p className="text-sm text-gray-500">
//                                 {conversation.property?.post_title}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeadStatusColor(leadStatus)}`}>
//                             {leadStatus.replace('_', ' ')}
//                         </span>

//                         <button
//                             onClick={() => setShowLeadUpdate(!showLeadUpdate)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                         >
//                             Update Lead
//                         </button>

//                         {conversation.user?.phone && (
//                             <button
//                                 onClick={() => window.open(`tel:${conversation.user.phone}`, '_self')}
//                                 className="p-2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <Phone className="h-5 w-5" />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Lead Update Panel */}
//                 {showLeadUpdate && (
//                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                         <div className="grid grid-cols-2 gap-4">
//                             <select
//                                 value={leadStatus}
//                                 onChange={(e) => setLeadStatus(e.target.value)}
//                                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="INQUIRY">Inquiry</option>
//                                 <option value="INTERESTED">Interested</option>
//                                 <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
//                                 <option value="NEGOTIATING">Negotiating</option>
//                                 <option value="CLOSED_WON">Closed Won</option>
//                                 <option value="CLOSED_LOST">Closed Lost</option>
//                                 <option value="FOLLOW_UP">Follow Up</option>
//                             </select>

//                             <input
//                                 type="text"
//                                 placeholder="Add notes..."
//                                 value={notes}
//                                 onChange={(e) => setNotes(e.target.value)}
//                                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div className="mt-3 flex justify-end space-x-2">
//                             <button
//                                 onClick={() => setShowLeadUpdate(false)}
//                                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleLeadUpdate}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             >
//                                 Update
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Property Info */}
//             <div className="bg-blue-50 border-b border-blue-100 p-3">
//                 <div className="flex items-center space-x-3">
//                     <img
//                         src={conversation.property?.post_images?.[0]?.url || '/placeholder-property.png'}
//                         alt="Property"
//                         className="h-12 w-12 rounded-lg object-cover"
//                     />
//                     <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">
//                             {conversation.property?.post_title}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             {conversation.property?.city}, {conversation.property?.locality}
//                         </p>
//                         {conversation.property?.price && (
//                             <p className="text-sm font-semibold text-blue-600">
//                                 ₹{conversation.property.price.toLocaleString('en-IN')}
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {isLoading ? (
//                     <div className="flex justify-center py-8">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     </div>
//                 ) : (
//                     messages.map((message, index) => (
//                         <div
//                             key={message._id || index}
//                             className={`flex ${message.sender === 'BUILDER' ? 'justify-end' : 'justify-start'}`}
//                         >
//                             <div
//                                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'BUILDER'
//                                     ? 'bg-blue-600 text-white'
//                                     : message.sender === 'SYSTEM'
//                                         ? 'bg-yellow-100 text-yellow-800 text-center'
//                                         : 'bg-gray-100 text-gray-900'
//                                     }`}
//                             >
//                                 <p className="text-sm">{message.message}</p>
//                                 <div className="flex items-center justify-between mt-1">
//                                     <span className="text-xs opacity-75">
//                                         {new Date(message.createdAt).toLocaleTimeString()}
//                                     </span>
//                                     {message.sender === 'BUILDER' && (
//                                         <span className="text-xs opacity-75">
//                                             {message.status === 'read' ? '✓✓' : '✓'}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="border-t border-gray-200 p-4">
//                 <div className="flex items-center space-x-2">
//                     <button className="p-2 text-gray-400 hover:text-gray-600">
//                         <Paperclip className="h-5 w-5" />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-gray-600">
//                         <FileImage className="h-5 w-5" />
//                     </button>

//                     <div className="flex-1 relative">
//                         <textarea
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
//                             placeholder="Type your response..."
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             rows="1"
//                             style={{ minHeight: '40px', maxHeight: '120px' }}
//                             disabled={isSending}
//                         />
//                     </div>

//                     <button
//                         onClick={sendMessage}
//                         disabled={!newMessage.trim() || isSending}
//                         className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                     >
//                         {isSending ? (
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         ) : (
//                             <Send className="h-5 w-5" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ===== PROPERTIES TAB =====

// const PropertiesTab = () => {
//     const [properties, setProperties] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [filters, setFilters] = useState({
//         status: '',
//         search: ''
//     });

//     useEffect(() => {
//         loadProperties();
//     }, [filters]);

//     const loadProperties = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const params = new URLSearchParams({
//                 page: 1,
//                 limit: 20,
//                 ...filters
//             });

//             const response = await fetch(`${base_url}/api/builders/properties?${params}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setProperties(data.data.properties);
//             }
//         } catch (error) {
//             console.error('Error loading properties:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow">
//             <div className="border-b border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
//                         <Plus className="h-5 w-5" />
//                         <span>Add Property</span>
//                     </button>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                         <Search className="h-5 w-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search properties..."
//                             value={filters.search}
//                             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                             className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <select
//                         value={filters.status}
//                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">All Status</option>
//                         <option value="listed">Listed</option>
//                         <option value="unlisted">Unlisted</option>
//                         <option value="sold">Sold</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Properties Grid */}
//             <div className="p-6">
//                 {isLoading ? (
//                     <div className="flex items-center justify-center py-12">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-gray-600">Loading properties...</span>
//                     </div>
//                 ) : properties.length === 0 ? (
//                     <div className="text-center py-12">
//                         <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">No properties found</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {properties.map((property) => (
//                             <div key={property._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
//                                 <img
//                                     src={property.post_images?.[0]?.url || '/placeholder-property.png'}
//                                     alt="Property"
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-4">
//                                     <h3 className="font-semibold text-gray-900 truncate">
//                                         {property.post_title}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         {property.city}, {property.locality}
//                                     </p>
//                                     <p className="text-lg font-bold text-blue-600 mt-2">
//                                         ₹{property.price?.toLocaleString('en-IN')}
//                                     </p>
//                                     <div className="flex items-center justify-between mt-4">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === 'listed'
//                                             ? 'bg-green-100 text-green-800'
//                                             : 'bg-gray-100 text-gray-800'
//                                             }`}>
//                                             {property.status}
//                                         </span>
//                                         <button className="text-blue-600 hover:text-blue-700 text-sm">
//                                             <Edit className="h-4 w-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// // ===== ANALYTICS TAB =====

// const AnalyticsTab = () => {
//     const [analytics, setAnalytics] = useState(null);
//     const [period, setPeriod] = useState('30d');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         loadAnalytics();
//     }, [period]);

//     const loadAnalytics = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/analytics?period=${period}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setAnalytics(data.data);
//             }
//         } catch (error) {
//             console.error('Error loading analytics:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <span className="ml-3 text-gray-600">Loading analytics...</span>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Period Selector */}
//             <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center justify-between">
//                     <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//                     <select
//                         value={period}
//                         onChange={(e) => setPeriod(e.target.value)}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="7d">Last 7 days</option>
//                         <option value="30d">Last 30 days</option>
//                         <option value="90d">Last 90 days</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-blue-100">
//                             <MessageCircle className="h-6 w-6 text-blue-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.summary?.totalInquiries || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-green-100">
//                             <CheckCircle className="h-6 w-6 text-green-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Closed Deals</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.summary?.totalClosed || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-purple-100">
//                             <TrendingUp className="h-6 w-6 text-purple-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.conversionRate || 0}%
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-yellow-100">
//                             <Calendar className="h-6 w-6 text-yellow-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Viewings Scheduled</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.summary?.totalViewings || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Top Properties */}
//             <div className="bg-white rounded-lg shadow">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Top Performing Properties</h2>
//                 </div>
//                 <div className="p-6">
//                     {analytics?.propertyStats?.length === 0 ? (
//                         <p className="text-gray-500 text-center py-8">No data available</p>
//                     ) : (
//                         <div className="space-y-4">
//                             {analytics?.propertyStats?.map((property, index) => (
//                                 <div key={property._id} className="flex items-center justify-between">
//                                     <div>
//                                         <p className="font-medium text-gray-900">{property.propertyTitle}</p>
//                                         <p className="text-sm text-gray-500">
//                                             {property.inquiryCount} inquiries • {property.interestedCount} interested
//                                         </p>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="font-semibold text-green-600">{property.closedCount} closed</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ===== PROFILE TAB =====

// const ProfileTab = ({ builderData }) => {
//     const [profile, setProfile] = useState(builderData || {});
//     const [isEditing, setIsEditing] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSave = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/profile`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(profile)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setProfile(data.data);
//                 setIsEditing(false);
//                 localStorage.setItem('builderData', JSON.stringify(data.data));
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                     <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
//                     {!isEditing ? (
//                         <button
//                             onClick={() => setIsEditing(true)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//                         >
//                             <Edit className="h-4 w-4" />
//                             <span>Edit Profile</span>
//                         </button>
//                     ) : (
//                         <div className="flex space-x-2">
//                             <button
//                                 onClick={() => setIsEditing(false)}
//                                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSave}
//                                 disabled={isLoading}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                             >
//                                 {isLoading ? 'Saving...' : 'Save Changes'}
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="p-6 space-y-6">
//                 {/* Basic Information */}
//                 <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Company Name
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     value={profile.company || ''}
//                                     onChange={(e) => setProfile({ ...profile, company: e.target.value })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.company || 'Not set'}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Contact Person
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     value={profile.name || ''}
//                                     onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.name || 'Not set'}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Experience (Years)
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     value={profile.experience || ''}
//                                     onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.experience || 0} years</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Established Year
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     value={profile.establishedYear || ''}
//                                     onChange={(e) => setProfile({ ...profile, establishedYear: parseInt(e.target.value) })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.establishedYear || 'Not set'}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Contact Numbers/Emails
//                             </label>
//                             {isEditing ? (
//                                 <textarea
//                                     value={profile.contacts?.join('\n') || ''}
//                                     onChange={(e) => setProfile({ ...profile, contacts: e.target.value.split('\n').filter(c => c.trim()) })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     rows="3"
//                                     placeholder="Enter one contact per line"
//                                 />
//                             ) : (
//                                 <div className="space-y-1">
//                                     {profile.contacts?.map((contact, index) => (
//                                         <p key={index} className="text-gray-900">{contact}</p>
//                                     )) || <p className="text-gray-500">No contacts added</p>}
//                                 </div>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Website
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="url"
//                                     value={profile.website || ''}
//                                     onChange={(e) => setProfile({ ...profile, website: e.target.value })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.website || 'Not set'}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Notification Settings */}
//                 <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="font-medium text-gray-900">Email Notifications</p>
//                                 <p className="text-sm text-gray-500">Receive daily reports and inquiry alerts</p>
//                             </div>
//                             <input
//                                 type="checkbox"
//                                 checked={profile.emailNotifications?.dailyReport?.enabled || false}
//                                 onChange={(e) => setProfile({
//                                     ...profile,
//                                     emailNotifications: {
//                                         ...profile.emailNotifications,
//                                         dailyReport: {
//                                             ...profile.emailNotifications?.dailyReport,
//                                             enabled: e.target.checked
//                                         }
//                                     }
//                                 })}
//                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 disabled={!isEditing}
//                             />
//                         </div>

//                         {profile.emailNotifications?.dailyReport?.enabled && (
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Email Address for Reports
//                                 </label>
//                                 {isEditing ? (
//                                     <input
//                                         type="email"
//                                         value={profile.emailNotifications?.dailyReport?.email || ''}
//                                         onChange={(e) => setProfile({
//                                             ...profile,
//                                             emailNotifications: {
//                                                 ...profile.emailNotifications,
//                                                 dailyReport: {
//                                                     ...profile.emailNotifications?.dailyReport,
//                                                     email: e.target.value
//                                                 }
//                                             }
//                                         })}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 ) : (
//                                     <p className="text-gray-900">
//                                         {profile.emailNotifications?.dailyReport?.email || 'Not set'}
//                                     </p>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatInterface;

// import { useEffect, useState, useRef, useCallback } from "react";
// import io from 'socket.io-client';
// import {
//     MessageCircle,
//     User,
//     Clock,
//     Star,
//     Filter,
//     Search,
//     ChevronDown,
//     Phone,
//     Mail,
//     MapPin,
//     Calendar,
//     TrendingUp,
//     Eye,
//     CheckCircle,
//     Home,
//     BarChart3,
//     Settings,
//     LogOut,
//     Bell,
//     Plus,
//     Edit,
//     Send,
//     Paperclip,
//     FileImage,
//     X,
//     ArrowLeft,
//     MoreVertical,
//     Wifi,
//     WifiOff
// } from 'lucide-react';
// import { base_url } from "@/utils/baseurl";


// // Socket connection manager
// let socket = null;

// const connectSocket = (token) => {
//     if (socket?.connected) return socket;

//     socket = io(base_url, {
//         auth: { token },
//         autoConnect: true,
//         transports: ['websocket', 'polling']
//     });

//     socket.on('connect', () => {
//         console.log('✅ Socket connected:', socket.id);
//     });

//     socket.on('connect_error', (error) => {
//         console.error('❌ Socket connection error:', error);
//     });

//     socket.on('disconnect', (reason) => {
//         console.log('🔌 Socket disconnected:', reason);
//     });

//     return socket;
// };

// const disconnectSocket = () => {
//     if (socket) {
//         socket.disconnect();
//         socket = null;
//     }
// };

// // ===== BUILDER MAIN DASHBOARD =====

// const ChatInterface = () => {
//     const [activeTab, setActiveTab] = useState('conversations');
//     const [builderData, setBuilderData] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [socketConnected, setSocketConnected] = useState(false);


//     useEffect(() => {
//         const userData = localStorage.getItem('user');
//         // console.log("userData", userData)
//         // const builderDataStored = localStorage.getItem('builderData');

//         if (userData) {
//             const token = JSON.parse(userData).token;
//             console.log("token", token)
//             setBuilderData(JSON.parse(userData));
//             setIsAuthenticated(true);

//             // Connect socket
//             const socketInstance = connectSocket(token);

//             socketInstance.on('connect', () => setSocketConnected(true));
//             socketInstance.on('disconnect', () => setSocketConnected(false));
//         }

//         return () => {
//             // Don't disconnect on unmount, keep connection alive for real-time updates
//         };
//     }, []);

//     const handleLogin = (data) => {
//         setBuilderData(data.builder);
//         setIsAuthenticated(true);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('builderToken');
//         localStorage.removeItem('builderData');
//         localStorage.removeItem('user');
//         setIsAuthenticated(false);
//         setBuilderData(null);
//         disconnectSocket();
//         setSocketConnected(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">

//             {/* Navigation */}


//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//                 {activeTab === 'conversations' && <ConversationsTab socketConnected={socketConnected} />}
//                 {activeTab === 'properties' && <PropertiesTab />}
//                 {activeTab === 'analytics' && <AnalyticsTab />}
//                 {activeTab === 'profile' && <ProfileTab builderData={builderData} />}
//             </main>
//         </div>
//     );
// };

// // ===== CONVERSATIONS TAB =====

// const ConversationsTab = ({ socketConnected }) => {
//     const [conversations, setConversations] = useState([]);
//     const [stats, setStats] = useState({});
//     const [selectedConversation, setSelectedConversation] = useState(null);
//     const [filters, setFilters] = useState({
//         status: 'ACTIVE',
//         leadStatus: '',
//         search: '',
//         priority: ''
//     });
//     const [isLoading, setIsLoading] = useState(true);
//     const [unreadMessages, setUnreadMessages] = useState({});

//     useEffect(() => {
//         loadConversations();
//     }, [filters]);

//     // Listen for real-time conversation updates
//     useEffect(() => {
//         if (!socket) return;

//         const handleNewMessage = (data) => {
//             const { message, conversationId } = data;

//             // Update conversations list with latest message
//             setConversations(prev => prev.map(conv => {
//                 if (conv.conversationId === conversationId) {
//                     return {
//                         ...conv,
//                         lastMessage: message,
//                         unreadCount: {
//                             ...conv.unreadCount,
//                             builder: (conv.unreadCount?.builder || 0) + (message.sender !== 'BUILDER' ? 1 : 0)
//                         }
//                     };
//                 }
//                 return conv;
//             }));

//             // Update unread count for notifications
//             if (message.sender !== 'BUILDER') {
//                 setUnreadMessages(prev => ({
//                     ...prev,
//                     [conversationId]: (prev[conversationId] || 0) + 1
//                 }));
//             }
//         };

//         socket.on('newMessage', handleNewMessage);

//         return () => {
//             socket.off('newMessage', handleNewMessage);
//         };
//     }, [socket]);

//     const loadConversations = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const params = new URLSearchParams({
//                 page: 1,
//                 limit: 20,
//                 ...filters
//             });

//             const response = await fetch(`${base_url}/api/builders/conversations?${params}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setConversations(data.data.conversations);
//                 setStats(data.data.stats);
//             }
//         } catch (error) {
//             console.error('Error loading conversations:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const updateLeadStatus = async (conversationId, leadStatus, notes = '') => {
//         try {
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/conversations/${conversationId}/lead-status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ leadStatus, notes })
//             });

//             if (response.ok) {
//                 loadConversations();
//             }
//         } catch (error) {
//             console.error('Error updating lead status:', error);
//         }
//     };

//     const formatTime = (timestamp) => {
//         const date = new Date(timestamp);
//         const now = new Date();
//         const diffInHours = (now - date) / (1000 * 60 * 60);

//         if (diffInHours < 1) return 'Just now';
//         if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
//         if (diffInHours < 168) return date.toLocaleDateString('en-US', { weekday: 'short' });
//         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     };

//     const getLeadStatusColor = (status) => {
//         const colors = {
//             'INQUIRY': 'bg-blue-100 text-blue-800',
//             'INTERESTED': 'bg-green-100 text-green-800',
//             'VIEWING_SCHEDULED': 'bg-yellow-100 text-yellow-800',
//             'NEGOTIATING': 'bg-orange-100 text-orange-800',
//             'CLOSED_WON': 'bg-green-100 text-green-800',
//             'CLOSED_LOST': 'bg-red-100 text-red-800',
//             'FOLLOW_UP': 'bg-purple-100 text-purple-800'
//         };
//         return colors[status] || 'bg-gray-100 text-gray-800';
//     };

//     if (selectedConversation) {
//         return (
//             <ConversationView
//                 conversation={selectedConversation}
//                 onBack={() => setSelectedConversation(null)}
//                 onUpdateLead={updateLeadStatus}
//                 socketConnected={socketConnected}
//             />
//         );
//     }

//     return (
//         <div className="bg-white rounded-lg shadow">
//             {/* Connection Status Banner */}
//             {!socketConnected && (
//                 <div className="bg-yellow-100 border-b border-yellow-200 p-3">
//                     <div className="flex items-center justify-center space-x-2 text-yellow-800">
//                         <WifiOff className="h-5 w-5" />
//                         <span className="text-sm font-medium">
//                             Connection lost - Messages may not update in real-time
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {/* Stats Header */}
//             <div className="border-b border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-2xl font-bold text-gray-900">Customer Inquiries</h1>
//                     {(stats.totalUnread > 0 || Object.values(unreadMessages).reduce((a, b) => a + b, 0) > 0) && (
//                         <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//                             {stats.totalUnread + Object.values(unreadMessages).reduce((a, b) => a + b, 0)} unread
//                         </span>
//                     )}
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
//                     <div className="bg-blue-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <MessageCircle className="h-8 w-8 text-blue-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-blue-600">Inquiries</p>
//                                 <p className="text-2xl font-bold text-blue-900">{stats.inquiryCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <TrendingUp className="h-8 w-8 text-green-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-green-600">Interested</p>
//                                 <p className="text-2xl font-bold text-green-900">{stats.interestedCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-yellow-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <Calendar className="h-8 w-8 text-yellow-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-yellow-600">Viewings</p>
//                                 <p className="text-2xl font-bold text-yellow-900">{stats.viewingScheduledCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-orange-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <Clock className="h-8 w-8 text-orange-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-orange-600">Negotiating</p>
//                                 <p className="text-2xl font-bold text-orange-900">{stats.negotiatingCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <CheckCircle className="h-8 w-8 text-green-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-green-600">Closed</p>
//                                 <p className="text-2xl font-bold text-green-900">{stats.closedWonCount || 0}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-purple-50 rounded-lg p-4">
//                         <div className="flex items-center">
//                             <Star className="h-8 w-8 text-purple-600" />
//                             <div className="ml-3">
//                                 <p className="text-sm font-medium text-purple-600">Conversion</p>
//                                 <p className="text-2xl font-bold text-purple-900">
//                                     {stats.inquiryCount > 0 ?
//                                         Math.round((stats.closedWonCount / stats.inquiryCount) * 100) : 0}%
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center space-x-2">
//                         <Search className="h-5 w-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search conversations..."
//                             value={filters.search}
//                             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                             className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <select
//                         value={filters.leadStatus}
//                         onChange={(e) => setFilters({ ...filters, leadStatus: e.target.value })}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">All Lead Status</option>
//                         <option value="INQUIRY">Inquiry</option>
//                         <option value="INTERESTED">Interested</option>
//                         <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
//                         <option value="NEGOTIATING">Negotiating</option>
//                         <option value="CLOSED_WON">Closed Won</option>
//                         <option value="CLOSED_LOST">Closed Lost</option>
//                         <option value="FOLLOW_UP">Follow Up</option>
//                     </select>

//                     <select
//                         value={filters.priority}
//                         onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">All Priority</option>
//                         <option value="HIGH">High Priority</option>
//                         <option value="MEDIUM">Medium Priority</option>
//                         <option value="LOW">Low Priority</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Conversations List */}
//             <div className="divide-y divide-gray-200">
//                 {isLoading ? (
//                     <div className="flex items-center justify-center py-12">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-gray-600">Loading conversations...</span>
//                     </div>
//                 ) : conversations.length === 0 ? (
//                     <div className="text-center py-12">
//                         <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">No conversations found</p>
//                     </div>
//                 ) : (
//                     conversations.map((conversation) => (
//                         <div
//                             key={conversation._id}
//                             onClick={() => {
//                                 setSelectedConversation(conversation);
//                                 // Clear unread count for this conversation
//                                 setUnreadMessages(prev => ({ ...prev, [conversation.conversationId]: 0 }));
//                             }}
//                             className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
//                         >
//                             <div className="flex items-start space-x-4">
//                                 <div className="flex-shrink-0 relative">
//                                     <img
//                                         src={conversation.user?.profile?.avatar || '/default-avatar.png'}
//                                         alt="User"
//                                         className="h-12 w-12 rounded-full object-cover"
//                                     />
//                                     {((conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)) > 0 && (
//                                         <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
//                                             {(conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="flex-1 min-w-0">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <h3 className="font-semibold text-gray-900">
//                                                 {conversation.user?.name || 'Anonymous User'}
//                                             </h3>
//                                             <p className="text-sm text-gray-600 truncate">
//                                                 {conversation.property?.post_title}
//                                             </p>
//                                         </div>

//                                         <div className="flex flex-col items-end space-y-2">
//                                             <span className="text-xs text-gray-500">
//                                                 {formatTime(conversation.lastMessage?.sentAt)}
//                                             </span>

//                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeadStatusColor(conversation.leadStatus)}`}>
//                                                 {conversation.leadStatus.replace('_', ' ')}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
//                                         <span className="flex items-center">
//                                             <MapPin className="h-4 w-4 mr-1" />
//                                             {conversation.property?.city}, {conversation.property?.locality}
//                                         </span>
//                                         <span>
//                                             ₹{conversation.property?.price?.toLocaleString('en-IN')}
//                                         </span>
//                                     </div>

//                                     <p className="mt-2 text-sm text-gray-600 truncate">
//                                         {conversation.lastMessage?.message || 'No messages yet'}
//                                     </p>

//                                     <div className="mt-3 flex items-center space-x-2">
//                                         <select
//                                             value={conversation.leadStatus}
//                                             onChange={(e) => {
//                                                 e.stopPropagation();
//                                                 updateLeadStatus(conversation.conversationId, e.target.value);
//                                             }}
//                                             className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                         >
//                                             <option value="INQUIRY">Inquiry</option>
//                                             <option value="INTERESTED">Interested</option>
//                                             <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
//                                             <option value="NEGOTIATING">Negotiating</option>
//                                             <option value="CLOSED_WON">Closed Won</option>
//                                             <option value="CLOSED_LOST">Closed Lost</option>
//                                             <option value="FOLLOW_UP">Follow Up</option>
//                                         </select>

//                                         {conversation.user?.phone && (
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     window.open(`tel:${conversation.user.phone}`, '_self');
//                                                 }}
//                                                 className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
//                                             >
//                                                 Call
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// // ===== INDIVIDUAL CONVERSATION VIEW =====

// const ConversationView = ({ conversation, onBack, onUpdateLead, socketConnected }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [leadStatus, setLeadStatus] = useState(conversation.leadStatus);
//     const [notes, setNotes] = useState('');
//     const [showLeadUpdate, setShowLeadUpdate] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSending, setIsSending] = useState(false);
//     const [isTyping, setIsTyping] = useState(false);
//     const [userTyping, setUserTyping] = useState(false);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const messagesEndRef = useRef(null);
//     const typingTimeoutRef = useRef(null);

//     useEffect(() => {
//         loadMessages();

//         // Join conversation room when component mounts
//         if (socket && socketConnected) {
//             joinConversation();
//         }

//         return () => {
//             // Leave conversation room when component unmounts
//             if (socket && conversation.conversationId) {
//                 socket.emit('leaveConversation', {
//                     conversationId: conversation.conversationId
//                 });
//             }
//         };
//     }, [conversation.conversationId, socketConnected]);

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     // Socket event listeners
//     useEffect(() => {
//         if (!socket) return;

//         const handleNewMessage = (data) => {
//             if (data.conversationId === conversation.conversationId) {
//                 setMessages(prev => [...prev, data.message]);
//                 scrollToBottom();
//             }
//         };

//         const handleUserTyping = (data) => {
//             if (data.conversationId === conversation.conversationId && data.userId !== JSON.parse(localStorage.getItem('user')).id) {
//                 setUserTyping(data.isTyping);
//             }
//         };

//         const handleUserOnline = (data) => {
//             if (data.conversationId === conversation.conversationId) {
//                 setOnlineUsers(prev => [...prev.filter(u => u.userId !== data.userId), data]);
//             }
//         };

//         const handleUserOffline = (data) => {
//             if (data.conversationId === conversation.conversationId) {
//                 setOnlineUsers(prev => prev.filter(u => u.userId !== data.userId));
//             }
//         };

//         const handleMessagesRead = (data) => {
//             if (data.conversationId === conversation.conversationId) {
//                 // Update message read status
//                 setMessages(prev => prev.map(msg => ({
//                     ...msg,
//                     status: 'read'
//                 })));
//             }
//         };

//         const handleJoinedConversation = (data) => {
//             console.log('✅ Successfully joined conversation:', data);
//         };

//         socket.on('newMessage', handleNewMessage);
//         socket.on('userTyping', handleUserTyping);
//         socket.on('userOnline', handleUserOnline);
//         socket.on('userOffline', handleUserOffline);
//         socket.on('messagesRead', handleMessagesRead);
//         socket.on('joinedConversation', handleJoinedConversation);
//         socket.on('error', (error) => {
//             console.error('Socket error:', error);
//         });

//         return () => {
//             socket.off('newMessage', handleNewMessage);
//             socket.off('userTyping', handleUserTyping);
//             socket.off('userOnline', handleUserOnline);
//             socket.off('userOffline', handleUserOffline);
//             socket.off('messagesRead', handleMessagesRead);
//             socket.off('joinedConversation', handleJoinedConversation);
//             socket.off('error');
//         };
//     }, [socket, conversation.conversationId]);

//     const joinConversation = () => {
//         if (socket && conversation.conversationId) {
//             console.log('🏠 Joining conversation:', conversation.conversationId);
//             socket.emit('joinConversation', {
//                 conversationId: conversation.conversationId
//             });
//         }
//     };

//     const loadMessages = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/conversations/${conversation.conversationId}/messages`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setMessages(data.data.messages);

//                 // Mark messages as read via socket
//                 if (socket && socketConnected) {
//                     socket.emit('markAsRead', {
//                         conversationId: conversation.conversationId
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error('Error loading messages:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim() || isSending) return;

//         setIsSending(true);
//         const messageToSend = newMessage.trim();
//         setNewMessage('');

//         try {
//             // Send via socket for real-time delivery
//             if (socket && socketConnected) {
//                 socket.emit('sendMessage', {
//                     conversationId: conversation.conversationId,
//                     message: messageToSend,
//                     messageType: 'TEXT',
//                     attachments: []
//                 });
//             } else {
//                 // Fallback to REST API if socket not connected
//                 const token = JSON.parse(localStorage.getItem('user')).token;
//                 const response = await fetch(`${base_url}/api/builders/messages`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         conversationId: conversation.conversationId,
//                         message: messageToSend,
//                         messageType: 'TEXT'
//                     })
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setMessages(prev => [...prev, data.data]);
//                     scrollToBottom();
//                 }
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             setNewMessage(messageToSend); // Restore message on error
//         } finally {
//             setIsSending(false);
//         }
//     };

//     const handleTyping = (e) => {
//         setNewMessage(e.target.value);

//         if (!socket || !socketConnected) return;

//         // Send typing indicator
//         if (e.target.value.length > 0 && !isTyping) {
//             setIsTyping(true);
//             socket.emit('typing', {
//                 conversationId: conversation.conversationId,
//                 isTyping: true
//             });
//         }

//         // Clear existing timeout
//         if (typingTimeoutRef.current) {
//             clearTimeout(typingTimeoutRef.current);
//         }

//         // Set timeout to stop typing indicator
//         typingTimeoutRef.current = setTimeout(() => {
//             setIsTyping(false);
//             if (socket && socketConnected) {
//                 socket.emit('typing', {
//                     conversationId: conversation.conversationId,
//                     isTyping: false
//                 });
//             }
//         }, 2000);
//     };

//     const handleLeadUpdate = async () => {
//         try {
//             await onUpdateLead(conversation.conversationId, leadStatus, notes);
//             setShowLeadUpdate(false);
//             setNotes('');
//         } catch (error) {
//             console.error('Error updating lead:', error);
//         }
//     };

//     const scrollToBottom = () => {
//         setTimeout(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//     };

//     const getLeadStatusColor = (status) => {
//         const colors = {
//             'INQUIRY': 'bg-blue-100 text-blue-800',
//             'INTERESTED': 'bg-green-100 text-green-800',
//             'VIEWING_SCHEDULED': 'bg-yellow-100 text-yellow-800',
//             'NEGOTIATING': 'bg-orange-100 text-orange-800',
//             'CLOSED_WON': 'bg-green-100 text-green-800',
//             'CLOSED_LOST': 'bg-red-100 text-red-800',
//             'FOLLOW_UP': 'bg-purple-100 text-purple-800'
//         };
//         return colors[status] || 'bg-gray-100 text-gray-800';
//     };

//     return (
//         <div className="flex flex-col h-screen max-h-[800px] bg-white border border-gray-200 rounded-lg overflow-hidden">
//             {/* Header */}
//             <div className="bg-white border-b border-gray-200 p-4">
//                 {/* Connection Status Banner */}
//                 {!socketConnected && (
//                     <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2 mb-4">
//                         <div className="flex items-center justify-center space-x-2 text-yellow-800">
//                             <WifiOff className="h-4 w-4" />
//                             <span className="text-xs">
//                                 Offline mode - Messages will be sent when connection is restored
//                             </span>
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                         <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
//                             <ArrowLeft className="h-6 w-6" />
//                         </button>

//                         <div className="relative">
//                             <img
//                                 src={conversation.user?.profile?.avatar || '/default-avatar.png'}
//                                 alt="User"
//                                 className="h-10 w-10 rounded-full object-cover"
//                             />
//                             {onlineUsers.some(u => u.userId === conversation.user?._id) && (
//                                 <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
//                             )}
//                         </div>

//                         <div>
//                             <h3 className="font-semibold text-gray-900">
//                                 {conversation.user?.name}
//                             </h3>
//                             <div className="flex items-center space-x-2">
//                                 <p className="text-sm text-gray-500">
//                                     {conversation.property?.post_title}
//                                 </p>
//                                 {onlineUsers.some(u => u.userId === conversation.user?._id) && (
//                                     <span className="text-xs text-green-600">• Online</span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <div className={`flex items-center space-x-1 ${socketConnected ? 'text-green-600' : 'text-red-600'}`}>
//                             {socketConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
//                         </div>

//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeadStatusColor(leadStatus)}`}>
//                             {leadStatus.replace('_', ' ')}
//                         </span>

//                         <button
//                             onClick={() => setShowLeadUpdate(!showLeadUpdate)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                         >
//                             Update Lead
//                         </button>

//                         {conversation.user?.phone && (
//                             <button
//                                 onClick={() => window.open(`tel:${conversation.user.phone}`, '_self')}
//                                 className="p-2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <Phone className="h-5 w-5" />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Lead Update Panel */}
//                 {showLeadUpdate && (
//                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                         <div className="grid grid-cols-2 gap-4">
//                             <select
//                                 value={leadStatus}
//                                 onChange={(e) => setLeadStatus(e.target.value)}
//                                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="INQUIRY">Inquiry</option>
//                                 <option value="INTERESTED">Interested</option>
//                                 <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
//                                 <option value="NEGOTIATING">Negotiating</option>
//                                 <option value="CLOSED_WON">Closed Won</option>
//                                 <option value="CLOSED_LOST">Closed Lost</option>
//                                 <option value="FOLLOW_UP">Follow Up</option>
//                             </select>

//                             <input
//                                 type="text"
//                                 placeholder="Add notes..."
//                                 value={notes}
//                                 onChange={(e) => setNotes(e.target.value)}
//                                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div className="mt-3 flex justify-end space-x-2">
//                             <button
//                                 onClick={() => setShowLeadUpdate(false)}
//                                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleLeadUpdate}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             >
//                                 Update
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Property Info */}
//             <div className="bg-blue-50 border-b border-blue-100 p-3">
//                 <div className="flex items-center space-x-3">
//                     <img
//                         src={conversation.property?.post_images?.[0]?.url || '/placeholder-property.png'}
//                         alt="Property"
//                         className="h-12 w-12 rounded-lg object-cover"
//                     />
//                     <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">
//                             {conversation.property?.post_title}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             {conversation.property?.city}, {conversation.property?.locality}
//                         </p>
//                         {conversation.property?.price && (
//                             <p className="text-sm font-semibold text-blue-600">
//                                 ₹{conversation.property.price.toLocaleString('en-IN')}
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {isLoading ? (
//                     <div className="flex justify-center py-8">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     </div>
//                 ) : (
//                     messages.map((message, index) => (
//                         <div
//                             key={message._id || index}
//                             className={`flex ${message.sender === 'BUILDER' ? 'justify-end' : 'justify-start'}`}
//                         >
//                             <div
//                                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'BUILDER'
//                                     ? 'bg-blue-600 text-white'
//                                     : message.sender === 'SYSTEM'
//                                         ? 'bg-yellow-100 text-yellow-800 text-center'
//                                         : 'bg-gray-100 text-gray-900'
//                                     }`}
//                             >
//                                 <p className="text-sm">{message.message}</p>
//                                 <div className="flex items-center justify-between mt-1">
//                                     <span className="text-xs opacity-75">
//                                         {new Date(message.createdAt).toLocaleTimeString()}
//                                     </span>
//                                     {message.sender === 'BUILDER' && (
//                                         <span className="text-xs opacity-75">
//                                             {message.status === 'read' ? '✓✓' : '✓'}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}

//                 {/* Typing Indicator */}
//                 {userTyping && (
//                     <div className="flex justify-start">
//                         <div className="max-w-xs lg:max-w-md px-4 py-2 bg-gray-100 rounded-lg">
//                             <div className="flex items-center space-x-1">
//                                 <div className="flex space-x-1">
//                                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                                 </div>
//                                 <span className="text-xs text-gray-500 ml-2">typing...</span>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="border-t border-gray-200 p-4">
//                 <div className="flex items-center space-x-2">
//                     <button className="p-2 text-gray-400 hover:text-gray-600">
//                         <Paperclip className="h-5 w-5" />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-gray-600">
//                         <FileImage className="h-5 w-5" />
//                     </button>

//                     <div className="flex-1 relative">
//                         <textarea
//                             value={newMessage}
//                             onChange={handleTyping}
//                             onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
//                             placeholder="Type your response..."
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             rows="1"
//                             style={{ minHeight: '40px', maxHeight: '120px' }}
//                             disabled={isSending}
//                         />
//                     </div>

//                     <button
//                         onClick={sendMessage}
//                         disabled={!newMessage.trim() || isSending}
//                         className={`p-2 rounded-lg flex items-center ${socketConnected
//                             ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                             : 'bg-yellow-600 hover:bg-yellow-700 text-white'
//                             } disabled:opacity-50 disabled:cursor-not-allowed`}
//                         title={socketConnected ? 'Send message' : 'Send message (offline mode)'}
//                     >
//                         {isSending ? (
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         ) : (
//                             <Send className="h-5 w-5" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ===== PROPERTIES TAB =====

// const PropertiesTab = () => {
//     const [properties, setProperties] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [filters, setFilters] = useState({
//         status: '',
//         search: ''
//     });

//     useEffect(() => {
//         loadProperties();
//     }, [filters]);

//     const loadProperties = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const params = new URLSearchParams({
//                 page: 1,
//                 limit: 20,
//                 ...filters
//             });

//             const response = await fetch(`${base_url}/api/builders/properties?${params}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setProperties(data.data.properties);
//             }
//         } catch (error) {
//             console.error('Error loading properties:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow">
//             <div className="border-b border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
//                         <Plus className="h-5 w-5" />
//                         <span>Add Property</span>
//                     </button>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                         <Search className="h-5 w-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search properties..."
//                             value={filters.search}
//                             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                             className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <select
//                         value={filters.status}
//                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">All Status</option>
//                         <option value="listed">Listed</option>
//                         <option value="unlisted">Unlisted</option>
//                         <option value="sold">Sold</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Properties Grid */}
//             <div className="p-6">
//                 {isLoading ? (
//                     <div className="flex items-center justify-center py-12">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-gray-600">Loading properties...</span>
//                     </div>
//                 ) : properties.length === 0 ? (
//                     <div className="text-center py-12">
//                         <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">No properties found</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {properties.map((property) => (
//                             <div key={property._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
//                                 <img
//                                     src={property.post_images?.[0]?.url || '/placeholder-property.png'}
//                                     alt="Property"
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-4">
//                                     <h3 className="font-semibold text-gray-900 truncate">
//                                         {property.post_title}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         {property.city}, {property.locality}
//                                     </p>
//                                     <p className="text-lg font-bold text-blue-600 mt-2">
//                                         ₹{property.price?.toLocaleString('en-IN')}
//                                     </p>
//                                     <div className="flex items-center justify-between mt-4">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === 'listed'
//                                             ? 'bg-green-100 text-green-800'
//                                             : 'bg-gray-100 text-gray-800'
//                                             }`}>
//                                             {property.status}
//                                         </span>
//                                         <button className="text-blue-600 hover:text-blue-700 text-sm">
//                                             <Edit className="h-4 w-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// // ===== ANALYTICS TAB =====

// const AnalyticsTab = () => {
//     const [analytics, setAnalytics] = useState(null);
//     const [period, setPeriod] = useState('30d');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         loadAnalytics();
//     }, [period]);

//     const loadAnalytics = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/analytics?period=${period}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setAnalytics(data.data);
//             }
//         } catch (error) {
//             console.error('Error loading analytics:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <span className="ml-3 text-gray-600">Loading analytics...</span>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Period Selector */}
//             <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center justify-between">
//                     <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//                     <select
//                         value={period}
//                         onChange={(e) => setPeriod(e.target.value)}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="7d">Last 7 days</option>
//                         <option value="30d">Last 30 days</option>
//                         <option value="90d">Last 90 days</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-blue-100">
//                             <MessageCircle className="h-6 w-6 text-blue-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.summary?.totalInquiries || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-green-100">
//                             <CheckCircle className="h-6 w-6 text-green-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Closed Deals</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.summary?.totalClosed || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-purple-100">
//                             <TrendingUp className="h-6 w-6 text-purple-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.conversionRate || 0}%
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center">
//                         <div className="p-3 rounded-full bg-yellow-100">
//                             <Calendar className="h-6 w-6 text-yellow-600" />
//                         </div>
//                         <div className="ml-4">
//                             <p className="text-sm font-medium text-gray-600">Viewings Scheduled</p>
//                             <p className="text-2xl font-bold text-gray-900">
//                                 {analytics?.summary?.totalViewings || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Top Properties */}
//             <div className="bg-white rounded-lg shadow">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Top Performing Properties</h2>
//                 </div>
//                 <div className="p-6">
//                     {analytics?.propertyStats?.length === 0 ? (
//                         <p className="text-gray-500 text-center py-8">No data available</p>
//                     ) : (
//                         <div className="space-y-4">
//                             {analytics?.propertyStats?.map((property, index) => (
//                                 <div key={property._id} className="flex items-center justify-between">
//                                     <div>
//                                         <p className="font-medium text-gray-900">{property.propertyTitle}</p>
//                                         <p className="text-sm text-gray-500">
//                                             {property.inquiryCount} inquiries • {property.interestedCount} interested
//                                         </p>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="font-semibold text-green-600">{property.closedCount} closed</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ===== PROFILE TAB =====

// const ProfileTab = ({ builderData }) => {
//     const [profile, setProfile] = useState(builderData || {});
//     const [isEditing, setIsEditing] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSave = async () => {
//         try {
//             setIsLoading(true);
//             const token = JSON.parse(localStorage.getItem('user')).token;

//             const response = await fetch(`${base_url}/api/builders/profile`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(profile)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setProfile(data.data);
//                 setIsEditing(false);
//                 localStorage.setItem('builderData', JSON.stringify(data.data));
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                     <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
//                     {!isEditing ? (
//                         <button
//                             onClick={() => setIsEditing(true)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//                         >
//                             <Edit className="h-4 w-4" />
//                             <span>Edit Profile</span>
//                         </button>
//                     ) : (
//                         <div className="flex space-x-2">
//                             <button
//                                 onClick={() => setIsEditing(false)}
//                                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSave}
//                                 disabled={isLoading}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                             >
//                                 {isLoading ? 'Saving...' : 'Save Changes'}
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="p-6 space-y-6">
//                 {/* Basic Information */}
//                 <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Company Name
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     value={profile.company || ''}
//                                     onChange={(e) => setProfile({ ...profile, company: e.target.value })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.company || 'Not set'}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Contact Person
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     value={profile.name || ''}
//                                     onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.name || 'Not set'}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Experience (Years)
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     value={profile.experience || ''}
//                                     onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.experience || 0} years</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Established Year
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     value={profile.establishedYear || ''}
//                                     onChange={(e) => setProfile({ ...profile, establishedYear: parseInt(e.target.value) })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.establishedYear || 'Not set'}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Contact Numbers/Emails
//                             </label>
//                             {isEditing ? (
//                                 <textarea
//                                     value={profile.contacts?.join('\n') || ''}
//                                     onChange={(e) => setProfile({ ...profile, contacts: e.target.value.split('\n').filter(c => c.trim()) })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     rows="3"
//                                     placeholder="Enter one contact per line"
//                                 />
//                             ) : (
//                                 <div className="space-y-1">
//                                     {profile.contacts?.map((contact, index) => (
//                                         <p key={index} className="text-gray-900">{contact}</p>
//                                     )) || <p className="text-gray-500">No contacts added</p>}
//                                 </div>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Website
//                             </label>
//                             {isEditing ? (
//                                 <input
//                                     type="url"
//                                     value={profile.website || ''}
//                                     onChange={(e) => setProfile({ ...profile, website: e.target.value })}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             ) : (
//                                 <p className="text-gray-900">{profile.website || 'Not set'}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Notification Settings */}
//                 <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="font-medium text-gray-900">Email Notifications</p>
//                                 <p className="text-sm text-gray-500">Receive daily reports and inquiry alerts</p>
//                             </div>
//                             <input
//                                 type="checkbox"
//                                 checked={profile.emailNotifications?.dailyReport?.enabled || false}
//                                 onChange={(e) => setProfile({
//                                     ...profile,
//                                     emailNotifications: {
//                                         ...profile.emailNotifications,
//                                         dailyReport: {
//                                             ...profile.emailNotifications?.dailyReport,
//                                             enabled: e.target.checked
//                                         }
//                                     }
//                                 })}
//                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 disabled={!isEditing}
//                             />
//                         </div>

//                         {profile.emailNotifications?.dailyReport?.enabled && (
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Email Address for Reports
//                                 </label>
//                                 {isEditing ? (
//                                     <input
//                                         type="email"
//                                         value={profile.emailNotifications?.dailyReport?.email || ''}
//                                         onChange={(e) => setProfile({
//                                             ...profile,
//                                             emailNotifications: {
//                                                 ...profile.emailNotifications,
//                                                 dailyReport: {
//                                                     ...profile.emailNotifications?.dailyReport,
//                                                     email: e.target.value
//                                                 }
//                                             }
//                                         })}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 ) : (
//                                     <p className="text-gray-900">
//                                         {profile.emailNotifications?.dailyReport?.email || 'Not set'}
//                                     </p>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatInterface;


import { useEffect, useState, useRef, useCallback } from "react";
import io from 'socket.io-client';
import {
    MessageCircle,
    User,
    Clock,
    Star,
    Filter,
    Search,
    ChevronDown,
    Phone,
    Mail,
    MapPin,
    Calendar,
    TrendingUp,
    Eye,
    CheckCircle,
    Home,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    Plus,
    Edit,
    Send,
    Paperclip,
    FileImage,
    X,
    ArrowLeft,
    MoreVertical,
    Wifi,
    WifiOff,
    Menu
} from 'lucide-react';
import { base_url } from "@/utils/baseurl";

// Socket connection manager
let socket = null;

const connectSocket = (token) => {
    if (socket?.connected) return socket;

    socket = io(base_url, {
        auth: { token },
        autoConnect: true,
        transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
        console.log('✅ Socket connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
    });

    socket.on('disconnect', (reason) => {
        console.log('🔌 Socket disconnected:', reason);
    });

    return socket;
};

const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

// ===== BUILDER MAIN DASHBOARD =====

const ChatInterface = () => {
    const [activeTab, setActiveTab] = useState('conversations');
    const [builderData, setBuilderData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');

        if (userData) {
            const token = JSON.parse(userData).token;
            // console.log("token", token)
            setBuilderData(JSON.parse(userData));
            setIsAuthenticated(true);

            // Connect socket
            const socketInstance = connectSocket(token);

            socketInstance.on('connect', () => setSocketConnected(true));
            socketInstance.on('disconnect', () => setSocketConnected(false));
        }

        return () => {
            // Don't disconnect on unmount, keep connection alive for real-time updates
        };
    }, []);

    const handleLogin = (data) => {
        setBuilderData(data.builder);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('builderToken');
        localStorage.removeItem('builderData');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setBuilderData(null);
        disconnectSocket();
        setSocketConnected(false);
    };

    return (
        <div className="max-h-screen bg-gray-50">

            {/* Mobile Navigation Menu */}
            {showMobileMenu && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileMenu(false)}>
                    <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 bg-blue-600 text-white">
                            <h2 className="text-xl font-bold">{builderData?.name || 'Builder'}</h2>
                            <p className="text-sm opacity-90">{builderData?.company || 'Dashboard'}</p>
                        </div>
                        <div className="p-2 space-y-1">
                            <button
                                onClick={() => { setActiveTab('conversations'); setShowMobileMenu(false); }}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeTab === 'conversations' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <MessageCircle className="h-5 w-5" />
                                <span className="font-medium">Conversations</span>
                            </button>
                            <button
                                onClick={() => { setActiveTab('properties'); setShowMobileMenu(false); }}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeTab === 'properties' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <Home className="h-5 w-5" />
                                <span className="font-medium">Properties</span>
                            </button>
                            <button
                                onClick={() => { setActiveTab('analytics'); setShowMobileMenu(false); }}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <BarChart3 className="h-5 w-5" />
                                <span className="font-medium">Analytics</span>
                            </button>
                            <button
                                onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <User className="h-5 w-5" />
                                <span className="font-medium">Profile</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* Main Content */}
            <main className="h-[calc(100vh-140px)] lg:h-[calc(100vh-90px)] overflow-none">
                <div className="max-w-7xl mx-auto h-full">
                    {activeTab === 'conversations' && <ConversationsTab socketConnected={socketConnected} />}
                    {activeTab === 'properties' && <PropertiesTab />}
                    {activeTab === 'analytics' && <AnalyticsTab />}
                    {activeTab === 'profile' && <ProfileTab builderData={builderData} />}
                </div>
            </main>
        </div>
    );
};

// ===== CONVERSATIONS TAB =====

const ConversationsTab = ({ socketConnected }) => {
    const [conversations, setConversations] = useState([]);
    const [stats, setStats] = useState({});
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [unreadMessages, setUnreadMessages] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadConversations();
    }, [filters]);

    // Listen for real-time conversation updates
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            const { message, conversationId } = data;

            // Update conversations list with latest message
            setConversations(prev => prev.map(conv => {
                if (conv.conversationId === conversationId) {
                    return {
                        ...conv,
                        lastMessage: message,
                        unreadCount: {
                            ...conv.unreadCount,
                            builder: (conv.unreadCount?.builder || 0) + (message.sender !== 'BUILDER' ? 1 : 0)
                        }
                    };
                }
                return conv;
            }));

            // Update unread count for notifications
            if (message.sender !== 'BUILDER') {
                setUnreadMessages(prev => ({
                    ...prev,
                    [conversationId]: (prev[conversationId] || 0) + 1
                }));
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket]);

    const loadConversations = async () => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).token;

            const params = new URLSearchParams({
                page: 1,
                limit: 20,
                ...filters
            });

            const response = await fetch(`${base_url}/api/builders/conversations?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setConversations(data.data.conversations);
                setStats(data.data.stats);
            }
        } catch (error) {
            console.error('Error loading conversations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateLeadStatus = async (conversationId, leadStatus, notes = '') => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;

            const response = await fetch(`${base_url}/api/builders/conversations/${conversationId}/lead-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ leadStatus, notes })
            });

            if (response.ok) {
                loadConversations();
            }
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
        if (diffInHours < 168) return date.toLocaleDateString('en-US', { weekday: 'short' });
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getLeadStatusColor = (status) => {
        const colors = {
            'INQUIRY': 'bg-blue-100 text-blue-800',
            'INTERESTED': 'bg-green-100 text-green-800',
            'VIEWING_SCHEDULED': 'bg-yellow-100 text-yellow-800',
            'NEGOTIATING': 'bg-orange-100 text-orange-800',
            'CLOSED_WON': 'bg-green-100 text-green-800',
            'CLOSED_LOST': 'bg-red-100 text-red-800',
            'FOLLOW_UP': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (selectedConversation) {
        return (
            <ConversationView
                conversation={selectedConversation}
                onBack={() => setSelectedConversation(null)}
                onUpdateLead={updateLeadStatus}
                socketConnected={socketConnected}
            />
        );
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Connection Status Banner */}
            {/* {!socketConnected && (
                <div className="bg-yellow-50 border-b border-yellow-200 p-2 lg:p-3">
                    <div className="flex items-center justify-center space-x-2 text-yellow-800">
                        <WifiOff className="h-4 w-4 lg:h-5 lg:w-5" />
                        <span className="text-xs lg:text-sm font-medium">
                            Connection lost - Messages may not update in real-time
                        </span>
                    </div>
                </div>
            )} */}

            {/* Stats Header - Desktop */}
            <div className="hidden lg:block border-b border-gray-200 p-6">



                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>




                </div>
            </div>

            {/* Mobile Search & Filter */}
            <div className="lg:hidden border-b border-gray-200 p-3 bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-2">
                    <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="ml-2 bg-transparent flex-1 text-sm focus:outline-none"
                        />
                    </div>
                    
                </div>

                {/* Mobile Filters Dropdown */}
                {/* {showFilters && (
                    <div className="mt-3 space-y-2">
                        <select
                            value={filters.leadStatus}
                            onChange={(e) => setFilters({ ...filters, leadStatus: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Lead Status</option>
                            <option value="INQUIRY">Inquiry</option>
                            <option value="INTERESTED">Interested</option>
                            <option value="VIEWING_SCHEDULED">Viewing Scheduled</option>
                            <option value="NEGOTIATING">Negotiating</option>
                            <option value="CLOSED_WON">Closed Won</option>
                            <option value="CLOSED_LOST">Closed Lost</option>
                            <option value="FOLLOW_UP">Follow Up</option>
                        </select>
                    </div>
                )} */}
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading conversations...</span>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No conversations found</p>
                    </div>
                ) : (
                    conversations.map((conversation) => (
                        <div
                            key={conversation._id}
                            onClick={() => {
                                setSelectedConversation(conversation);
                                setUnreadMessages(prev => ({ ...prev, [conversation.conversationId]: 0 }));
                            }}
                            className="border-b border-gray-200 p-3 sm:px-4 sm:py-3 lg:px-6 lg:py-5 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
                        >
                            <div className="flex items-start space-x-3">
                                {/* Avatar */}
                                <div className="flex-shrink-0 relative h-10 w-10 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                                    {conversation?.user?.name ? (
                                        <div className="rounded-full bg-blue-200 flex items-center justify-center h-full w-full">
                                            <span className="text-blue-700 font-medium text-lg">
                                                {conversation.user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="rounded-full bg-gray-200 flex items-center justify-center h-full w-full">
                                            <span className="text-gray-600 font-medium text-lg">AU</span>
                                        </div>
                                    )}
                                </div>


                                {/* Conversation info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base lg:text-base">
                                                    {conversation.user?.name || 'Anonymous User'}
                                                </h3>
                                                <span className="mx-1 sm:mx-2 hidden sm:inline">|</span>
                                                <p className="text-xs sm:text-sm text-gray-600 truncate">
                                                    {conversation.property?.post_title}
                                                </p>
                                            </div>

                                            <div className=" flex md:hidden items-center gap-2 mt-1 sm:mt-0">
                                                {((conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)) > 0 && (
                                                    <div className="bg-green-500 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold">
                                                        {(conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)}
                                                    </div>
                                                )}
                                                <span className="text-xs text-gray-500 flex-shrink-0">
                                                    {formatTime(conversation.lastMessage?.sentAt)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex items-center gap-2 mt-1 sm:mt-0">
                                            {((conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)) > 0 && (
                                                <div className="bg-green-500 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold">
                                                    {(conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)}
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-500 flex-shrink-0">
                                                {formatTime(conversation.lastMessage?.sentAt)}
                                            </span>
                                        </div>

                                        {/* <div className=" flex md:hidden items-center gap-2 mt-1 sm:mt-0">
                                            {((conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)) > 0 && (
                                                <div className="bg-green-500 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold">
                                                    {(conversation.unreadCount?.builder || 0) + (unreadMessages[conversation.conversationId] || 0)}
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-500 flex-shrink-0">
                                                {formatTime(conversation.lastMessage?.sentAt)}
                                            </span>
                                        </div> */}
                                    </div>

                                    <p className="text-xs sm:text-sm text-black truncate">
                                        {conversation.lastMessage?.message || 'No messages yet'}
                                    </p>

                                    {/* {conversation.user?.phone && (
                                        <div className="mt-2 sm:mt-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(`tel:${conversation.user.phone}`, '_self');
                                                }}
                                                className="text-xs sm:text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 sm:inline-block lg:hidden"
                                            >
                                                Call
                                            </button>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

// ===== INDIVIDUAL CONVERSATION VIEW =====

const ConversationView = ({ conversation, onBack, onUpdateLead, socketConnected }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [leadStatus, setLeadStatus] = useState(conversation.leadStatus);
    const [notes, setNotes] = useState('');
    const [showLeadUpdate, setShowLeadUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [userTyping, setUserTyping] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [showPropertyInfo, setShowPropertyInfo] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        loadMessages();

        // Join conversation room when component mounts
        if (socket && socketConnected) {
            joinConversation();
        }

        return () => {
            // Leave conversation room when component unmounts
            if (socket && conversation.conversationId) {
                socket.emit('leaveConversation', {
                    conversationId: conversation.conversationId
                });
            }
        };
    }, [conversation.conversationId, socketConnected]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Socket event listeners
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            if (data.conversationId === conversation.conversationId) {
                setMessages(prev => [...prev, data.message]);
                scrollToBottom();
            }
        };

        const handleUserTyping = (data) => {
            if (data.conversationId === conversation.conversationId && data.userId !== JSON.parse(localStorage.getItem('user')).id) {
                setUserTyping(data.isTyping);
            }
        };

        const handleUserOnline = (data) => {
            if (data.conversationId === conversation.conversationId) {
                setOnlineUsers(prev => [...prev.filter(u => u.userId !== data.userId), data]);
            }
        };

        const handleUserOffline = (data) => {
            if (data.conversationId === conversation.conversationId) {
                setOnlineUsers(prev => prev.filter(u => u.userId !== data.userId));
            }
        };

        const handleMessagesRead = (data) => {
            if (data.conversationId === conversation.conversationId) {
                setMessages(prev => prev.map(msg => ({
                    ...msg,
                    status: 'read'
                })));
            }
        };

        const handleJoinedConversation = (data) => {
            console.log('✅ Successfully joined conversation:', data);
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('userTyping', handleUserTyping);
        socket.on('userOnline', handleUserOnline);
        socket.on('userOffline', handleUserOffline);
        socket.on('messagesRead', handleMessagesRead);
        socket.on('joinedConversation', handleJoinedConversation);
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('userTyping', handleUserTyping);
            socket.off('userOnline', handleUserOnline);
            socket.off('userOffline', handleUserOffline);
            socket.off('messagesRead', handleMessagesRead);
            socket.off('joinedConversation', handleJoinedConversation);
            socket.off('error');
        };
    }, [socket, conversation.conversationId]);

    const joinConversation = () => {
        if (socket && conversation.conversationId) {
            console.log('🏠 Joining conversation:', conversation.conversationId);
            socket.emit('joinConversation', {
                conversationId: conversation.conversationId
            });
        }
    };

    const loadMessages = async () => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).token;

            const response = await fetch(`${base_url}/api/builders/conversations/${conversation.conversationId}/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data.data.messages);

                // Mark messages as read via socket
                if (socket && socketConnected) {
                    socket.emit('markAsRead', {
                        conversationId: conversation.conversationId
                    });
                }
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        const messageToSend = newMessage.trim();
        setNewMessage('');

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        try {
            // Send via socket for real-time delivery
            if (socket && socketConnected) {
                socket.emit('sendMessage', {
                    conversationId: conversation.conversationId,
                    message: messageToSend,
                    messageType: 'TEXT',
                    attachments: []
                });
            } else {
                // Fallback to REST API if socket not connected
                const token = JSON.parse(localStorage.getItem('user')).token;
                const response = await fetch(`${base_url}/api/builders/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        conversationId: conversation.conversationId,
                        message: messageToSend,
                        messageType: 'TEXT'
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(prev => [...prev, data.data]);
                    scrollToBottom();
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setNewMessage(messageToSend);
        } finally {
            setIsSending(false);
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);

        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }

        if (!socket || !socketConnected) return;

        // Send typing indicator
        if (e.target.value.length > 0 && !isTyping) {
            setIsTyping(true);
            socket.emit('typing', {
                conversationId: conversation.conversationId,
                isTyping: true
            });
        }

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set timeout to stop typing indicator
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            if (socket && socketConnected) {
                socket.emit('typing', {
                    conversationId: conversation.conversationId,
                    isTyping: false
                });
            }
        }, 2000);
    };

    const handleLeadUpdate = async () => {
        try {
            await onUpdateLead(conversation.conversationId, leadStatus, notes);
            setShowLeadUpdate(false);
            setNotes('');
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const getLeadStatusColor = (status) => {
        const colors = {
            'INQUIRY': 'bg-blue-100 text-blue-800',
            'INTERESTED': 'bg-green-100 text-green-800',
            'VIEWING_SCHEDULED': 'bg-yellow-100 text-yellow-800',
            'NEGOTIATING': 'bg-orange-100 text-orange-800',
            'CLOSED_WON': 'bg-green-100 text-green-800',
            'CLOSED_LOST': 'bg-red-100 text-red-800',
            'FOLLOW_UP': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-3 py-2 lg:px-6 lg:py-2 sticky top-0 z-20 lg:static">
                {/* Connection Status Banner */}
                {/* {!socketConnected && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                        <div className="flex items-center justify-center space-x-2 text-yellow-800">
                            <WifiOff className="h-4 w-4" />
                            <span className="text-xs">
                                Offline mode - Messages will be sent when connection is restored
                            </span>
                        </div>
                    </div>
                )} */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 lg:text-gray-400 lg:hover:text-gray-600">
                            <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6" />
                        </button>

                        <div
                            className="relative cursor-pointer"
                            onClick={() => setShowPropertyInfo(!showPropertyInfo)}
                        >
                            {/* <img
                                src={conversation.user?.profile?.avatar || 'https://via.placeholder.com/40'}
                                alt="User"
                                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover"
                            /> */}

                            {conversation.user?.profile?.avatar ? (
                                <img
                                    src={conversation.user.profile.avatar}
                                    alt="User"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-400 text-white font-bold flex items-center justify-center uppercase text-lg">
                                    {conversation.user?.name?.charAt(0) || "U"}
                                </div>
                            )}

                            {onlineUsers.some(u => u.userId === conversation.user?._id) && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                                {conversation.user?.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <p className="text-xs lg:text-xs text-gray-500 truncate">
                                    {conversation.property?.post_title}
                                </p>
                                {onlineUsers.some(u => u.userId === conversation.user?._id) && (
                                    <span className="text-xs text-green-600 flex-shrink-0">• Online</span>
                                )}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={conversation.property?.post_images?.[0]?.url || 'https://via.placeholder.com/48'}
                                    alt="Property"
                                    className="h-12 w-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate text-xs">
                                        {conversation.property?.post_title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {conversation.property?.city}, {conversation.property?.locality}
                                    </p>
                                    {conversation.property?.price && (
                                        <p className="text-sm font-semibold text-blue-600">
                                            ₹{conversation.property.price.toLocaleString('en-IN')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-2">
                        {conversation.user?.phone && (
                            <button
                                onClick={() => window.open(`tel:${conversation.user.phone}`, '_self')}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                            >
                                <Phone className="h-4 w-4 lg:h-5 lg:w-5" />
                            </button>
                        )}

                        {/* <button
                            onClick={() => setShowLeadUpdate(!showLeadUpdate)}
                            className="hidden lg:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                        >
                            <MoreVertical className="h-5 w-5" />
                        </button> */}
                    </div>
                </div>


            </div>

            {/* Property Info - Mobile Expandable */}
            {showPropertyInfo && (
                <div className="lg:hidden bg-blue-50 border-b border-blue-100 p-3">
                    <div className="flex items-center space-x-3">
                        <img
                            src={conversation.property?.post_images?.[0]?.url || 'https://via.placeholder.com/48'}
                            alt="Property"
                            className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate text-sm">
                                {conversation.property?.post_title}
                            </p>
                            <p className="text-xs text-gray-500">
                                {conversation.property?.city}, {conversation.property?.locality}
                            </p>
                            {conversation.property?.price && (
                                <p className="text-sm font-semibold text-blue-600">
                                    ₹{conversation.property.price.toLocaleString('en-IN')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Property Info - Desktop */}
            {/* <div className="hidden lg:block bg-blue-50 border-b border-blue-100 p-3">
                <div className="flex items-center space-x-3">
                    <img
                        src={conversation.property?.post_images?.[0]?.url || 'https://via.placeholder.com/48'}
                        alt="Property"
                        className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                            {conversation.property?.post_title}
                        </p>
                        <p className="text-sm text-gray-500">
                            {conversation.property?.city}, {conversation.property?.locality}
                        </p>
                        {conversation.property?.price && (
                            <p className="text-sm font-semibold text-blue-600">
                                ₹{conversation.property.price.toLocaleString('en-IN')}
                            </p>
                        )}
                    </div>
                </div>
            </div> */}

            {/* Messages - WhatsApp style */}
            <div
                className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2 lg:space-y-3"
                // style={{
                //     backgroundImage: 'linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px)',
                //     backgroundSize: '100% 20px'
                // }}
            >
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={message._id || index}
                            className={`flex ${message.sender === 'BUILDER' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] lg:max-w-md px-3 py-2 rounded-lg shadow-sm ${message.sender === 'BUILDER'
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : message.sender === 'SYSTEM'
                                        ? 'bg-yellow-100 text-yellow-800 text-center text-xs'
                                        : 'bg-white text-gray-900 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm break-words">{message.message}</p>
                                <div className={`flex items-center justify-end mt-1 space-x-1 ${message.sender === 'BUILDER' ? 'text-white' : 'text-gray-500'}`}>
                                    <span className="text-xs opacity-75">
                                        {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span>
                                    {message.sender === 'BUILDER' && (
                                        <span className="text-xs">
                                            {message.status === 'read' ? '✓✓' : '✓'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {/* Typing Indicator */}
                {userTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-[85%] lg:max-w-md px-4 py-3 bg-white rounded-lg rounded-bl-none shadow-sm">
                            <div className="flex items-center space-x-1">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Message Input - WhatsApp style */}
            <div className="border-t border-gray-200 p-2 lg:px-4 lg:py-1 bg-gray-50">
                <div className="flex items-end space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 mb-1">
                        <Plus className="h-5 w-5 lg:h-6 lg:w-6" />
                    </button>

                    <div className="flex-1 bg-white rounded-full border border-gray-300 px-4 py-2 flex items-center">
                        <textarea
                            ref={textareaRef}
                            value={newMessage}
                            onChange={handleTyping}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent resize-none focus:outline-none text-sm lg:text-base"
                            rows="1"
                            style={{ maxHeight: '120px' }}
                            disabled={isSending}
                        />
                    </div>

                    <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || isSending}
                        className={`p-2 lg:p-3 rounded-full flex items-center justify-center mb-1 ${socketConnected
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-yellow-600 hover:bg-yellow-700'
                            } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                    >
                        {isSending ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ===== PROPERTIES TAB =====

const PropertiesTab = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: '',
        search: ''
    });

    useEffect(() => {
        loadProperties();
    }, [filters]);

    const loadProperties = async () => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).token;

            const params = new URLSearchParams({
                page: 1,
                limit: 20,
                ...filters
            });

            const response = await fetch(`${base_url}/api/builders/properties?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProperties(data.data.properties);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full overflow-y-auto bg-white rounded-lg shadow">
            <div className="border-b border-gray-200 p-4 lg:p-6 sticky top-0 bg-white z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Properties</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>Add Property</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="ml-2 bg-transparent flex-1 text-sm focus:outline-none"
                        />
                    </div>

                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="listed">Listed</option>
                        <option value="unlisted">Unlisted</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="p-4 lg:p-6">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading properties...</span>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-12">
                        <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No properties found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {properties.map((property) => (
                            <div key={property._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                <img
                                    src={property.post_images?.[0]?.url || 'https://via.placeholder.com/400x300'}
                                    alt="Property"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate">
                                        {property.post_title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {property.city}, {property.locality}
                                    </p>
                                    <p className="text-lg font-bold text-blue-600 mt-2">
                                        ₹{property.price?.toLocaleString('en-IN')}
                                    </p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === 'listed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {property.status}
                                        </span>
                                        <button className="text-blue-600 hover:text-blue-700 text-sm p-2 hover:bg-blue-50 rounded">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ===== ANALYTICS TAB =====

const AnalyticsTab = () => {
    const [analytics, setAnalytics] = useState(null);
    const [period, setPeriod] = useState('30d');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, [period]);

    const loadAnalytics = async () => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).token;

            const response = await fetch(`${base_url}/api/builders/analytics?period=${period}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data.data);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading analytics...</span>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto space-y-4 lg:space-y-6 p-2 lg:p-0">
            {/* Period Selector */}
            <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Analytics</h1>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <div className="p-2 lg:p-3 rounded-full bg-blue-100 mb-2 lg:mb-0 w-fit">
                            <MessageCircle className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                        </div>
                        <div className="lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600">Total Inquiries</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900">
                                {analytics?.summary?.totalInquiries || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <div className="p-2 lg:p-3 rounded-full bg-green-100 mb-2 lg:mb-0 w-fit">
                            <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                        </div>
                        <div className="lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600">Closed Deals</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900">
                                {analytics?.summary?.totalClosed || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <div className="p-2 lg:p-3 rounded-full bg-purple-100 mb-2 lg:mb-0 w-fit">
                            <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                        </div>
                        <div className="lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600">Conversion Rate</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900">
                                {analytics?.conversionRate || 0}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <div className="p-2 lg:p-3 rounded-full bg-yellow-100 mb-2 lg:mb-0 w-fit">
                            <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
                        </div>
                        <div className="lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600">Viewings Scheduled</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900">
                                {analytics?.summary?.totalViewings || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Properties */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                    <h2 className="text-base lg:text-lg font-semibold text-gray-900">Top Performing Properties</h2>
                </div>
                <div className="p-4 lg:p-6">
                    {analytics?.propertyStats?.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No data available</p>
                    ) : (
                        <div className="space-y-4">
                            {analytics?.propertyStats?.map((property, index) => (
                                <div key={property._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-2">
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm lg:text-base">{property.propertyTitle}</p>
                                        <p className="text-xs lg:text-sm text-gray-500">
                                            {property.inquiryCount} inquiries • {property.interestedCount} interested
                                        </p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="font-semibold text-green-600">{property.closedCount} closed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ===== PROFILE TAB =====

const ProfileTab = ({ builderData }) => {
    const [profile, setProfile] = useState(builderData || {});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).token;

            const response = await fetch(`${base_url}/api/builders/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data.data);
                setIsEditing(false);
                localStorage.setItem('builderData', JSON.stringify(data.data));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full overflow-y-auto bg-white rounded-lg shadow">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Profile Settings</h1>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                        >
                            <Edit className="h-4 w-4" />
                            <span>Edit Profile</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 lg:p-6 space-y-6">
                {/* Basic Information */}
                <div>
                    <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profile.company || ''}
                                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{profile.company || 'Not set'}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Person
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profile.name || ''}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{profile.name || 'Not set'}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience (Years)
                            </label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={profile.experience || ''}
                                    onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{profile.experience || 0} years</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Established Year
                            </label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={profile.establishedYear || ''}
                                    onChange={(e) => setProfile({ ...profile, establishedYear: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{profile.establishedYear || 'Not set'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Numbers/Emails
                            </label>
                            {isEditing ? (
                                <textarea
                                    value={profile.contacts?.join('\n') || ''}
                                    onChange={(e) => setProfile({ ...profile, contacts: e.target.value.split('\n').filter(c => c.trim()) })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Enter one contact per line"
                                />
                            ) : (
                                <div className="space-y-1">
                                    {profile.contacts?.map((contact, index) => (
                                        <p key={index} className="text-gray-900">{contact}</p>
                                    )) || <p className="text-gray-500">No contacts added</p>}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            {isEditing ? (
                                <input
                                    type="url"
                                    value={profile.website || ''}
                                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900">{profile.website || 'Not set'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive daily reports and inquiry alerts</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={profile.emailNotifications?.dailyReport?.enabled || false}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    emailNotifications: {
                                        ...profile.emailNotifications,
                                        dailyReport: {
                                            ...profile.emailNotifications?.dailyReport,
                                            enabled: e.target.checked
                                        }
                                    }
                                })}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                disabled={!isEditing}
                            />
                        </div>

                        {profile.emailNotifications?.dailyReport?.enabled && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address for Reports
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={profile.emailNotifications?.dailyReport?.email || ''}
                                        onChange={(e) => setProfile({
                                            ...profile,
                                            emailNotifications: {
                                                ...profile.emailNotifications,
                                                dailyReport: {
                                                    ...profile.emailNotifications?.dailyReport,
                                                    email: e.target.value
                                                }
                                            }
                                        })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-900">
                                        {profile.emailNotifications?.dailyReport?.email || 'Not set'}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
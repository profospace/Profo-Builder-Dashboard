import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, MoreVertical, ArrowLeft, User, MapPin, Clock } from 'lucide-react';
import io from 'socket.io-client';
import { base_url } from '../utils/baseurl';

const BuilderChatPage = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [stats, setStats] = useState({ totalChats: 0, unreadChats: 0 });
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


    // Mock builder data - replace with actual auth data
    const [currentBuilder] = useState({
        ...getUserFromLocalStorage,
        token: 'mock-jwt-token'
    });

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:5029', {
            transports: ['websocket']
        });

        setSocket(newSocket);

        // Authenticate builder
        newSocket.emit('authenticate', {
            token: currentBuilder.token,
            userType: 'builder'
        });

        newSocket.on('authenticated', (data) => {
            setIsConnected(true);
            console.log('Authenticated:', data);
            loadChats();
            loadStats();
        });

        newSocket.on('authentication_error', (error) => {
            console.error('Authentication failed:', error);
        });

        newSocket.on('new_message', (message) => {
            setMessages(prev => [...prev, message]);
            scrollToBottom();
            loadStats(); // Update unread count
        });

        newSocket.on('chat_history', (data) => {
            setMessages(data.messages);
            setCurrentChat(data.chat);
            scrollToBottom();
        });

        newSocket.on('user_typing', (data) => {
            if (data.userType === 'user') {
                setIsTyping(data.isTyping);
            }
        });

        newSocket.on('user_online', (data) => {
            console.log('User online:', data);
        });

        newSocket.on('user_offline', (data) => {
            console.log('User offline:', data);
        });

        newSocket.on('messages_read', (data) => {
            console.log('Messages read by:', data.readerType);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const loadChats = async () => {
        try {
            const response = await fetch(`${base_url}/api/chats`, {
                headers: {
                    'Authorization': `Bearer ${currentBuilder.token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setChats(data.chats);
            }
        } catch (error) {
            console.error('Failed to load chats:', error);
        }
    };

    const loadStats = async () => {
        try {
            const response = await fetch(`${base_url}/api/stats`, {
                headers: {
                    'Authorization': `Bearer ${currentBuilder.token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const joinChat = (userId, builderId) => {
        if (socket) {
            socket.emit('join_chat', { userId, builderId });
            setSelectedChatId(`${userId}_${builderId}`);
        }
    };

    const sendMessage = () => {
        if (newMessage.trim() && socket && selectedChatId) {
            const [userId, builderId] = selectedChatId.split('_');
            socket.emit('send_message', {
                userId,
                builderId,
                text: newMessage.trim(),
                messageType: 'text'
            });
            setNewMessage('');
        }
    };

    const handleTyping = () => {
        if (socket && selectedChatId) {
            const [userId, builderId] = selectedChatId.split('_');
            socket.emit('typing_start', { userId, builderId });

            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit('typing_stop', { userId, builderId });
            }, 1000);
        }
    };

    const formatLastSeen = (date) => {
        if (!date) return 'Never';
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Chat List Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-xl font-semibold text-gray-800">Customer Messages</h1>
                        {stats.unreadChats > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {stats.unreadChats} new
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
                        Connected: {isConnected ? 'Yes' : 'No'} • {stats.totalChats} conversations
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{stats.totalChats}</div>
                            <div className="text-xs text-gray-500">Total Chats</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{stats.unreadChats}</div>
                            <div className="text-xs text-gray-500">Unread</div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {chats.length === 0 ? (
                        <div className="p-4 text-center">
                            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 mb-2">No customer conversations yet</p>
                            <p className="text-sm text-gray-400">Customers will appear here when they contact you</p>
                        </div>
                    ) : (
                        chats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => joinChat(chat.user._id, currentBuilder._id)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChatId === `${chat.user._id}_${currentBuilder._id}` ? 'bg-blue-50 border-blue-200' : ''
                                    } ${chat.unreadCount?.builder > 0 ? 'bg-blue-25' : ''}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img
                                            src={chat.user.profile?.avatar || '/api/placeholder/40/40'}
                                            alt={chat.user.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h3 className={`font-medium truncate ${chat.unreadCount?.builder > 0 ? 'text-gray-900 font-semibold' : 'text-gray-900'
                                                }`}>
                                                {chat.user.name || 'Unknown User'}
                                            </h3>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-gray-500">
                                                    {chat.lastMessage?.timestamp ?
                                                        new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                        : ''
                                                    }
                                                </span>
                                                {chat.unreadCount?.builder > 0 && (
                                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-1">
                                                        <span className="text-xs text-white font-medium">{chat.unreadCount.builder}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-gray-500">{chat.user.email}</span>
                                            {chat.user.phone && (
                                                <span className="text-xs text-gray-400">• {chat.user.phone}</span>
                                            )}
                                        </div>
                                        {chat.lastMessage && (
                                            <p className={`text-sm truncate mt-1 ${chat.unreadCount?.builder > 0 ? 'text-gray-800 font-medium' : 'text-gray-600'
                                                }`}>
                                                {chat.lastMessage.sender === 'user' ? '' : 'You: '}
                                                {chat.lastMessage.text}
                                            </p>
                                        )}
                                        {chat.context?.propertyId && (
                                            <div className="flex items-center mt-1">
                                                <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                                                <span className="text-xs text-gray-500">
                                                    Property inquiry: {chat.context.propertyId.slice(-8)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {currentChat || selectedChatId ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <img
                                        src={currentChat?.user?.profile?.avatar || '/api/placeholder/40/40'}
                                        alt={currentChat?.user?.name || 'User'}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {currentChat?.user?.name || 'Customer'}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <p className="text-sm text-gray-500">
                                                {isTyping ? 'Typing...' : `Last seen ${formatLastSeen(currentChat?.lastSeen?.user)}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-full" title="Call Customer">
                                        <Phone className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Customer ID</p>
                                        <p className="text-sm font-mono text-gray-700">
                                            {currentChat?.user?._id?.slice(-8) || selectedChatId?.split('_')[0]?.slice(-8)}
                                        </p>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <MoreVertical className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Customer Info Bar */}
                            {currentChat?.user && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-600">
                                                📧 {currentChat.user.email}
                                            </span>
                                            {currentChat.user.phone && (
                                                <span className="text-gray-600">
                                                    📱 {currentChat.user.phone}
                                                </span>
                                            )}
                                        </div>
                                        {currentChat.context?.propertyId && (
                                            <span className="text-blue-600 font-medium">
                                                🏢 Property: {currentChat.context.propertyId.slice(-8)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender?.type === 'builder' ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender?.type === 'builder' ? 'flex-row-reverse space-x-reverse' : ''
                                        }`}>
                                        <img
                                            src={
                                                message.sender?.type === 'builder'
                                                    ? currentBuilder.logo
                                                    : message.sender?.avatar || '/api/placeholder/32/32'
                                            }
                                            alt={message.sender?.name || 'User'}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div className={`px-4 py-2 rounded-lg ${message.sender?.type === 'builder'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-900'
                                            }`}>
                                            <p className="text-sm">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.sender?.type === 'builder' ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Response Templates */}
                        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                            <div className="flex space-x-2 overflow-x-auto">
                                {[
                                    'Thank you for your interest!',
                                    'I can schedule a site visit',
                                    'Let me get those details for you',
                                    'Our team will contact you soon'
                                ].map((template, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setNewMessage(template)}
                                        className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                                    >
                                        {template}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-4">
                            <div className="flex items-end space-x-3">
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => {
                                                setNewMessage(e.target.value);
                                                handleTyping();
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    sendMessage();
                                                }
                                            }}
                                            placeholder="Type your response to customer..."
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                        <div className="absolute right-3 top-3 text-gray-400">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-500">
                                            Responding as: {currentBuilder.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Press Enter to send
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Welcome Screen */
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center max-w-md">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <User className="w-12 h-12 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Customer Support Center</h2>
                            <p className="text-gray-600 mb-6">
                                Manage all customer conversations in one place. Select a conversation from the sidebar to start responding to customer inquiries.
                            </p>
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalChats}</div>
                                        <div className="text-sm text-gray-600">Total Conversations</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-red-600 mb-2">{stats.unreadChats}</div>
                                        <div className="text-sm text-gray-600">Unread Messages</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <h3 className="font-medium text-yellow-800 mb-2">💡 Pro Tips:</h3>
                                <ul className="text-sm text-yellow-700 space-y-1 text-left">
                                    <li>• Respond quickly to increase customer engagement</li>
                                    <li>• Use quick response templates for common queries</li>
                                    <li>• Customer details are shown in the chat header</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuilderChatPage;
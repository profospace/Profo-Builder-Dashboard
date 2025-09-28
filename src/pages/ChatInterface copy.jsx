import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, ArrowLeft, MoreVertical, Image, Paperclip } from 'lucide-react';
import io from 'socket.io-client';
import { base_url } from '@/utils/baseurl';

const ChatInterface = ({ propertyId = '68bd3d9a84c3d1e33ba8b123', builderId = '67f777a6566ca9e7ea88c593', userType = 'BUILDER' }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversation, setConversation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    console.log("conversation", conversation)
    const typingTimeoutRef = useRef(null);
    console.log("onlineusers", onlineUsers)

    const [conversationId, setConversationId] = useState(null)




    // Initialize socket connection
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        console.log("token", token)
        if (!token) return;

        const socketInstance = io(base_url, {
            auth: { token }
        });

        socketInstance.on('connect', () => {
            console.log('Connected to chat server');
            if (conversationId) {
                socketInstance.emit('joinConversation', { conversationId });
                console.log("conversationId", conversationId)
            }
        });

        // Listen for join confirmation
        socketInstance.on('joinedConversation', (data) => {
            console.log('✅ Successfully joined conversation:', data);
        });

        socketInstance.on('newMessage', (data) => {
            setMessages(prev => [...prev, data.message]);
            scrollToBottom();
        });

        socketInstance.on('userOnline', (data) => {
            console.log("data", data)
            setOnlineUsers(prev => new Set(prev).add(data.userId));
        });

        socketInstance.on('userOffline', (data) => {
            setOnlineUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.userId);
                return newSet;
            });
        });

        socketInstance.on('userTyping', (data) => {
            if (data.userId !== getCurrentUserId()) {
                setIsTyping(data.isTyping);
                if (data.isTyping) {
                    setTimeout(() => setIsTyping(false), 3000);
                }
            }
        });

        socketInstance.on('messagesRead', (data) => {
            setMessages(prev =>
                prev.map(msg => ({
                    ...msg,
                    status: msg.sender !== userType ? 'read' : msg.status
                }))
            );
        });

        socketInstance.on('error', (error) => {
            console.error('Socket error:', error);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [conversationId, userType]);

    // Load messages when conversation changes
    useEffect(() => {
        // if (conversationId) {
            console.log("conversationId", conversationId)
            loadMessages();
        // }
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async () => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await fetch(`${base_url}/api/chat/conversations/68d8f59c6cc77440d6370af6_67f777a6566ca9e7ea88c593_68bd3d9a84c3d1e33ba8b123/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("response", response)

            if (response.ok) {
                const data = await response.json();
                setMessages(data.data.messages);
                setConversation(data.data.conversation);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const sendMessage = async () => {
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            conversationId,
            message: newMessage,
            messageType: 'TEXT'
        };

        try {
            // Send via socket for real-time delivery
            socket.emit('sendMessage', messageData);

            // Also send via HTTP API as backup
            const token = JSON.parse(localStorage.getItem('user')).token;
            await fetch(`${base_url}/api/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(messageData)
            });

            setNewMessage('');
            stopTyping();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleTyping = () => {
        if (socket && !isTyping) {
            socket.emit('typing', { conversationId, isTyping: true });
            setIsTyping(true);
        }

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout
        typingTimeoutRef.current = setTimeout(() => {
            stopTyping();
        }, 2000);
    };

    const stopTyping = () => {
        if (socket) {
            socket.emit('typing', { conversationId, isTyping: false });
        }
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getCurrentUserId = () => {
        // Get current user ID from auth context or token
        return localStorage.getItem('userId');
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        } else {
            handleTyping();
        }
    };

    const initializeConversation = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await fetch(`${base_url}/api/chat/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    propertyId,
                    builderId,
                    initialMessage: `Hi, I'm interested in your property "${conversation?.property?.post_title || 'this property'}". Could you please share more details?`
                })
            });


            if (response.ok) {
                const data = await response.json();
                console.log("data", data)
                setConversation(data.data.conversation);
                if (data.data.initialMessage) {
                    setMessages([data.data.initialMessage]);
                }

                setConversationId(data?.data?.conversation?.conversationId)

                // Join the conversation via socket
                if (socket) {
                    socket.emit('joinConversation', {
                        conversationId: data.data.conversation.conversationId
                    });
                }
            }
        } catch (error) {
            console.error('Error initializing conversation:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen max-h-[600px] bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button className="md:hidden">
                        <ArrowLeft className="h-6 w-6" />
                    </button>

                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={conversation?.builder?.logo || '/default-avatar.png'}
                                alt="Builder"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            {onlineUsers.has(conversation?.builder?._id) && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {conversation?.builder?.name || conversation?.builder?.company}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {conversation?.property?.post_title}
                            </p>
                            {isTyping && (
                                <p className="text-sm text-blue-600">Typing...</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Property Info Banner */}
            {conversation?.property && (
                <div className="bg-blue-50 border-b border-blue-100 p-3">
                    <div className="flex items-center space-x-3">
                        <img
                            src={conversation.property.post_images?.[0]?.url || '/placeholder-property.png'}
                            alt="Property"
                            className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                                {conversation.property.post_title}
                            </p>
                            <p className="text-sm text-gray-500">
                                {conversation.property.city}, {conversation.property.locality}
                            </p>
                            {conversation.property.price && (
                                <p className="text-sm font-semibold text-blue-600">
                                    ₹{conversation.property.price.toLocaleString('en-IN')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                        {!conversationId && (
                            <button
                                onClick={initializeConversation}
                                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Send Message
                            </button>
                        )}
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={message._id || index}
                            className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === userType
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                    }`}
                            >
                                <p className="text-sm">{message.message}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs opacity-75">
                                        {formatTime(message.createdAt)}
                                    </span>
                                    {message.sender === userType && (
                                        <span className="text-xs opacity-75">
                                            {message.status === 'read' ? '✓✓' : '✓'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Image className="h-5 w-5" />
                    </button>

                    <div className="flex-1 relative">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="1"
                            style={{ minHeight: '40px', maxHeight: '120px' }}
                        />
                    </div>

                    <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
// 68dd02ef7a4245e311c47597_67f777a6566ca9e7ea88c593_68bd3d9a84c3d1e33ba8b187 
import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, ArrowLeft, MoreVertical, Image, Paperclip, Search, Menu, Check, Hash, Settings, Plus } from 'lucide-react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { base_url } from '../utils/base_url';
import { useSelector } from 'react-redux';

const Cut = ({ userType = 'USER' }) => {
    const { propertyId, builderId } = useParams();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const [socket, setSocket] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isInitializing, setIsInitializing] = useState(false);
    const [imageErrors, setImageErrors] = useState(new Set());
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const messagesEndRef = useRef(null);

    const leftListRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const leftHoverRef = useRef(false);
    const messagesHoverRef = useRef(false);

    const hasInitialized = useRef(false);
    const messagesSentRef = useRef(new Set());
    const selectedConversationRef = useRef(selectedConversation);
    useEffect(() => { selectedConversationRef.current = selectedConversation; }, [selectedConversation]);

    const { user } = useSelector(state => state.auth);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [showConversationsMobile, setShowConversationsMobile] = useState(true);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            setIsMobileView(isMobile);
            if (!isMobile) setShowConversationsMobile(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize socket connection
    useEffect(() => {
        const token = localStorage.getItem('profo-auth-token');
        if (!token) return;

        const socketInstance = io(base_url, { auth: { token } });

        socketInstance.on('connect', () => console.log('Connected to chat server'));

        socketInstance.on('newMessage', (data) => {
            const incoming = data?.message;
            if (!incoming) return;

            setConversations(prev => prev.map(conv => conv.conversationId === incoming.conversationId
                ? { ...conv, lastMessage: { message: incoming.message, sentAt: incoming.createdAt, sentBy: incoming.sender } }
                : conv
            ));

            if (selectedConversationRef.current?.conversationId === incoming.conversationId) {
                setMessages(prev => prev.some(m => m._id === incoming._id) ? prev : [...prev, incoming]);
            }
        });

        socketInstance.on('userOnline', (data) => setOnlineUsers(prev => new Set(prev).add(data.userId)));
        socketInstance.on('userOffline', (data) => setOnlineUsers(prev => { const next = new Set(prev); next.delete(data.userId); return next; }));

        socketInstance.on('userTyping', (data) => {
            if (data.userId !== getCurrentUserId()) {
                setIsTyping(data.isTyping);
                if (data.isTyping) setTimeout(() => setIsTyping(false), 3000);
            }
        });

        setSocket(socketInstance);

        return () => { socketInstance.disconnect(); };
    }, []);

    // Load conversations
    useEffect(() => { loadConversations(); }, []);

    // Initialize conversation
    useEffect(() => {
        if (propertyId && builderId && !hasInitialized.current) {
            hasInitialized.current = true;
            initializeConversation();
        }
    }, [propertyId, builderId]);

    // Load messages when conversation selected
    useEffect(() => {
        if (selectedConversation) {
            loadMessages(selectedConversation.conversationId);
            if (socket && socket.connected) socket.emit('joinConversation', { conversationId: selectedConversation.conversationId });
        } else setMessages([]);
    }, [selectedConversation, socket]);

    // Auto-scroll
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container || messagesHoverRef.current) return;
        const distanceFromBottom = container.scrollHeight - container.clientHeight - container.scrollTop;
        const AUTO_SCROLL_THRESHOLD = 150;
        if (distanceFromBottom < AUTO_SCROLL_THRESHOLD) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const loadConversations = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('profo-auth-token');
            const endpoint = userType === 'BUILDER' ? '/api/chat/builder/conversations' : '/api/chat/conversations';
            const response = await fetch(`${base_url}${endpoint}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.ok) {
                const data = await response.json();
                setConversations(data.data.conversations || []);
                if (propertyId && builderId) {
                    const existingConversation = (data.data.conversations || []).find(
                        conv => conv.property?._id === propertyId && conv.builder?._id === builderId
                    );
                    if (existingConversation) setSelectedConversation(existingConversation);
                }
            }
        } catch (error) { console.error('Error loading conversations:', error); }
        finally { setIsLoading(false); }
    };

    const initializeConversation = async () => {
        try {
            setIsInitializing(true);
            const token = localStorage.getItem('profo-auth-token');
            const existingConv = conversations.find(conv => conv.property?._id === propertyId && conv.builder?._id === builderId);
            if (existingConv) { setSelectedConversation(existingConv); setIsInitializing(false); return; }

            const response = await fetch(`${base_url}/api/chat/conversations`, {
                // method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ propertyId, builderId, initialMessage: `Hi, I'm interested in this property. Could you please share more details?` })
            });
            if (response.ok) {
                const data = await response.json();
                const newConversation = data.data.conversation;
                setConversations(prev => [newConversation, ...prev]);
                setSelectedConversation(newConversation);
                if (data.data.initialMessage) setMessages([data.data.initialMessage]);
                if (socket && socket.connected) socket.emit('joinConversation', { conversationId: newConversation.conversationId });
            }
        } catch (error) { console.error('Error initializing conversation:', error); }
        finally { setIsInitializing(false); }
    };

    const loadMessages = async (conversationId) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('profo-auth-token');
            const response = await fetch(`${base_url}/api/chat/conversations/${conversationId}/messages`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.data.messages || []);
                const container = messagesContainerRef.current;
                if (container && !messagesHoverRef.current) container.scrollTo({ top: container.scrollHeight });
            }
        } catch (error) { console.error('Error loading messages:', error); }
        finally { setIsLoading(false); }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedConversation || isSendingMessage) return;
        const messageText = newMessage.trim();
        const messageId = `${Date.now()}-${messageText}`;
        if (messagesSentRef.current.has(messageId)) return;
        messagesSentRef.current.add(messageId);
        setIsSendingMessage(true);
        setNewMessage(''); stopTyping();

        try {
            const token = localStorage.getItem('profo-auth-token');
            const response = await fetch(`${base_url}/api/chat/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ conversationId: selectedConversation.conversationId, message: messageText, messageType: 'TEXT' })
            });
            if (!response.ok) { const text = await response.text(); console.error('Send message failed', text); setNewMessage(messageText); }

            setTimeout(() => messagesSentRef.current.delete(messageId), 2000);
        } catch (error) { console.error('Error sending message:', error); setNewMessage(messageText); messagesSentRef.current.delete(messageId); }
        finally { setIsSendingMessage(false); }
    };

    const typingTimeoutRef = useRef(null);
    const handleTyping = () => {
        if (socket && selectedConversation) socket.emit('typing', { conversationId: selectedConversation.conversationId, isTyping: true });
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => stopTyping(), 2000);
    };
    const stopTyping = () => {
        if (socket && selectedConversation) socket.emit('typing', { conversationId: selectedConversation.conversationId, isTyping: false });
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
    const getCurrentUserId = () => localStorage.getItem('userId');
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === today.toDateString()) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } else handleTyping(); };
    const filteredConversations = conversations.filter(conv => {
        const searchLower = searchQuery.toLowerCase();
        const otherParty = userType === 'USER' ? conv.builder : conv.user;
        const name = otherParty?.name || otherParty?.company || '';
        const propertyTitle = conv.property?.post_title || '';
        return name.toLowerCase().includes(searchLower) || propertyTitle.toLowerCase().includes(searchLower);
    });
    const getOtherParty = (conversation) => userType === 'USER' ? conversation.builder : conversation.user;
    const getOtherPartyImage = (conversation) => getOtherParty(conversation)?.logo;
    const getOtherPartyName = (conversation) => getOtherParty(conversation)?.name || getOtherParty(conversation)?.company || 'Unknown';
    const handleImageError = (identifier) => setImageErrors(prev => new Set(prev).add(identifier));
    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : '?';
    const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-red-600', 'bg-yellow-600', 'bg-teal-600'];
    const getColorForName = (name) => { if (!name) return 'bg-gray-600'; const index = name.charCodeAt(0) % colors.length; return colors[index]; };

    const ProfileAvatar = ({ conversation, size = 'w-9 h-9', className = '' }) => {
        const otherParty = getOtherParty(conversation);
        const imageUrl = otherParty?.logo;
        const name = getOtherPartyName(conversation);
        const identifier = `${conversation.conversationId}-profile`;
        const hasError = imageErrors.has(identifier);
        return (
            <div className={`${size} rounded relative ${className} flex-shrink-0`}>
                {imageUrl && !hasError ? <img src={imageUrl} alt={name} className="object-cover w-full h-full rounded" onError={() => handleImageError(identifier)} /> :
                    <div className={`w-full h-full ${getColorForName(name)} flex items-center justify-center text-white font-semibold rounded text-sm`}>{getInitials(name)}</div>
                }
                {onlineUsers.has(otherParty?._id) && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
            </div>
        );
    };

    // Main JSX
    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Left Sidebar / Conversation List */}
            {(isMobileView ? showConversationsMobile : true) && (
                <div className={`${isMobileView ? 'w-full' : 'w-72'} bg-[#3f0e40] flex flex-col h-full`}>
                    {/* Header */}
                    <div className="flex-shrink-0 px-4 py-3 border-b border-[#522653] flex items-center justify-between">
                        <h2 className="text-white font-bold text-lg">Property Chats</h2>
                        {!isMobileView && <button className="text-white/70 hover:text-white transition-colors"><Settings className="h-5 w-5" /></button>}
                    </div>
                    {/* Search */}
                    <div className="px-4 pb-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                            <input type="text" placeholder="Search conversations" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 text-sm rounded bg-[#522653] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div> :
                            filteredConversations.length === 0 ? <div className="text-center py-12 px-4 text-white/60">No conversations yet</div> :
                                filteredConversations.map(conv => (
                                    <div key={conv.conversationId} onClick={() => { setSelectedConversation(conv); if (isMobileView) setShowConversationsMobile(false); }}
                                        className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#522653] transition-colors ${selectedConversation?.conversationId === conv.conversationId ? 'bg-[#1164a3]' : ''}`}>
                                        <ProfileAvatar conversation={conv} />
                                        <div className="ml-3 flex-1 min-w-0">
                                            <h3 className="font-semibold text-white truncate text-sm">{getOtherPartyName(conv)}</h3>
                                            <p className="text-xs text-white/50 truncate">{conv.property?.post_title}</p>
                                            <p className="text-sm text-white/70 truncate">{conv.lastMessage?.message || 'No messages yet'}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            )}

            {/* Chat Area */}
            {!showConversationsMobile || !isMobileView ? (
                <div className="flex-1 flex flex-col bg-white h-full">
                    {isInitializing ? (
                        <div className="flex-1 flex items-center justify-center bg-gray-50"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f0e40] mx-auto mb-4"></div><p className="text-gray-600">Initializing conversation...</p></div></div>
                    ) : selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex-shrink-0 h-14 border-b border-gray-200 px-4 flex items-center justify-between bg-white shadow-sm">
                                <div className="flex items-center space-x-3">
                                    {isMobileView && <button className="mr-2 text-gray-600 hover:text-gray-800" onClick={() => setShowConversationsMobile(true)}><ArrowLeft className="h-5 w-5" /></button>}
                                    <ProfileAvatar conversation={selectedConversation} size="w-8 h-8" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">{getOtherPartyName(selectedConversation)}</h3>
                                        {isTyping ? <p className="text-xs text-green-600">typing...</p> :
                                            onlineUsers.has(getOtherParty(selectedConversation)?._id) ? <p className="text-xs text-green-600">online</p> :
                                                <p className="text-xs text-gray-500">offline</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                                <div className="space-y-4 max-w-4xl mx-auto">
                                    {messages.map((msg, idx) => {
                                        const isCurrentUser = msg.sender === userType;
                                        const otherPartyName = getOtherPartyName(selectedConversation);
                                        const otherPartyImage = getOtherPartyImage(selectedConversation);
                                        const msgIdentifier = `${msg._id || idx}-avatar`;
                                        return (
                                            <div key={msg._id || idx} className="flex items-start space-x-3 group hover:bg-gray-50 px-4 py-2 rounded -mx-4">
                                                <div className="w-9 h-9 rounded flex-shrink-0">
                                                    {isCurrentUser ? <div className={`w-full h-full ${getColorForName(user?.name || 'User')} flex items-center justify-center text-white font-semibold rounded text-sm`}>{getInitials(user?.name || 'U')}</div> :
                                                        otherPartyImage ? <img src={otherPartyImage} alt="Avatar" className="w-full h-full rounded object-cover" onError={() => handleImageError(msgIdentifier)} /> :
                                                            <div className={`w-full h-full ${getColorForName(otherPartyName)} flex items-center justify-center text-white font-semibold rounded text-sm`}>{getInitials(otherPartyName)}</div>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline space-x-2 mb-1">
                                                        <span className="font-bold text-gray-900 text-sm">{isCurrentUser ? (user?.name || 'You') : otherPartyName}</span>
                                                        <span className="text-xs text-gray-500">{formatTime(msg.createdAt)}</span>
                                                    </div>
                                                    <p className="text-gray-800 text-sm leading-relaxed">{msg.message}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
                                <div className="max-w-4xl mx-auto flex items-end space-x-3">
                                    <button className="text-gray-500 hover:text-gray-700 p-2"><Plus className="h-5 w-5" /></button>
                                    <div className="flex-1 bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                                        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message..." className="w-full px-4 py-3 resize-none focus:outline-none text-sm" rows="1" style={{ minHeight: '44px', maxHeight: '200px', overflowY: 'auto' }} disabled={isSendingMessage}></textarea>
                                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 p-1"><Paperclip className="h-4 w-4" /></button>
                                                <button className="text-gray-500 hover:text-gray-700 p-1"><Image className="h-4 w-4" /></button>
                                            </div>
                                            <button onClick={sendMessage} disabled={!newMessage.trim() || isSendingMessage} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded px-4 py-1.5 text-sm font-medium flex items-center space-x-1">
                                                {isSendingMessage ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <><Send className="h-4 w-4" /><span>Send</span></>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-gray-50">
                            <div className="text-center max-w-md">
                                {isMobileView && <button className="mb-6 bg-[#3f0e40] text-white rounded-full p-4" onClick={() => setShowConversationsMobile(true)}><Menu className="h-6 w-6" /></button>}
                                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6"><Hash className="h-12 w-12 text-gray-400" /></div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Property Chat</h3>
                                <p className="text-gray-600">Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Cut;
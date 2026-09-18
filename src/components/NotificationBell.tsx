import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Info, Tag, Package, Settings } from 'lucide-react';
import { Notification } from '../types';
import { fetchNotifications } from '../lib/supabase';
import { useAuth } from '../lib/auth';

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-3.5 h-3.5 text-blue-400" />,
  promo: <Tag className="w-3.5 h-3.5 text-[#c9a96e]" />,
  order: <Package className="w-3.5 h-3.5 text-green-400" />,
  system: <Settings className="w-3.5 h-3.5 text-[#e8e0d4]/50" />,
};

export const NotificationBell: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications().then((all) => {
      const filtered = all.filter(n => {
        if (n.target === 'all') return true;
        if (n.target === 'logged_in') return !!user;
        if (n.target === 'vip') return !!user;
        return true;
      });
      setNotifications(filtered);
      setUnreadCount(filtered.length);
    });
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const dismissAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#e8e0d4]/70 hover:text-[#c9a96e] transition-colors"
        title="Obaveštenja"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a96e] text-[#0a0a0a] text-[8px] font-bold flex items-center justify-center rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#111111] border border-[#e8e0d4]/15 shadow-2xl z-50 max-h-80 flex flex-col"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#e8e0d4]/10">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#c9a96e] font-sans font-semibold">Obaveštenja</span>
              {notifications.length > 0 && (
                <button onClick={dismissAll} className="text-[9px] text-[#e8e0d4]/40 hover:text-[#c9a96e] transition-colors font-sans">
                  Obriši sve
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-5 h-5 text-[#e8e0d4]/20 mx-auto mb-2" />
                  <p className="text-xs text-[#e8e0d4]/40 font-sans">Nema novih obaveštenja</p>
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className="flex items-start gap-2.5 px-3 py-2.5 border-b border-[#e8e0d4]/5 hover:bg-[#1a1a1a] transition-colors group"
                  >
                    <div className="mt-0.5 flex-shrink-0">{typeIcons[n.type]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#e8e0d4] font-sans font-medium truncate">{n.title}</p>
                      <p className="text-[10px] text-[#e8e0d4]/50 font-sans line-clamp-2 mt-0.5">{n.message}</p>
                      <p className="text-[9px] text-[#e8e0d4]/30 font-sans mt-1">
                        {new Date(n.created_at).toLocaleDateString('sr-Latn-RS')}
                      </p>
                    </div>
                    <button
                      onClick={() => dismiss(n.id)}
                      className="p-1 opacity-0 group-hover:opacity-100 text-[#e8e0d4]/30 hover:text-red-400 transition-all flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

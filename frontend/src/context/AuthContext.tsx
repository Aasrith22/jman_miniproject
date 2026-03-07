import React, { createContext, useContext, useState, useCallback } from 'react';

type AuthUser = { user_id: string; full_name: string; email: string; role: string } | null;

export type WishlistCourse = {
  course_id: string;
  course_name: string;
  technology: string;
  instructor: { user_id: string; full_name: string };
};

type AuthContextType = {
  user: AuthUser;
  login: (userData: AuthUser) => void;
  logout: () => void;
  showLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  wishlist: WishlistCourse[];
  addToWishlist: (course: WishlistCourse) => void;
  removeFromWishlist: (courseId: string) => void;
  isWishlisted: (courseId: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const stored = localStorage.getItem('auth_user');
  const [user, setUser] = useState<AuthUser>(stored ? JSON.parse(stored) : null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistCourse[]>([]);

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user_id', userData.user_id);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    }
    setShowLoginModal(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem('user_id');
    localStorage.removeItem('auth_user');
  }, []);

  const openLoginModal = useCallback(() => setShowLoginModal(true), []);
  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);

  const addToWishlist = useCallback((course: WishlistCourse) => {
    setWishlist(prev => prev.find(c => c.course_id === course.course_id) ? prev : [...prev, course]);
  }, []);

  const removeFromWishlist = useCallback((courseId: string) => {
    setWishlist(prev => prev.filter(c => c.course_id !== courseId));
  }, []);

  const isWishlisted = useCallback((courseId: string) => {
    return wishlist.some(c => c.course_id === courseId);
  }, [wishlist]);

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      showLoginModal, openLoginModal, closeLoginModal,
      wishlist, addToWishlist, removeFromWishlist, isWishlisted,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

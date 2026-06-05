import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser, getUsers, saveUsers, generateId } from '@/lib/storage';

export function useAuth() {
  const [currentUser, setCurrentUserState] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    setCurrentUserState(getCurrentUser());
  }, []);

  function login(email: string, password: string): { success: boolean; error?: string } {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };
    setCurrentUser(user);
    setCurrentUserState(user);
    return { success: true };
  }

  function register(username: string, email: string, password: string, role: 'seller' | 'bidder' | 'both', phone?: string): { success: boolean; error?: string } {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { success: false, error: 'Email already registered' };
    if (users.find(u => u.username === username)) return { success: false, error: 'Username already taken' };
    const newUser: User = {
      id: generateId(),
      username,
      email,
      password,
      role,
      joinDate: new Date().toISOString().split('T')[0],
      phone,
    };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentUserState(newUser);
    return { success: true };
  }

  function logout(): void {
    setCurrentUser(null);
    setCurrentUserState(null);
  }

  return { currentUser, login, register, logout };
}

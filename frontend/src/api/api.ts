
import { toast } from "@/components/ui/sonner";

// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  isFirstLogin: boolean;

}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  summary: string;
  userTags: string[];
  aiTags: string[];
  createdAt: string;
  updatedAt: string;
}

// Helper to get the auth token
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper to set the auth token
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Helper to remove the auth token
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Helper for API requests
const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  requiresAuth: boolean = true
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error: ${response.status}`;
      
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    toast.error(message);
    throw error;
  }
};

// Auth API calls
export const signup = (username: string, email: string, password: string): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/signup', 'POST', { username, email, password }, false);
};

export const login = (email: string, password: string): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/login', 'POST', { email, password }, false);
};

export const firstLoginUpdate = (userId: string, isFirstLogin: boolean): Promise<User> => {
  return apiRequest<User>(`/auth/firstLogin/${userId}`, 'PUT', { isFirstLogin });
};

// Notes API calls
export const fetchNotes = (): Promise<Note[]> => {
  return apiRequest<Note[]>('/notes');
};

export const fetchNote = (id: string): Promise<Note> => {
  return apiRequest<Note>(`/notes/${id}`);
};

export const createNote = (title: string, content: string, userTags: string[]): Promise<Note> => {
  return apiRequest<Note>('/notes', 'POST', { title, content, userTags });
};

export const updateNote = (id: string, title: string, content: string, userTags: string[]): Promise<Note> => {
  return apiRequest<Note>(`/notes/${id}`, 'PUT', { title, content, userTags });
};

export const deleteNote = (id: string): Promise<void> => {
  return apiRequest<void>(`/notes/${id}`, 'DELETE');
};

export const searchNotes = (query: string): Promise<Note[]> => {
  return apiRequest<Note[]>(`/notes/search?query=${encodeURIComponent(query)}`);
};

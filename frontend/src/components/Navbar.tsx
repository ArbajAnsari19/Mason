
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Plus } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="font-bold text-xl text-primary">
          Smart Notes
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm hidden md:inline-block">
              Hey <span className="font-medium">{user.name}</span>
            </span>
          )}
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/notes/new')} 
              variant="outline" 
              size="sm"
              className="flex items-center text-white gap-1 bg-indigo-600"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline-block">New Note</span>
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

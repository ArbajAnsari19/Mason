
import { useState } from 'react';
import { NoteForm } from '@/components/NoteForm';
import { Layout } from '@/components/Layout';
import { createNote } from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const AddNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string; content: string; userTags: string[] }) => {
    try {
      setIsLoading(true);
      const newNote = await createNote(data.title, data.content, data.userTags);
      toast.success('Note created successfully');
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Create New Note</h1>
        <p className="text-muted-foreground">Add a new note with AI-powered summaries</p>
      </div>

      <div className="max-w-3xl mx-auto bg-card p-6 rounded-lg border shadow-sm">
        <NoteForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default AddNote;

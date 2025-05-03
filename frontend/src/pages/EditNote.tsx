
import { useState, useEffect } from 'react';
import { NoteForm } from '@/components/NoteForm';
import { Layout } from '@/components/Layout';
import { fetchNote, updateNote } from '@/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const EditNote = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [note, setNote] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchNote(id);
        setNote(data);
      } catch (error) {
        console.error('Failed to fetch note:', error);
        toast.error('Could not load the note');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadNote();
  }, [id, navigate]);

  const handleSubmit = async (data: { title: string; content: string; userTags: string[] }) => {
    if (!id) return;
    
    try {
      setIsSaving(true);
      await updateNote(id, data.title, data.content, data.userTags);
      toast.success('Note updated successfully');
      navigate(`/notes/${id}`);
    } catch (error) {
      console.error('Failed to update note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Edit Note</h1>
        <p className="text-muted-foreground">Update your note</p>
      </div>

      {note && (
        <div className="max-w-3xl mx-auto bg-card p-6 rounded-lg border shadow-sm">
          <NoteForm 
            initialData={note}
            onSubmit={handleSubmit}
            isLoading={isSaving}
          />
        </div>
      )}
    </Layout>
  );
};

export default EditNote;

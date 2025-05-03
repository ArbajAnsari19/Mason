
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { fetchNote } from '@/api/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Edit } from 'lucide-react';

const ViewNote = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
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

  if (isLoading) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <Layout requireAuth>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="mb-2"
          >
            ← Back to Dashboard
          </Button>
        </div>
        <Button asChild>
          <Link to={`/notes/${id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Note
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{note.title}</h1>
            <p className="text-sm text-muted-foreground">
              Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-1 mb-4">
            {note.userTags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="bg-accent/50">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="bg-muted/30 p-4 rounded-md border">
            <h3 className="text-sm font-medium mb-1">AI-generated Summary</h3>
            <p className="text-muted-foreground">{note.summary}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Content</h3>
            <div className="prose max-w-none">
              {/* We're using white-space: pre-wrap to preserve line breaks */}
              <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-end py-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default ViewNote;

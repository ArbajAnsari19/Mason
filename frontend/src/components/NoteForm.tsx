import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from './LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Note } from '@/api/api';
import  FullScreenLoader  from './FullScreenLoader';

interface NoteFormProps {
  initialData?: Partial<Note>;
  onSubmit: (data: { title: string; content: string; userTags: string[] }) => Promise<void>;
  isLoading?: boolean;
}

export const NoteForm: React.FC<NoteFormProps> = ({ 
  initialData = { title: '', content: '', userTags: [] },
  onSubmit,
  isLoading 
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [userTags, setUserTags] = useState<string[]>(initialData.userTags || []);
  const [tagInput, setTagInput] = useState('');
  
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !userTags.includes(trimmedTag)) {
      setUserTags([...userTags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setUserTags(userTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, userTags });
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="writeNote space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Write your note content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
            className="min-h-[200px] resize-y"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">User Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            <Button 
              type="button" 
              onClick={handleAddTag}
              variant="secondary"
            >
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {userTags.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {initialData.summary && (
          <div className="space-y-2">
            <Label htmlFor="summary">AI-generated Summary</Label>
            <p className="text-sm text-muted-foreground border p-3 rounded-md bg-muted/30">
              {initialData.summary}
            </p>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="small" /> : 'Save Note'}
          </Button>
        </div>
      </form>
    </>
  );
};
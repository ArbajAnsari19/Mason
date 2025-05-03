import { Note } from '@/api/api';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <Link 
          to={`/notes/${note._id}`} 
          className="font-medium text-lg hover:text-primary transition-colors"
        >
          {note.title}
        </Link>
        <p className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </p>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <p className="text-sm text-muted-foreground note-content mb-3">
          {note.summary}
        </p>
        <div className="flex flex-wrap gap-1">
          {note.userTags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {note.aiTags && note.aiTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-purple-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-end gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
        >
          <Link to={`/notes/${note._id}/edit`}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(note._id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
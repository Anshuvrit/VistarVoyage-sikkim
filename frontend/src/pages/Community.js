import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, User, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { communityStories, monasteries } from '../data/mockData';

const Community = () => {
  const [stories, setStories] = useState(communityStories);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleLike = (storyId) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.likes + 1 }
          : story
      )
    );
  };

  const getCategoryIcon = (category) => {
    return category === 'experience' ? '🧘' : category === 'history' ? '📿' : '🏛️';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'experience': return 'bg-blue-100 text-blue-800';
      case 'history': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Community Stories
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                Share and discover inspiring spiritual journeys from fellow practitioners and monastery visitors.
              </p>
            </div>
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                  Share Your Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Share Your Spiritual Journey</DialogTitle>
                  <DialogDescription>
                    Tell us about your experience visiting Sikkim's sacred monasteries
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Story Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., My First Visit to Rumtek Monastery"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monastery">Related Monastery</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a monastery" />
                      </SelectTrigger>
                      <SelectContent>
                        {monasteries.map(monastery => (
                          <SelectItem key={monastery.id} value={monastery.name}>
                            {monastery.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Story Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="experience">Personal Experience</SelectItem>
                        <SelectItem value="history">Historical Story</SelectItem>
                        <SelectItem value="tradition">Cultural Tradition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="story">Your Story</Label>
                    <Textarea 
                      id="story"
                      placeholder="Share your experience, memories, or insights about your visit..."
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      onClick={() => {
                        // TODO: Submit story to backend
                        console.log('Story submission would happen here');
                        setShowShareDialog(false);
                      }}
                    >
                      Share Story
                    </Button>
                    <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{stories.length} Stories</span>
            <span>•</span>
            <span>{stories.filter(s => s.verified).length} Verified</span>
          </div>
        </div>
      </div>

      {/* Stories Feed */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {story.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{story.author}</span>
                        {story.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                        {story.local && (
                          <Badge variant="secondary" className="text-xs">
                            ✓ Verified Local
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{story.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryIcon(story.category) + ' ' + getCategoryColor(story.category)}>
                    {getCategoryIcon(story.category)} {story.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-amber-700 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{story.monastery}</span>
                  </div>
                </div>

                {story.image && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  {story.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => handleLike(story.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{story.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{story.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Stories
          </Button>
        </div>

        {/* Community Guidelines */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-center">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🙏</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Respectful Sharing</h3>
                  <p className="text-sm text-gray-600">
                    Share your experiences with respect for Buddhist traditions and local customs.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Authentic Stories</h3>
                  <p className="text-sm text-gray-600">
                    We encourage genuine, personal experiences that inspire others on their spiritual journey.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Supportive Community</h3>
                  <p className="text-sm text-gray-600">
                    Foster meaningful connections and support fellow seekers in their spiritual exploration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
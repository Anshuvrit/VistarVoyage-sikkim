import React, { useState } from 'react';
import { Search, Book, Calendar, Globe, Download, Eye, Heart, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Manuscripts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Mock manuscript data
  const manuscripts = [
    {
      id: 1,
      title: 'Prajnaparamita Sutra',
      tibetanTitle: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ།',
      category: 'Sutra',
      language: 'Tibetan',
      monastery: 'Rumtek Monastery',
      century: '15th',
      pages: 108,
      description: 'The Perfection of Wisdom literature, fundamental teachings on the nature of reality and emptiness.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80',
      digitalized: true,
      sacred: true,
      likes: 156,
      views: 2431
    },
    {
      id: 2,
      title: 'Lotus Sutra',
      tibetanTitle: 'དམ་པའི་ཆོས་པད་མ་དཀར་པོ།',
      category: 'Sutra',
      language: 'Sanskrit',
      monastery: 'Pemayangtse Monastery',
      century: '12th',
      pages: 276,
      description: 'One of the most influential and venerated Buddhist Mahayana sutras, teaching the doctrine of the One Vehicle.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      digitalalized: true,
      sacred: true,
      likes: 203,
      views: 3124
    },
    {
      id: 3,
      title: 'Tibetan Book of the Dead',
      tibetanTitle: 'བར་དོ་ཐོས་གྲོལ།',
      category: 'Tantra',
      language: 'Tibetan',
      monastery: 'Tashiding Monastery',
      century: '14th',
      pages: 192,
      description: 'Guidance for navigating the intermediate state between death and rebirth, containing profound teachings on consciousness.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
      digitalalized: false,
      sacred: true,
      likes: 324,
      views: 4567
    },
    {
      id: 4,
      title: 'Guru Rinpoche Biography',
      tibetanTitle: 'གུ་རུ་རིན་པོ་ཆེའི་རྣམ་ཐར།',
      category: 'Biography',
      language: 'Tibetan',
      monastery: 'Enchey Monastery',
      century: '16th',
      pages: 145,
      description: 'Life story and teachings of Padmasambhava, the second Buddha who brought Buddhism to Tibet.',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
      digitalalized: true,
      sacred: true,
      likes: 189,
      views: 2876
    },
    {
      id: 5,
      title: 'Monastery History Chronicles',
      tibetanTitle: 'དགོན་པའི་ལོ་རྒྱུས།',
      category: 'History',
      language: 'Tibetan',
      monastery: 'Rumtek Monastery',
      century: '18th',
      pages: 89,
      description: 'Historical records documenting the establishment and development of Sikkim\'s major monasteries.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80',
      digitalalized: true,
      sacred: false,
      likes: 98,
      views: 1543
    },
    {
      id: 6,
      title: 'Healing Medicine Texts',
      tibetanTitle: 'སྨན་པའི་བཞུགས་ཡིག',
      category: 'Medicine',
      language: 'Tibetan',
      monastery: 'Pemayangste Monastery',
      century: '17th',
      pages: 234,
      description: 'Traditional Tibetan medicine texts covering diagnostic methods, herbal remedies, and healing practices.',
      image: 'https://images.unsplash.com/photo-1593448816864-39f396a69ed0?auto=format&fit=crop&q=80',
      digitalalized: false,
      sacred: false,
      likes: 267,
      views: 3891
    }
  ];

  const categories = ['all', ...new Set(manuscripts.map(m => m.category))];
  const languages = ['all', ...new Set(manuscripts.map(m => m.language))];

  const filteredManuscripts = manuscripts.filter(manuscript => {
    const matchesSearch = manuscript.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manuscript.tibetanTitle.includes(searchQuery) ||
                         manuscript.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || manuscript.category === categoryFilter;
    const matchesLanguage = languageFilter === 'all' || manuscript.language === languageFilter;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Ancient Buddhist Manuscripts
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                Explore precious Buddhist texts and sacred writings preserved in Sikkim's monasteries, 
                representing centuries of spiritual wisdom and cultural heritage.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
              <Book className="w-4 h-4 mr-2" />
              Request Access
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-2xl">📜</span>
              <span>{manuscripts.length} Manuscripts</span>
            </div>
            <span>•</span>
            <span>{manuscripts.filter(m => m.digitalalized).length} Digitalized</span>
            <span>•</span>
            <span>{manuscripts.filter(m => m.sacred).length} Sacred Texts</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search manuscripts by title, description, or monastery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      {language === 'all' ? 'All Languages' : language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tabs value={viewMode} onValueChange={setViewMode}>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={viewMode}>
          <TabsContent value="grid">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredManuscripts.map((manuscript) => (
                <Card key={manuscript.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={manuscript.image} 
                      alt={manuscript.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-red-900 hover:bg-red-800 text-white">
                        {manuscript.category}
                      </Badge>
                      {manuscript.sacred && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          Sacred
                        </Badge>
                      )}
                    </div>
                    {manuscript.digitalalized && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-100 text-green-800">
                          Digital Access
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">
                      {manuscript.title}
                    </CardTitle>
                    <CardDescription className="text-amber-700 font-medium">
                      {manuscript.tibetanTitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{manuscript.century} Century</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Book className="w-3 h-3" />
                        <span>{manuscript.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{manuscript.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{manuscript.views} views</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <strong>Location:</strong> {manuscript.monastery}
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2">
                      {manuscript.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{manuscript.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {manuscript.digitalalized && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Download className="w-4 h-4 mr-1" />
                            Access
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredManuscripts.map((manuscript) => (
                <Card key={manuscript.id} className="hover:shadow-md transition-shadow duration-300">
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-l-lg">
                      <img 
                        src={manuscript.image} 
                        alt={manuscript.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors">
                            {manuscript.title}
                          </h3>
                          <p className="text-amber-700 font-medium">{manuscript.tibetanTitle}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-red-900 hover:bg-red-800 text-white">
                            {manuscript.category}
                          </Badge>
                          {manuscript.digitalalized && (
                            <Badge className="bg-green-100 text-green-800">
                              Digital
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Century:</span> {manuscript.century}
                        </div>
                        <div>
                          <span className="font-medium">Pages:</span> {manuscript.pages}
                        </div>
                        <div>
                          <span className="font-medium">Language:</span> {manuscript.language}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {manuscript.monastery}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {manuscript.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{manuscript.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{manuscript.views}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {manuscript.digitalalized && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Download className="w-4 h-4 mr-2" />
                              Access Digital Copy
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No results */}
        {filteredManuscripts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No manuscripts found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setLanguageFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Preserving Sacred Knowledge
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              These ancient manuscripts represent over a millennium of Buddhist wisdom, carefully preserved 
              by generations of monks and scholars. Through our digitalization efforts, we're ensuring 
              these precious texts remain accessible for future generations while respecting their sacred nature.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                Support Digitalization
              </Button>
              <Button variant="outline" className="border-red-900 text-red-900 hover:bg-red-900 hover:text-white">
                Learn About Conservation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manuscripts;
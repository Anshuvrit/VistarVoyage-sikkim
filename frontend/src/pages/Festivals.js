import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, ChevronRight, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { festivals } from '../data/mockData';

const Festivals = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [view, setView] = useState('list');

  const upcomingFestivals = festivals.filter(f => f.upcoming);
  const categories = [...new Set(festivals.map(f => f.category))];

  const filteredFestivals = festivals.filter(festival => 
    categoryFilter === 'all' || festival.category === categoryFilter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sacred Buddhist Festivals
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-6">
            Experience the spiritual celebrations that mark the Buddhist calendar in Sikkim's monasteries, 
            each carrying deep cultural meaning and centuries of tradition.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-2xl">🎭</span>
              <span>{festivals.length} Festivals</span>
            </div>
            <span>•</span>
            <span>{upcomingFestivals.length} Upcoming</span>
          </div>
        </div>
      </div>

      {/* Next Festival Highlight */}
      {upcomingFestivals.length > 0 && (
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎊</span>
              <span className="text-sm font-medium">Next Festival</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">{upcomingFestivals[0].name}</h2>
                <p className="text-red-100 mb-4">{upcomingFestivals[0].date}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>{upcomingFestivals[0].duration}</span>
                  <span>•</span>
                  <span>{upcomingFestivals[0].monasteries} Monasteries</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" asChild>
                  <Link to={`/festivals/${upcomingFestivals[0].id}`}>
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Festival Calendar 2024</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Festivals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Festivals</SelectItem>
                    <SelectItem value="New Year Celebration">New Year</SelectItem>
                    <SelectItem value="Sacred Mask Dance Celebration">Mask Dance</SelectItem>
                    <SelectItem value="Sacred Water Prediction Ceremony">Prophecy</SelectItem>
                    <SelectItem value="Buddha's Birth, Enlightenment & Parinirvana">Buddha Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Tabs value={view} onValueChange={setView}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">Calendar</TabsTrigger>
                  <TabsTrigger value="grid">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <Tabs value={view}>
          <TabsContent value="list" className="space-y-6">
            <div className="text-center text-gray-600 mb-8">
              <p>Experience the sacred celebrations of Sikkim's Buddhist heritage</p>
            </div>
            
            <div className="space-y-6">
              {filteredFestivals.map((festival) => (
                <Card key={festival.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden">
                      <img 
                        src={festival.image} 
                        alt={festival.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {festival.name}
                          </h3>
                          <p className="text-amber-700 font-medium mb-2">
                            {festival.tibetanName}
                          </p>
                          <Badge className="bg-red-900 hover:bg-red-800 text-white mb-3">
                            {festival.category}
                          </Badge>
                        </div>
                        {festival.upcoming && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Upcoming
                          </Badge>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{festival.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{festival.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{festival.monasteries} Monasteries</span>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">
                        {festival.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Entry:</span> {festival.cost}
                        </div>
                        <div className="flex gap-2">
                          {festival.upcoming && (
                            <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                              Book Experience
                            </Button>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/festivals/${festival.id}`}>
                              Learn More
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((festival) => (
                <Card key={festival.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={festival.image} 
                      alt={festival.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {festival.upcoming && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Upcoming
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">
                      {festival.name}
                    </CardTitle>
                    <CardDescription className="text-amber-700 font-medium">
                      {festival.tibetanName}
                    </CardDescription>
                    <Badge className="bg-red-900 hover:bg-red-800 text-white w-fit">
                      {festival.category}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{festival.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{festival.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{festival.monasteries} Monasteries</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-3">
                      {festival.description}
                    </p>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Entry:</span> {festival.cost}
                    </div>

                    <div className="flex gap-2">
                      {festival.upcoming && (
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                          Book
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/festivals/${festival.id}`}>
                          Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience Sacred Traditions
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Each festival is a living expression of Buddhist philosophy, combining ancient rituals 
              with community celebration. These events offer visitors a unique opportunity to witness 
              authentic spiritual practices that have been preserved for centuries.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                Join Festival Community
              </Button>
              <Button variant="outline" className="border-red-900 text-red-900 hover:bg-red-900 hover:text-white">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Festivals;
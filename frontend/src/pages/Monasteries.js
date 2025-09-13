import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Clock, Users, Headphones, Eye, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { monasteries } from '../data/mockData';

const Monasteries = () => {
  const [sectFilter, setSectFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');

  const filteredMonasteries = useMemo(() => {
    return monasteries.filter(monastery => {
      const sectMatch = sectFilter === 'all' || monastery.sect === sectFilter;
      const districtMatch = districtFilter === 'all' || monastery.location === districtFilter;
      return sectMatch && districtMatch;
    });
  }, [sectFilter, districtFilter]);

  const sects = [...new Set(monasteries.map(m => m.sect))];
  const districts = [...new Set(monasteries.map(m => m.location))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sacred Monasteries of Sikkim
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            Discover the spiritual heart of Sikkim through its ancient monasteries, each preserving 
            centuries of Buddhist wisdom and cultural heritage.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-2xl">🏛️</span>
              <span>{monasteries.length} Monasteries</span>
            </div>
            <span>•</span>
            <span>{sects.length} Sects</span>
            <span>•</span>
            <span>4 Districts</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            <Select value={sectFilter} onValueChange={setSectFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Sects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sects</SelectItem>
                {sects.map(sect => (
                  <SelectItem key={sect} value={sect}>{sect}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Monasteries Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMonasteries.map((monastery) => (
            <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={monastery.image} 
                  alt={monastery.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-900 hover:bg-red-800 text-white">
                    {monastery.sect}
                  </Badge>
                </div>
                {monastery.virtualTour && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      360° Available
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm">🎭 Demo Ready - Interactive Experience Available</p>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                      {monastery.name}
                    </CardTitle>
                    <CardDescription className="text-amber-700 font-medium">
                      {monastery.tibetanName}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>Founded {monastery.founded}</div>
                    <Button variant="ghost" size="sm" className="h-auto p-0 mt-1">
                      Show Details
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{monastery.location} • {monastery.altitude}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{monastery.monks} resident monks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{monastery.hours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Special Features</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {monastery.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                    {monastery.features.length > 4 && (
                      <div className="flex items-center text-gray-500">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        +{monastery.features.length - 4} more
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {monastery.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Audio Guide Languages</h4>
                  <div className="flex gap-2">
                    {monastery.audioGuides.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    asChild
                  >
                    <Link to={`/virtual-tours/${monastery.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      360° Tour
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/monasteries/${monastery.id}`}>
                      <Headphones className="w-4 h-4 mr-2" />
                      Audio Guide (English)
                    </Link>
                  </Button>
                </div>

                <Button variant="ghost" className="w-full" asChild>
                  <Link to={`/monasteries/${monastery.id}`}>
                    Plan Your Visit
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monasteries;
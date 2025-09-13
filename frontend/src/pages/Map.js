import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Info, Clock, Users, Mountain } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { monasteries } from '../data/mockData';

const Map = () => {
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [mapView, setMapView] = useState('terrain');

  const districtColors = {
    'East Sikkim': 'bg-blue-500',
    'West Sikkim': 'bg-green-500', 
    'North Sikkim': 'bg-purple-500',
    'South Sikkim': 'bg-orange-500'
  };

  const getDistrictColor = (district) => districtColors[district] || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Interactive Monastery Map
              </h1>
              <p className="text-gray-600">
                Explore the sacred locations across Sikkim with detailed monastery information
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" size="sm">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Map Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map View</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={mapView} onValueChange={setMapView}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="terrain">Terrain</TabsTrigger>
                    <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Districts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(districtColors).map(([district, color]) => {
                    const monasteryCount = monasteries.filter(m => m.location === district).length;
                    return (
                      <div key={district} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${color}`}></div>
                          <span className="text-sm font-medium">{district}</span>
                        </div>
                        <Badge variant="secondary">{monasteryCount}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-gray-500" />
                    <span>Highest Altitude</span>
                  </div>
                  <span className="font-medium">2,130m</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>Total Monks</span>
                  </div>
                  <span className="font-medium">
                    {monasteries.reduce((sum, m) => sum + m.monks, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Oldest Founded</span>
                  </div>
                  <span className="font-medium">
                    {Math.min(...monasteries.map(m => m.founded))}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Selected Monastery Info */}
            {selectedMonastery && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedMonastery.name}</CardTitle>
                  <CardDescription>{selectedMonastery.tibetanName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sect:</span>
                      <Badge className="bg-red-900 hover:bg-red-800 text-white text-xs">
                        {selectedMonastery.sect}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">{selectedMonastery.founded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Altitude:</span>
                      <span className="font-medium">{selectedMonastery.altitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monks:</span>
                      <span className="font-medium">{selectedMonastery.monks}</span>
                    </div>
                  </div>
                  <div className="pt-3 space-y-2">
                    <Button size="sm" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                      Get Directions
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[700px]">
              <CardContent className="p-0">
                {/* Placeholder Map */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden rounded-lg">
                  {/* Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-gray-200"></div>
                  </div>

                  {/* Mountain Ranges (Visual Elements) */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <pattern id="mountainPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                          <path d="M0,40 L20,0 L40,40 Z" fill="#e5e7eb" opacity="0.3"/>
                        </pattern>
                      </defs>
                      <rect width="800" height="600" fill="url(#mountainPattern)"/>
                      
                      {/* Mountain Silhouettes */}
                      <path d="M0,400 L100,200 L200,250 L300,150 L400,200 L500,100 L600,180 L700,120 L800,200 L800,600 L0,600 Z" 
                            fill="#f3f4f6" opacity="0.6"/>
                      <path d="M0,450 L150,300 L250,350 L400,250 L550,300 L700,200 L800,280 L800,600 L0,600 Z" 
                            fill="#e5e7eb" opacity="0.4"/>
                    </svg>
                  </div>

                  {/* Monastery Markers */}
                  {monasteries.map((monastery, index) => {
                    // Simulate positions based on districts
                    const positions = {
                      'East Sikkim': { x: 65, y: 45 },
                      'West Sikkim': { x: 25, y: 55 },
                      'North Sikkim': { x: 45, y: 25 },
                      'South Sikkim': { x: 55, y: 75 }
                    };
                    
                    const basePosition = positions[monastery.location] || { x: 50, y: 50 };
                    const x = basePosition.x + (index % 3 - 1) * 5; // Spread within district
                    const y = basePosition.y + (Math.floor(index / 3) % 3 - 1) * 5;
                    
                    return (
                      <div
                        key={monastery.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                          selectedMonastery?.id === monastery.id ? 'scale-125 z-10' : ''
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`
                        }}
                        onClick={() => setSelectedMonastery(monastery)}
                      >
                        <div className={`w-4 h-4 rounded-full ${getDistrictColor(monastery.location)} border-2 border-white shadow-lg`}>
                        </div>
                        <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap border transition-opacity ${
                          selectedMonastery?.id === monastery.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                        }`}>
                          {monastery.name}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-l border-t"></div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Compass */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <div className="w-12 h-12 relative">
                      <Navigation className="w-12 h-12 text-gray-600" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-600">N</div>
                    </div>
                  </div>

                  {/* Scale */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex">
                        <div className="w-8 h-1 bg-gray-800"></div>
                        <div className="w-8 h-1 bg-white border border-gray-800"></div>
                      </div>
                      <span className="font-medium">20 km</span>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">Interactive Map</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Click on monastery markers to view detailed information. 
                      Colors represent different districts of Sikkim.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Footer Info */}
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600 mb-1">
                    {monasteries.length}
                  </div>
                  <div className="text-sm text-gray-600">Sacred Locations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-900 mb-1">4</div>
                  <div className="text-sm text-gray-600">Buddhist Sects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {Math.max(...monasteries.map(m => m.founded)) - Math.min(...monasteries.map(m => m.founded))}+
                  </div>
                  <div className="text-sm text-gray-600">Years of Heritage</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
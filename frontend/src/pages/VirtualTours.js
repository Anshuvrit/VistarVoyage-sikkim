import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Move, Info, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { monasteries } from '../data/mockData';

const VirtualTours = () => {
  const { id } = useParams();
  const [currentView, setCurrentView] = useState('main-hall');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [showInfo, setShowInfo] = useState(true);
  const [rotation, setRotation] = useState(0);

  // If no ID provided, show tour selection
  if (!id) {
    return <TourSelection />;
  }

  const monastery = monasteries.find(m => m.id === id);
  
  if (!monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Virtual Tour not found</h1>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!monastery.virtualTour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            360° Tour Coming Soon
          </h1>
          <p className="text-gray-600 mb-4">
            Virtual tour for {monastery.name} is currently under development.
          </p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const tourSpots = [
    { id: 'main-hall', name: 'Main Prayer Hall', description: 'The central worship space with ancient murals' },
    { id: 'courtyard', name: 'Monastery Courtyard', description: 'Open area for ceremonies and gatherings' },
    { id: 'library', name: 'Scripture Library', description: 'Repository of Buddhist texts and manuscripts' },
    { id: 'stupa', name: 'Sacred Stupa', description: 'Memorial monument housing relics' },
    { id: 'gardens', name: 'Temple Gardens', description: 'Peaceful meditation and prayer gardens' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Virtual Tour Viewer */}
      <div className="relative h-screen">
        {/* 360° View Placeholder */}
        <div 
          className="w-full h-full bg-cover bg-center relative overflow-hidden"
          style={{ 
            backgroundImage: `url(${monastery.image})`,
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Hotspots */}
          {tourSpots.map((spot, index) => (
            <div
              key={spot.id}
              className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                currentView === spot.id ? 'animate-pulse' : ''
              }`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`
              }}
              onClick={() => setCurrentView(spot.id)}
            >
              <div className="w-6 h-6 bg-amber-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {spot.name}
              </div>
            </div>
          ))}

          {/* Virtual Tour Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-w-md">
            <h1 className="text-xl font-bold mb-2">{monastery.name}</h1>
            <p className="text-sm text-gray-300 mb-2">{monastery.tibetanName}</p>
            <Badge className="bg-amber-600 hover:bg-amber-700">
              360° Virtual Tour
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/80 backdrop-blur-sm text-white hover:bg-black/60"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/80 backdrop-blur-sm text-white hover:bg-black/60"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
            {/* Current Location Info */}
            <div className="mb-4">
              <div className="text-white">
                <h3 className="font-semibold">
                  {tourSpots.find(s => s.id === currentView)?.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {tourSpots.find(s => s.id === currentView)?.description}
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Playback Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setRotation(0)}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                  >
                    <ZoomOut className="w-5 h-5" />
                  </Button>
                  <span className="text-white text-sm w-12 text-center">{zoom}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      max={100}
                      step={1}
                      className="[&_.slider-track]:bg-white/30 [&_.slider-range]:bg-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tour Locations */}
              <div className="flex gap-2">
                {tourSpots.map((spot) => (
                  <Button
                    key={spot.id}
                    variant={currentView === spot.id ? "default" : "ghost"}
                    size="sm"
                    className={`text-white ${
                      currentView === spot.id 
                        ? 'bg-amber-600 hover:bg-amber-700' 
                        : 'hover:bg-white/20'
                    }`}
                    onClick={() => setCurrentView(spot.id)}
                  >
                    {spot.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <Card className="w-72 bg-black/80 backdrop-blur-sm border-gray-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Tour Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Navigation</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>• Click and drag to look around</div>
                    <div>• Use zoom controls to get closer</div>
                    <div>• Click hotspots to change location</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Audio Guide</h4>
                  <div className="text-sm text-gray-300">
                    Available in {monastery.audioGuides.join(', ')}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Special Features</h4>
                  <div className="space-y-1">
                    {monastery.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-2"></div>
            <p className="text-sm">Loading 360° Experience...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tour Selection Component
const TourSelection = () => {
  const availableTours = monasteries.filter(m => m.virtualTour);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Tours
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            Experience Sikkim's sacred monasteries from anywhere in the world with our immersive 360° virtual tours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTours.map((monastery) => (
            <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={monastery.image} 
                  alt={monastery.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    className="bg-white/90 text-gray-900 hover:bg-white"
                    onClick={() => window.location.href = `/virtual-tours/${monastery.id}`}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Tour
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600 hover:bg-amber-700 text-white">
                    360° Available
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                  {monastery.name}
                </CardTitle>
                <CardDescription className="text-amber-700 font-medium">
                  {monastery.tibetanName}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <span>📍 {monastery.location} • {monastery.altitude}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏛️ {monastery.sect} Sect • Est. {monastery.founded}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {monastery.description}
                </p>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    onClick={() => window.location.href = `/virtual-tours/${monastery.id}`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Tour
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTours;
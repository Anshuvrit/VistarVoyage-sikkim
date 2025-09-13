import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Calendar, Phone, Globe, Camera, Headphones, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { monasteries } from '../data/mockData';

const MonasteryDetail = () => {
  const { id } = useParams();
  const monastery = monasteries.find(m => m.id === id);

  if (!monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Monastery not found</h1>
          <Button asChild>
            <Link to="/monasteries">Back to Monasteries</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${monastery.image})` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white">
            <div className="mb-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                <Link to="/monasteries">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Monasteries
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-red-900 hover:bg-red-800">
                {monastery.sect}
              </Badge>
              {monastery.virtualTour && (
                <Badge variant="secondary" className="bg-white/90 text-gray-900">
                  360° Available
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {monastery.name}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {monastery.tibetanName}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{monastery.location}, {monastery.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Founded {monastery.founded}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{monastery.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="festivals">Festivals</TabsTrigger>
                <TabsTrigger value="visit">Visit Info</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Monastery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {monastery.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Key Statistics</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Resident Monks:</span>
                            <span className="font-medium">{monastery.monks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Altitude:</span>
                            <span className="font-medium">{monastery.altitude}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Buddhist Sect:</span>
                            <span className="font-medium">{monastery.sect}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Established:</span>
                            <span className="font-medium">{monastery.founded}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Special Features</h3>
                        <div className="space-y-2">
                          {monastery.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audio Guides Available</CardTitle>
                    <CardDescription>
                      Experience the monastery through expert-guided audio tours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {monastery.audioGuides.map((language) => (
                        <div key={language} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Headphones className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">{language}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            Listen
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Founded in {monastery.founded}, {monastery.name} has been a cornerstone of Buddhist 
                      learning and spiritual practice in {monastery.location} for over {2024 - monastery.founded} years.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      As part of the {monastery.sect} tradition, this monastery has preserved ancient 
                      teachings and continues to serve as an important center for meditation and 
                      Buddhist philosophy.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="festivals" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Festivals & Events</CardTitle>
                    <CardDescription>
                      Annual celebrations and special observances at the monastery
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Annual Festival</h4>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          The monastery celebrates its annual festival with traditional Cham dances and prayers.
                        </p>
                        <div className="text-xs text-gray-500">
                          Next celebration: Check monastery calendar
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Visiting Hours</h3>
                        <p className="text-gray-700">{monastery.hours}</p>
                        
                        <h3 className="font-semibold text-gray-900 mb-3 mt-6">Getting There</h3>
                        <p className="text-gray-700 text-sm">
                          Located in {monastery.location}, approximately {monastery.distance}. 
                          Private vehicles and taxis are recommended for the journey.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Guidelines</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>• Dress modestly and remove shoes before entering halls</div>
                          <div>• Photography may be restricted in certain areas</div>
                          <div>• Maintain silence during prayer sessions</div>
                          <div>• Donations are welcomed but not mandatory</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {monastery.virtualTour && (
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700" asChild>
                    <Link to={`/virtual-tours/${monastery.id}`}>
                      <Camera className="w-4 h-4 mr-2" />
                      360° Virtual Tour
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Monastery
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">District:</span>
                  <span className="font-medium">{monastery.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Altitude:</span>
                  <span className="font-medium">{monastery.altitude}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance from Gangtok:</span>
                  <span className="font-medium">{monastery.distance}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-sm text-gray-600">(127 reviews)</span>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "A truly peaceful and spiritual experience. The monks are welcoming and the architecture is breathtaking."
                </p>
                <div className="mt-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonasteryDetail;
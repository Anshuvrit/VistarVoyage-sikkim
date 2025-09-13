import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, Heart, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { festivals } from '../data/mockData';

const FestivalDetail = () => {
  const { id } = useParams();
  const festival = festivals.find(f => f.id === id);

  if (!festival) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Festival not found</h1>
          <Button asChild>
            <Link to="/festivals">Back to Festivals</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${festival.image})` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white">
            <div className="mb-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                <Link to="/festivals">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Festivals
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-red-900 hover:bg-red-800">
                {festival.category}
              </Badge>
              {festival.upcoming && (
                <Badge className="bg-green-100 text-green-800">
                  Upcoming
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {festival.name}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {festival.tibetanName}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{festival.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{festival.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{festival.monasteries} Monasteries</span>
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
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="traditions">Traditions</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Festival</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {festival.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Festival Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{festival.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium">{festival.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Participating Monasteries:</span>
                            <span className="font-medium">{festival.monasteries}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Entry Fee:</span>
                            <span className="font-medium">{festival.cost}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Cultural Significance</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>This festival represents deep spiritual and cultural traditions that have been preserved for centuries in Sikkim's Buddhist monasteries.</p>
                          <p>Visitors can experience authentic Buddhist practices while respectfully observing sacred ceremonies.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What to Expect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Ceremonies & Rituals</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Traditional prayer sessions</li>
                          <li>• Sacred mask dances (Cham)</li>
                          <li>• Ritual blessings</li>
                          <li>• Community gatherings</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Cultural Activities</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Traditional music performances</li>
                          <li>• Artisan demonstrations</li>
                          <li>• Local food stalls</li>
                          <li>• Cultural exhibitions</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Festival Schedule</CardTitle>
                    <CardDescription>
                      Detailed timeline of events and ceremonies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-amber-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">Opening Ceremonies</h4>
                            <p className="text-sm text-gray-600">Traditional prayers and ritual preparations</p>
                          </div>
                          <span className="text-sm text-gray-500">Day 1, 6:00 AM</span>
                        </div>
                      </div>
                      <div className="border-l-4 border-red-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">Main Festival Activities</h4>
                            <p className="text-sm text-gray-600">Sacred dances, blessings, and community celebrations</p>
                          </div>
                          <span className="text-sm text-gray-500">Day 2, All Day</span>
                        </div>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">Closing Ceremonies</h4>
                            <p className="text-sm text-gray-600">Final blessings and community feast</p>
                          </div>
                          <span className="text-sm text-gray-500">Day 3, 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="traditions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cultural Traditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Historical Background</h4>
                        <p className="text-gray-700 text-sm">
                          This festival has been celebrated for centuries, originating from ancient Buddhist teachings 
                          and local cultural practices unique to Sikkim's spiritual heritage.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Spiritual Significance</h4>
                        <p className="text-gray-700 text-sm">
                          The festival serves as a time for spiritual renewal, community bonding, and the preservation 
                          of sacred traditions passed down through generations of Buddhist practitioners.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Visitor Guidelines</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Dress modestly and respectfully</li>
                          <li>• Remove shoes when entering sacred areas</li>
                          <li>• Maintain silence during ceremonies</li>
                          <li>• Photography restrictions may apply</li>
                          <li>• Follow monastery guidelines</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Festival Gallery</CardTitle>
                    <CardDescription>
                      Images from previous celebrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square overflow-hidden rounded-lg bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
                          <img 
                            src={festival.image} 
                            alt={`Festival photo ${i}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-6">
                      <Button variant="outline">
                        View All Photos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {festival.upcoming && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Upcoming Festival</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                    Book Your Experience
                  </Button>
                  <Button variant="outline" className="w-full">
                    Get Reminder
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Festival Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{festival.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{festival.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monasteries:</span>
                  <span className="font-medium">{festival.monasteries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">{festival.cost}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share Festival</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Heart className="w-4 h-4" />
                  <span>347 people interested</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Festivals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {festivals.filter(f => f.id !== festival.id).slice(0, 2).map((relatedFestival) => (
                    <div key={relatedFestival.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        {relatedFestival.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">{relatedFestival.date}</p>
                      <Button size="sm" variant="ghost" className="text-xs p-0 h-auto" asChild>
                        <Link to={`/festivals/${relatedFestival.id}`}>
                          Learn More →
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalDetail;
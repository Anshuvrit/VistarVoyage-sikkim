import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, MapPin, Clock, Building, Calendar, ScrollText, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { monasteries, stats, features } from '../data/mockData';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMonasteries = monasteries.slice(0, 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMonasteries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMonasteries.length) % featuredMonasteries.length);
  };

  const getStatIcon = (iconName) => {
    const icons = {
      building: Building,
      calendar: Calendar,
      scroll: ScrollText,
      users: Users
    };
    const IconComponent = icons[iconName] || Building;
    return <IconComponent className="w-8 h-8 text-red-900" />;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredMonasteries.map((monastery, index) => (
            <div
              key={monastery.id}
              className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
              style={{ backgroundImage: `url(${monastery.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
                    {monastery.name}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 leading-relaxed">
                    {monastery.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{monastery.location}, {monastery.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Est. {monastery.founded}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {monastery.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      asChild
                    >
                      <Link to={`/virtual-tours/${monastery.id}`}>
                        <Play className="w-5 h-5 mr-2" />
                        Start Virtual Tour
                      </Link>
                    </Button>
                    <Button 
                      size="lg"
                      variant="secondary"
                      className="bg-red-900 hover:bg-red-800 text-white"
                      asChild
                    >
                      <Link to={`/monasteries/${monastery.id}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredMonasteries.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Text Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sikkim's Sacred <span className="text-amber-600">Buddhist Heritage</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Journey through centuries of spiritual wisdom preserved in the monasteries of Sikkim, 
              where ancient Buddhist traditions continue to inspire and guide.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                asChild
              >
                <Link to="/monasteries">
                  Explore Monasteries
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-red-900 text-red-900 hover:bg-red-900 hover:text-white"
                asChild
              >
                <Link to="/festivals">Sacred Festivals</Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  {getStatIcon(stat.icon)}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Sacred Wisdom
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Immerse yourself in the rich Buddhist heritage of Sikkim through our comprehensive digital platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to={feature.link}>
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preservation Section */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Preserving Sacred Traditions
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  For over 400 years, Sikkim's monasteries have been guardians of ancient Buddhist wisdom, 
                  preserving sacred texts, maintaining cultural practices, and providing spiritual guidance 
                  to communities across the Himalayas.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Our digital platform ensures these precious traditions remain accessible to future 
                  generations while honoring their sacred nature and cultural significance.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-amber-600 mb-1">Authentic Content</div>
                    <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-red-900 mb-1">Cultural Respect</div>
                    <div className="w-16 h-1 bg-red-900 mx-auto"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80" 
                      alt="Prayer flags in the Himalayas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Prayer Flags</h4>
                    <p className="text-sm text-gray-600">Sacred mantras carried by mountain winds</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sacred Lotus</h4>
                    <p className="text-sm text-gray-600">Symbol of purity and enlightenment</p>
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1593448816864-39f396a69ed0?auto=format&fit=crop&q=80" 
                      alt="Sacred lotus flower"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Begin Your Spiritual Journey
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Join thousands of spiritual seekers exploring Sikkim's Buddhist heritage. 
              Start your journey of discovery today.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                asChild
              >
                <Link to="/monasteries">Explore Monasteries</Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-red-900 text-red-900 hover:bg-red-900 hover:text-white"
                asChild
              >
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Services Indicator */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border max-w-sm">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-medium">GPS Location Detected</span>
          <Button size="sm" variant="ghost">Start Audio Guide</Button>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Gangtok City Center
        </div>
        <div className="text-xs text-amber-600 mt-1">
          📻 Welcome to Sikkim's Buddhist Heritage available
        </div>
      </div>
    </div>
  );
};

export default Home;
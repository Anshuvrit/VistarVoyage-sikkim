// Mock data for the Sikkim Sanctuary application
// This file contains all the mock data that will be replaced with backend API calls

export const monasteries = [
  {
    id: 'rumtek',
    name: 'Rumtek Dharma Chakra Centre',
    tibetanName: 'རུམ་ཐེག་ཆོས་འཁོར་གླིང་།',
    sect: 'Kagyu',
    founded: 1966,
    location: 'East Sikkim',
    altitude: '1,550m',
    distance: '24km from Gangtok',
    monks: 300,
    hours: '6:00 AM - 6:00 PM',
    description: 'The Dharma Chakra Centre serves as the main seat of His Holiness the Gyalwa Karmapa and the Karma Kagyu lineage. This magnificent monastery houses precious Buddhist artifacts, ancient manuscripts, and serves as a major center for Buddhist learning and practice.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80',
    features: ['Golden Stupa', 'Tantric College', 'Sacred Relics', 'Library', 'Prayer Wheels'],
    audioGuides: ['English', 'Hindi', 'Tibetan'],
    virtualTour: true,
    coordinates: [27.3331, 88.5419]
  },
  {
    id: 'pemayangste',
    name: 'Pemayangste Monastery',
    tibetanName: 'པད་མ་ཡང་རྩེ་དགོན་པ།',
    sect: 'Nyingma',
    founded: 1705,
    location: 'West Sikkim',
    altitude: '2,085m',
    distance: '110km from Gangtok',
    monks: 108,
    hours: '7:00 AM - 5:00 PM',
    description: 'Pemayangste, meaning \'Perfect Sublime Lotus\', is one of the oldest and most important Nyingma monasteries in Sikkim. Known for its seven-tiered painted wooden sculpture depicting the heavenly palace of Guru Rinpoche.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80',
    features: ['Seven-tiered Sculpture', 'Pure Lineage', 'Ancient Murals', 'Mountain Views', 'Sacred Texts'],
    audioGuides: ['English', 'Hindi'],
    virtualTour: true,
    coordinates: [27.2124, 88.2467]
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    tibetanName: 'བཀྲ་ཤིས་སྡིང་དགོན་པ།',
    sect: 'Nyingma',
    founded: 1641,
    location: 'West Sikkim',
    altitude: '1,465m',
    distance: '125km from Gangtok',
    monks: 75,
    hours: '6:00 AM - 6:00 PM',
    description: 'Tashiding Monastery, situated on a heart-shaped hill between the Rathong and Rangeet rivers, is famous for the annual Bumchu festival where sacred water predicts Sikkim\'s future.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
    features: ['Sacred Bumchu Pot', 'Heart-shaped Hill', 'Prophecy Traditions', 'River Confluence', 'Ancient Stupas'],
    audioGuides: ['English', 'Hindi', 'Nepali'],
    virtualTour: true,
    coordinates: [27.2833, 88.2667]
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    tibetanName: 'ལྷ་ཁང་དགོན་པ།',
    sect: 'Nyingma',
    founded: 1909,
    location: 'East Sikkim',
    altitude: '1,900m',
    distance: '3km from Gangtok',
    monks: 90,
    hours: '5:00 AM - 7:00 PM',
    description: 'Enchey Monastery, meaning \'Solitary Temple\', is perched on a hill overlooking Gangtok city. Known for its spectacular Cham dance performances and beautiful city views.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80',
    features: ['City Views', 'Cham Dance', 'Flying Lama Legend', 'Urban Location', 'Cultural Events'],
    audioGuides: ['English', 'Hindi', 'Tibetan'],
    virtualTour: true,
    coordinates: [27.3389, 88.6069]
  }
];

export const festivals = [
  {
    id: 'losar',
    name: 'Losar - Tibetan New Year',
    tibetanName: 'ལོ་གསར།',
    category: 'New Year Celebration',
    duration: '3 days',
    date: 'February 10-12, 2024',
    monasteries: 10,
    cost: 'Free (donations welcomed)',
    description: 'Losar marks the beginning of the Tibetan New Year and is the most important festival in the Tibetan calendar. It\'s a time of renewal, purification, and celebration across all Buddhist monasteries in Sikkim.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80',
    upcoming: false
  },
  {
    id: 'saga-dawa',
    name: 'Saga Dawa Festival',
    tibetanName: 'ས་ག་ཟླ་བ།',
    category: 'Buddha\'s Birth, Enlightenment & Parinirvana',
    duration: '3 days',
    date: 'May 15-17, 2024',
    monasteries: 3,
    cost: 'Free (pilgrimage may require trekking permits)',
    description: 'Saga Dawa commemorates the birth, enlightenment, and parinirvana (death) of Lord Buddha. It\'s considered the most sacred month in Tibetan Buddhism when merit accumulated through good deeds is multiplied.',
    image: 'https://images.unsplash.com/photo-1593448816864-39f396a69ed0?auto=format&fit=crop&q=80',
    upcoming: false
  },
  {
    id: 'bumchu',
    name: 'Bumchu Festival',
    tibetanName: 'བུམ་ཆུ།',
    category: 'Sacred Water Prediction Ceremony',
    duration: '3 days',
    date: 'January 28-30, 2024',
    monasteries: 1,
    cost: 'Free (donations for monastery upkeep welcomed)',
    description: 'The Bumchu festival is unique to Tashiding Monastery, where sacred water levels in a sealed pot predict the coming year\'s fortune for Sikkim. This mysterious ritual has been practiced for centuries.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80',
    upcoming: true
  },
  {
    id: 'chaam',
    name: 'Chaam (Mask Dance) Festival',
    tibetanName: 'འཆམ།',
    category: 'Sacred Mask Dance Celebration',
    duration: '2 days',
    date: 'December 18-19, 2024',
    monasteries: 3,
    cost: 'Free (special seating may require small donation)',
    description: 'Chaam is a sacred mask dance festival performed by monks wearing elaborate costumes and masks representing various Buddhist deities, demons, and protective spirits. The dances tell stories of good triumphing over evil.',
    image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&q=80',
    upcoming: false
  }
];

export const communityStories = [
  {
    id: 1,
    title: 'My First Visit to Rumtek Monastery',
    category: 'experience',
    monastery: 'Rumtek Monastery',
    author: 'Pemba Sherpa',
    date: '1/15/2024',
    verified: true,
    local: true,
    likes: 156,
    comments: 23,
    content: 'Growing up in Gangtok, I remember my grandmother taking me to Rumtek for the first time during Losar. The sound of the horns echoing across the valley, the colorful prayer flags dancing in the mountain breeze, and the peaceful faces of the monks left an indelible mark on my young heart. That visit changed my understanding of spirituality and connected me deeply to our Sikkimese heritage.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'The Legend of Tashiding\'s Sacred Water',
    category: 'history',
    monastery: 'Tashiding Monastery',
    author: 'Tenzin Lama',
    date: '1/10/2024',
    verified: true,
    local: true,
    likes: 94,
    comments: 18,
    content: 'Local elders tell the story of how Guru Rinpoche blessed the waters of Tashiding, making it one of the holiest sites in Sikkim. During the Bumchu festival, when the sacred pot is opened, the water level predicts our state\'s fortune. I\'ve witnessed this ceremony for over 40 years, and the accuracy of these predictions never ceases to amaze me.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Sunrise Meditation at Pemayangtse',
    category: 'experience',
    monastery: 'Pemayangtse Monastery',
    author: 'Sarah Mitchell',
    date: '1/8/2024',
    verified: false,
    local: false,
    likes: 203,
    comments: 31,
    content: 'Waking up at 4 AM for morning prayers at Pemayangtse, I experienced the most profound sunrise of my life. The monastery, perched on a hilltop, offers an unobstructed view of Kanchenjunga. As the first rays of sunlight touched the snow-capped peaks, the monks began their morning chants. It felt like heaven on earth.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80'
  }
];

export const stats = [
  { number: '10+', label: 'Historic Monasteries', icon: 'building' },
  { number: '7', label: 'Sacred Festivals', icon: 'calendar' },
  { number: '500+', label: 'Years of Heritage', icon: 'scroll' },
  { number: '1000+', label: 'Community Members', icon: 'users' }
];

export const features = [
  {
    title: 'Sacred Monasteries',
    description: 'Discover 10+ ancient Buddhist monasteries across Sikkim',
    link: '/monasteries',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80'
  },
  {
    title: 'Buddhist Festivals',
    description: 'Experience the spiritual celebrations throughout the year',
    link: '/festivals',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80'
  },
  {
    title: 'Community Stories',
    description: 'Share and read inspiring spiritual journeys',
    link: '/community',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
  },
  {
    title: 'Ancient Manuscripts',
    description: 'Explore precious Buddhist texts and sacred writings',
    link: '/manuscripts',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80'
  }
];
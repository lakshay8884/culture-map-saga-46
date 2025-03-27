
export interface Region {
  id: string;
  name: string;
  description: string;
}

export interface CulturalSite {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  regionId: string;
  category: 'monument' | 'festival' | 'art' | 'heritage';
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  rating: number;
  facts: string[];
  gallery: string[];
  isFeatured: boolean;
}

export const regions: Region[] = [
  {
    id: 'north',
    name: 'North India',
    description: 'Home to majestic monuments like Taj Mahal and vibrant festivals.'
  },
  {
    id: 'south',
    name: 'South India',
    description: 'Known for ancient temples, classical arts, and rich traditions.'
  },
  {
    id: 'east',
    name: 'East India',
    description: 'Famous for cultural heritage, literature, and artistic expressions.'
  },
  {
    id: 'west',
    name: 'West India',
    description: 'Celebrated for colorful festivals, historic palaces, and diverse customs.'
  },
  {
    id: 'central',
    name: 'Central India',
    description: 'Rich in tribal culture, ancient caves, and historical significance.'
  },
];

export const culturalSites: CulturalSite[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centerpiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.',
    shortDescription: 'Iconic marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    location: 'Agra, Uttar Pradesh',
    regionId: 'north',
    category: 'monument',
    coordinates: {
      lat: 27.1751,
      lng: 78.0421
    },
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    rating: 4.9,
    facts: [
      'The Taj Mahal was designated as a UNESCO World Heritage Site in 1983.',
      'The construction took approximately 22 years to complete.',
      'Over 20,000 workers and 1,000 elephants were used to build the Taj Mahal.',
      'The Taj Mahal appears to change color depending on the time of day and moonlight.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    isFeatured: true
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    description: 'Hawa Mahal, or "Palace of Winds," is a palace in Jaipur, India, built in 1799 by Maharaja Sawai Pratap Singh. The five-story structure is made of red and pink sandstone and has 953 small windows called jharokhas decorated with intricate latticework. The palace was built for the women of the royal household to observe street festivals while remaining unseen from the outside.',
    shortDescription: 'Palace in Jaipur known for its honeycomb facade with 953 small windows, allowing royal women to observe street life unseen.',
    location: 'Jaipur, Rajasthan',
    regionId: 'west',
    category: 'monument',
    coordinates: {
      lat: 26.9239,
      lng: 75.8267
    },
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    rating: 4.7,
    facts: [
      'The palace has 953 small windows or "Jharokhas" that are decorated with intricate latticework.',
      'The unique honeycomb design was inspired by the crown of Lord Krishna.',
      'Despite its appearance, Hawa Mahal is only one room deep in most places.',
      'The building\'s curved architecture allows cool air to circulate, creating a natural ventilation system.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1624805003860-a3b69e580b0b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1667114978793-17719c551f3c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1598222795160-5f1ab67f87d6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    isFeatured: true
  },
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Temple',
    description: 'The Meenakshi Temple, also referred to as Meenakshi Amman or Minakshi-Sundareshwara Temple, is a historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu, India. It is dedicated to Goddess Meenakshi, a form of Parvati, and her consort, Lord Sundareshwar, a form of Shiva. The temple is the heart and lifeline of the 2,500-year-old city of Madurai and is a significant symbol of the Tamil people\'s architecture and culture.',
    shortDescription: 'Historic temple in Madurai known for its towering gopurams, sculptures, and annual Meenakshi Thirukalyanam festival.',
    location: 'Madurai, Tamil Nadu',
    regionId: 'south',
    category: 'monument',
    coordinates: {
      lat: 9.9195,
      lng: 78.1193
    },
    imageUrl: 'https://images.unsplash.com/photo-1621351683756-3f30a45c6aca?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    rating: 4.8,
    facts: [
      'The temple has 14 gateway towers called "gopurams," with the tallest reaching approximately 170 feet.',
      'There are an estimated 33,000 sculptures within the temple complex.',
      'The temple features a famous Hall of a Thousand Pillars, each carved in the Dravidian style.',
      'The annual Meenakshi Thirukalyanam festival attracts over a million visitors.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1605807646983-377bc5a76493?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1592297857139-2d5100b8795f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1590766116485-d2122b7cca95?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    isFeatured: true
  },
  {
    id: 'ajanta-caves',
    name: 'Ajanta Caves',
    description: 'The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state in India. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art, particularly expressive paintings that present emotions through gesture, pose, and form.',
    shortDescription: 'Ancient rock-cut Buddhist caves featuring extraordinary paintings and sculptures dating from 2nd century BCE.',
    location: 'Aurangabad, Maharashtra',
    regionId: 'west',
    category: 'heritage',
    coordinates: {
      lat: 20.5519,
      lng: 75.7033
    },
    imageUrl: 'https://images.unsplash.com/photo-1588083949403-3eda1bc38564?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    rating: 4.6,
    facts: [
      'The Ajanta Caves were designated a UNESCO World Heritage Site in 1983.',
      'These caves were accidentally discovered by a British officer during a tiger hunt in 1819.',
      'The paintings use techniques like outlining, coloring, and shading that are similar to modern painting methods.',
      'The caves were built in two phases: the first around the 2nd century BCE and the second around 400-650 CE.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1610018507412-8f8fe232693a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1602508723550-66fccce6837a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1582457601528-5f8961901f03?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    isFeatured: false
  },
  {
    id: 'diwali-festival',
    name: 'Diwali Festival',
    description: 'Diwali, or Deepavali, is one of India\'s biggest and most important festivals of the year. The festival gets its name from the row (avali) of clay lamps (deepa) that Indians light outside their homes to symbolize the inner light that protects from spiritual darkness. This festival is as important to Hindus as Christmas is to Christians. Over the centuries, Diwali has become a national festival that\'s enjoyed by most Indians regardless of faith.',
    shortDescription: 'Festival of lights celebrating the triumph of light over darkness with illuminated homes, fireworks, and family gatherings.',
    location: 'Nationwide',
    regionId: 'north',
    category: 'festival',
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    },
    imageUrl: 'https://images.unsplash.com/photo-1604423077159-db8a473cb3dad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    rating: 4.9,
    facts: [
      'Diwali lasts for five days, with each day having its own significance and rituals.',
      'People clean and decorate their homes and light oil lamps called diyas.',
      'The festival celebrates Lord Rama\'s return to Ayodhya after defeating Ravana.',
      'Lakshmi, the goddess of wealth and prosperity, is worshipped during Diwali.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1636121156819-c15de49f3e47?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1603201236596-eb1a63eb0ede?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1574265932297-513ece834a66?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    isFeatured: true
  },
  {
    id: 'kathakali',
    name: 'Kathakali Dance',
    description: 'Kathakali is a major form of classical Indian dance. It is a "story play" genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks worn by the traditionally male actor-dancers. It originated in the Hindu state of Kerala during the 17th century and is a group presentation in which dancers specialize in one or more of the five roles: the hero, heroine, minions, females, and villains.',
    shortDescription: 'Classical dance-drama from Kerala known for elaborate costumes, makeup, and expressive storytelling through facial expressions and gestures.',
    location: 'Kerala',
    regionId: 'south',
    category: 'art',
    coordinates: {
      lat: 10.8505,
      lng: 76.2711
    },
    imageUrl: 'https://images.unsplash.com/photo-1601015104278-3a9063d9b6e7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    rating: 4.7,
    facts: [
      'A Kathakali performance can last all night, sometimes up to eight hours.',
      'Training for Kathakali is extremely rigorous and typically begins at a young age.',
      'The elaborate makeup process for performers can take 3-5 hours to complete.',
      'There are 24 main mudras (hand gestures) used in Kathakali to communicate specific meanings.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1665586019974-db2d7a86c00c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1625477121555-0670824aaea4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1581164252141-d4db9e2af936?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    isFeatured: true
  }
];

export const culturalInsights = [
  {
    id: '1',
    title: 'India has over 1,000 UNESCO World Heritage Sites',
    content: 'India is home to 38 UNESCO World Heritage Sites, including the Taj Mahal, Ajanta Caves, and the Mountain Railways of India.'
  },
  {
    id: '2',
    title: 'The world\'s first university was established in Takshashila, India',
    content: 'Dating back to 700 BCE, Takshashila University offered courses in over 60 subjects and attracted students from across Asia.'
  },
  {
    id: '3',
    title: 'Chess originated in India',
    content: 'The game of chess originated in India around the 6th century AD and was originally called Chaturanga.'
  },
  {
    id: '4',
    title: 'India has the most post offices in the world',
    content: 'With over 155,000 post offices, India has the largest postal network in the world, including a floating post office in Dal Lake, Srinagar.'
  },
  {
    id: '5',
    title: 'India is home to every major world religion',
    content: 'India is the birthplace of Hinduism, Buddhism, Jainism, and Sikhism, and has significant populations of Muslims, Christians, Jews, and Zoroastrians.'
  }
];

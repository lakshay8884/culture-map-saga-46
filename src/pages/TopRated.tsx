
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

// Top rated data
const topRatedData = {
  monuments: [
    {
      id: 'taj-mahal',
      name: 'Taj Mahal',
      location: 'Agra, Uttar Pradesh',
      rating: 4.9,
      visitors: '7+ million yearly',
      description: 'The iconic ivory-white marble mausoleum on the south bank of the Yamuna river, commissioned in 1632 by the Mughal emperor Shah Jahan for his favorite wife.',
      image: 'https://source.unsplash.com/featured/?tajmahal'
    },
    {
      id: 'hawa-mahal',
      name: 'Hawa Mahal',
      location: 'Jaipur, Rajasthan',
      rating: 4.6,
      visitors: '1+ million yearly',
      description: 'The "Palace of Winds" is a five-story palace built in 1799 with a honeycomb facade of 953 small windows to allow royal ladies to observe street festivals without being seen.',
      image: 'https://source.unsplash.com/featured/?hawamahal'
    },
    {
      id: 'mysore-palace',
      name: 'Mysore Palace',
      location: 'Mysore, Karnataka',
      rating: 4.7,
      visitors: '3+ million yearly',
      description: 'The historic palace and royal residence at Mysore, once the official residence of the Wadiyar dynasty who ruled the Kingdom of Mysore from 1399 to 1950.',
      image: 'https://source.unsplash.com/featured/?mysorepalace'
    },
    {
      id: 'qutub-minar',
      name: 'Qutub Minar',
      location: 'Delhi',
      rating: 4.5,
      visitors: '3+ million yearly',
      description: 'A 73-meter minaret built in 1192 by Qutab-ud-din Aibak after defeating Delhi\'s last Hindu kingdom. The tower is one of the finest examples of Indo-Islamic architecture.',
      image: 'https://source.unsplash.com/featured/?qutubminar'
    },
    {
      id: 'golden-temple',
      name: 'Golden Temple',
      location: 'Amritsar, Punjab',
      rating: 4.9,
      visitors: '8+ million yearly',
      description: 'The holiest gurdwara and the most important pilgrimage site of Sikhism, known for its gold-plated building and the reflection in its surrounding pool.',
      image: 'https://source.unsplash.com/featured/?goldentemple'
    },
    {
      id: 'meenakshi-temple',
      name: 'Meenakshi Temple',
      location: 'Madurai, Tamil Nadu',
      rating: 4.7,
      visitors: '15,000+ daily',
      description: 'An ancient temple dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva. Known for its stunning architecture and thousands of sculptures.',
      image: 'https://source.unsplash.com/featured/?meenakshitemple'
    }
  ],
  festivals: [
    {
      id: 'diwali',
      name: 'Diwali',
      location: 'Nationwide',
      rating: 4.9,
      participants: 'Over 1 billion',
      description: 'The festival of lights is India\'s biggest and most important holiday of the year, celebrating the victory of light over darkness with lamps, fireworks, and family gatherings.',
      image: 'https://source.unsplash.com/featured/?diwali'
    },
    {
      id: 'holi',
      name: 'Holi',
      location: 'Nationwide (especially Mathura, Vrindavan)',
      rating: 4.8,
      participants: '100+ million',
      description: 'The colorful spring festival where people throw colored powders and water at each other, celebrating the victory of good over evil and the arrival of spring.',
      image: 'https://source.unsplash.com/featured/?holi'
    },
    {
      id: 'durga-puja',
      name: 'Durga Puja',
      location: 'Kolkata, West Bengal',
      rating: 4.8,
      participants: '10+ million',
      description: 'A major social and religious festival celebrating the triumph of Goddess Durga over the buffalo demon, featuring elaborate pandals, cultural performances, and community celebrations.',
      image: 'https://source.unsplash.com/featured/?durgapuja'
    },
    {
      id: 'ganesh-chaturthi',
      name: 'Ganesh Chaturthi',
      location: 'Maharashtra (especially Mumbai)',
      rating: 4.7,
      participants: '10+ million',
      description: 'A 10-day festival honoring the elephant-headed deity Ganesha, with elaborate public installations of Ganesha idols and processions culminating in their immersion in water bodies.',
      image: 'https://source.unsplash.com/featured/?ganeshchaturthi'
    },
    {
      id: 'kumbh-mela',
      name: 'Kumbh Mela',
      location: 'Rotates between Prayagraj, Haridwar, Nashik, and Ujjain',
      rating: 4.9,
      participants: '100+ million',
      description: 'The world\'s largest religious gathering, occurring every 12 years at each location, where pilgrims bathe in sacred rivers to cleanse sins and attain salvation.',
      image: 'https://source.unsplash.com/featured/?kumbhmela'
    },
    {
      id: 'navratri',
      name: 'Navratri',
      location: 'Gujarat (especially)',
      rating: 4.7,
      participants: '10+ million',
      description: 'Nine nights of worship and dance dedicated to the goddess Shakti, featuring energetic Garba and Dandiya Raas dance performances.',
      image: 'https://source.unsplash.com/featured/?navratri'
    }
  ],
  heritage: [
    {
      id: 'hampi',
      name: 'Hampi',
      location: 'Karnataka',
      rating: 4.7,
      visitors: '500,000+ yearly',
      description: 'The ruins of Vijayanagara, the former capital of the Vijayanagara Empire, featuring stunning temple complexes, royal pavilions, and boulder-strewn landscapes.',
      image: 'https://source.unsplash.com/featured/?hampi'
    },
    {
      id: 'ajanta-ellora',
      name: 'Ajanta & Ellora Caves',
      location: 'Maharashtra',
      rating: 4.8,
      visitors: '1+ million yearly',
      description: 'Ancient rock-cut cave monuments dating from the 2nd century BCE to about 480 CE, featuring paintings and sculptures considered masterpieces of Buddhist religious art.',
      image: 'https://source.unsplash.com/featured/?ajantacaves'
    },
    {
      id: 'khajuraho',
      name: 'Khajuraho Group of Monuments',
      location: 'Madhya Pradesh',
      rating: 4.8,
      visitors: '300,000+ yearly',
      description: 'A group of Hindu and Jain temples famous for their nagara-style architectural symbolism and erotic sculptures that are some of the finest in medieval Indian art.',
      image: 'https://source.unsplash.com/featured/?khajuraho'
    },
    {
      id: 'konark',
      name: 'Konark Sun Temple',
      location: 'Odisha',
      rating: 4.6,
      visitors: '2+ million yearly',
      description: 'A 13th-century temple dedicated to the sun god Surya, shaped like a giant chariot with intricately carved stone wheels, pillars, and walls.',
      image: 'https://source.unsplash.com/featured/?konarktemple'
    },
    {
      id: 'mahabalipuram',
      name: 'Mahabalipuram',
      location: 'Tamil Nadu',
      rating: 4.5,
      visitors: '800,000+ yearly',
      description: 'A 7th-century port city known for its shore temples, rathas (chariot-shaped temples), cave sanctuaries, and giant open-air rock reliefs.',
      image: 'https://source.unsplash.com/featured/?mahabalipuram'
    },
    {
      id: 'fatehpur-sikri',
      name: 'Fatehpur Sikri',
      location: 'Uttar Pradesh',
      rating: 4.7,
      visitors: '500,000+ yearly',
      description: 'A city built by Emperor Akbar as the capital of the Mughal Empire in the 16th century, featuring a unique blend of Persian and local architectural styles.',
      image: 'https://source.unsplash.com/featured/?fatehpursikri'
    }
  ]
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center mr-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : i < rating
                ? 'text-yellow-400 fill-yellow-400 opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const TopRated: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("monuments");
  
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-deepBlue dark:text-white">
          <span className="text-terracotta">Top Rated</span> Cultural Experiences
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Explore India's most highly rated cultural attractions and experiences
        </p>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monuments">Monuments</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
            <TabsTrigger value="heritage">Heritage Sites</TabsTrigger>
          </TabsList>
          
          {Object.entries(topRatedData).map(([category, items]) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://source.unsplash.com/featured/?india,culture';
                        }}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <StarRating rating={item.rating} />
                      </div>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {item.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{item.description}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        {category === 'festivals' ? (
                          <><Users className="w-3 h-3 mr-1" /> {item.participants} participants</>
                        ) : (
                          <><Users className="w-3 h-3 mr-1" /> {item.visitors} visitors</>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Astitva - The Cultural and Rituals Aspects of India. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TopRated;

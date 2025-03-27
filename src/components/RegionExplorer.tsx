
import React, { useState, useEffect } from 'react';
import { regions } from '@/data/culturalData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from 'lucide-react';

// Example data for states within each region
const regionStates = {
  north: [
    { id: 'delhi', name: 'Delhi', image: 'https://source.unsplash.com/featured/?delhi', description: 'The capital territory, known for Red Fort, Qutub Minar, and India Gate.' },
    { id: 'himachal', name: 'Himachal Pradesh', image: 'https://source.unsplash.com/featured/?himachal', description: 'Known for its scenic mountain views, temples, and hill stations like Shimla and Manali.' },
    { id: 'punjab', name: 'Punjab', image: 'https://source.unsplash.com/featured/?punjab', description: 'Famous for the Golden Temple, rich agricultural lands, and vibrant Bhangra dance.' },
    { id: 'uttarakhand', name: 'Uttarakhand', image: 'https://source.unsplash.com/featured/?uttarakhand', description: 'Known as the "Land of Gods", famous for Himalayan peaks, sacred rivers, and yoga.' }
  ],
  south: [
    { id: 'kerala', name: 'Kerala', image: 'https://source.unsplash.com/featured/?kerala', description: 'Known as "God\'s Own Country", famous for backwaters, beaches, and Kathakali dance.' },
    { id: 'tamilnadu', name: 'Tamil Nadu', image: 'https://source.unsplash.com/featured/?tamilnadu', description: 'Famous for ancient Dravidian temples, classical Bharatanatyam dance, and cuisine.' },
    { id: 'karnataka', name: 'Karnataka', image: 'https://source.unsplash.com/featured/?bangalore', description: 'Known for tech hub Bangalore, historic Mysore Palace, and Hampi ruins.' },
    { id: 'andhra', name: 'Andhra Pradesh', image: 'https://source.unsplash.com/featured/?andhra', description: 'Famous for Tirupati temple, coastal beauty, and spicy cuisine.' }
  ],
  east: [
    { id: 'bengal', name: 'West Bengal', image: 'https://source.unsplash.com/featured/?kolkata', description: 'Known for Kolkata\'s colonial architecture, Durga Puja, and Rabindranath Tagore\'s legacy.' },
    { id: 'odisha', name: 'Odisha', image: 'https://source.unsplash.com/featured/?odisha', description: 'Famous for Sun Temple, Jagannath Temple, and ancient tribal cultures.' },
    { id: 'assam', name: 'Assam', image: 'https://source.unsplash.com/featured/?assam', description: 'Known for tea plantations, Kaziranga National Park, and Bihu dance.' },
    { id: 'sikkim', name: 'Sikkim', image: 'https://source.unsplash.com/featured/?sikkim', description: 'A mountainous state with Buddhist monasteries and stunning Himalayan views.' }
  ],
  west: [
    { id: 'gujarat', name: 'Gujarat', image: 'https://source.unsplash.com/featured/?gujarat', description: 'Known for vibrant textiles, the Great Rann of Kutch, and Navratri festival.' },
    { id: 'maharashtra', name: 'Maharashtra', image: 'https://source.unsplash.com/featured/?mumbai', description: 'Home to Mumbai, Ajanta-Ellora caves, and rich Marathi culture.' },
    { id: 'rajasthan', name: 'Rajasthan', image: 'https://source.unsplash.com/featured/?rajasthan', description: 'The "Land of Kings" known for palaces, forts, and vibrant desert culture.' },
    { id: 'goa', name: 'Goa', image: 'https://source.unsplash.com/featured/?goa', description: 'Famous for beaches, Portuguese architecture, and unique Indo-Portuguese culture.' }
  ],
  central: [
    { id: 'mp', name: 'Madhya Pradesh', image: 'https://source.unsplash.com/featured/?khajuraho', description: 'Known as the "Heart of India", famous for Khajuraho temples and wildlife.' },
    { id: 'chhattisgarh', name: 'Chhattisgarh', image: 'https://source.unsplash.com/featured/?chhattisgarh', description: 'Rich in tribal heritage, forests, and waterfalls.' },
    { id: 'jharkhand', name: 'Jharkhand', image: 'https://source.unsplash.com/featured/?jharkhand', description: 'Known for mineral resources, tribal culture, and natural beauty.' },
    { id: 'up', name: 'Uttar Pradesh', image: 'https://source.unsplash.com/featured/?taj-mahal', description: 'Home to the Taj Mahal, Varanasi, and significant spiritual heritage.' }
  ],
  northeast: [
    { id: 'arunachal', name: 'Arunachal Pradesh', image: 'https://source.unsplash.com/featured/?arunachal', description: 'Known as the "Land of Dawn-Lit Mountains" with diverse tribal cultures.' },
    { id: 'manipur', name: 'Manipur', image: 'https://source.unsplash.com/featured/?manipur', description: 'Famous for Loktak Lake, classical Manipuri dance, and indigenous sports.' },
    { id: 'meghalaya', name: 'Meghalaya', image: 'https://source.unsplash.com/featured/?meghalaya', description: 'Known as "Abode of Clouds", famous for living root bridges and waterfalls.' },
    { id: 'nagaland', name: 'Nagaland', image: 'https://source.unsplash.com/featured/?nagaland', description: 'Known for Hornbill Festival, tribal heritage, and stunning hill landscapes.' }
  ]
};

const RegionExplorer: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("north");
  const [searchQuery, setSearchQuery] = useState("");
  
  const getRegionById = (id: string) => {
    return regions.find(region => region.id === id);
  };

  const currentRegion = getRegionById(selectedRegion);
  const states = regionStates[selectedRegion as keyof typeof regionStates] || [];
  
  // Filter states based on search query
  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <Tabs defaultValue="north" onValueChange={setSelectedRegion}>
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-7 gap-2">
            {regions.map((region) => (
              <TabsTrigger 
                key={region.id}
                value={region.id}
                className="px-3 py-1.5 text-sm font-medium"
              >
                {region.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {regions.map((region) => (
          <TabsContent key={region.id} value={region.id} className="p-0">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-semibold text-deepBlue dark:text-gold mb-2">
                  {region.name} India
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentRegion?.description || `Explore the diverse cultural heritage, traditions, and landmarks of ${region.name}ern India.`}
                </p>
                
                {/* Add search box for states */}
                <div className="mt-4 relative">
                  <Label htmlFor="state-search" className="sr-only">Search States</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="state-search"
                      type="text"
                      placeholder="Search states by name or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStates.length > 0 ? (
                  filteredStates.map((state) => (
                    <div key={state.id} className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50 shadow-sm hover-lift transition-all">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={state.image} 
                          alt={state.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://source.unsplash.com/featured/?india';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-serif font-semibold text-gray-900 dark:text-white mb-2">
                          {state.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {state.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No states found matching your search. Try another query.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RegionExplorer;

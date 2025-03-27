import React, { useState } from 'react';
import { regions } from '@/data/culturalData';
import { regionStates } from '@/data/regionStates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from 'lucide-react';

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
    (state.description || '').toLowerCase().includes(searchQuery.toLowerCase())
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

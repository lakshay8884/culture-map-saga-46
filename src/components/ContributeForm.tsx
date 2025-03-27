
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Upload } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { regions } from '@/data/culturalData';
import { useToast } from "@/hooks/use-toast";
import { addFestival } from '@/data/festivalData';

// Form schema using zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  type: z.enum(['festival', 'monument', 'temple', 'cultural_site']),
  date: z.date().optional(),
  region: z.string(),
  state: z.string(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  religion: z.string().optional(),
  image: z.string().optional(),
  contactName: z.string().min(2, { message: 'Your name is required' }),
  contactEmail: z.string().email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

// Example data for states within each region
const regionStates = {
  north: [
    { id: 'delhi', name: 'Delhi' },
    { id: 'himachal', name: 'Himachal Pradesh' },
    { id: 'punjab', name: 'Punjab' },
    { id: 'uttarakhand', name: 'Uttarakhand' },
  ],
  south: [
    { id: 'kerala', name: 'Kerala' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'andhra', name: 'Andhra Pradesh' },
  ],
  east: [
    { id: 'bengal', name: 'West Bengal' },
    { id: 'odisha', name: 'Odisha' },
    { id: 'assam', name: 'Assam' },
    { id: 'sikkim', name: 'Sikkim' },
  ],
  west: [
    { id: 'gujarat', name: 'Gujarat' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'goa', name: 'Goa' },
  ],
  central: [
    { id: 'mp', name: 'Madhya Pradesh' },
    { id: 'chhattisgarh', name: 'Chhattisgarh' },
    { id: 'jharkhand', name: 'Jharkhand' },
    { id: 'up', name: 'Uttar Pradesh' },
  ],
  northeast: [
    { id: 'arunachal', name: 'Arunachal Pradesh' },
    { id: 'manipur', name: 'Manipur' },
    { id: 'meghalaya', name: 'Meghalaya' },
    { id: 'nagaland', name: 'Nagaland' },
  ],
  nationwide: [
    { id: 'all', name: 'All India' },
  ],
};

const religionOptions = [
  { id: 'hinduism', name: 'Hinduism' },
  { id: 'islam', name: 'Islam' },
  { id: 'christianity', name: 'Christianity' },
  { id: 'sikhism', name: 'Sikhism' },
  { id: 'buddhism', name: 'Buddhism' },
  { id: 'jainism', name: 'Jainism' },
  { id: 'cultural', name: 'Cultural (Non-religious)' },
  { id: 'other', name: 'Other' },
];

const ContributeForm: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'festival',
      region: '',
      state: '',
      description: '',
      contactName: '',
      contactEmail: '',
    },
  });

  // Get available states based on selected region
  const availableStates = selectedRegion 
    ? regionStates[selectedRegion as keyof typeof regionStates] || []
    : [];

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // Here we're just creating a local URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      form.setValue('image', imageUrl);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be sent to a backend API
      console.log('Submitted data:', data);
      
      // If this is a festival, add it to our local festival data
      if (data.type === 'festival' && data.date) {
        const newFestival = addFestival({
          name: data.name,
          date: data.date,
          region: data.region,
          state: data.state,
          description: data.description,
          image: data.image || 'https://source.unsplash.com/featured/?festival,india',
          religion: data.religion
        });
        
        console.log('New festival added:', newFestival);
      }
      
      // Show success toast
      toast({
        title: "Contribution submitted!",
        description: "Thank you for your contribution to Astitva.",
      });
      
      // Reset form
      form.reset();
      setImagePreview(null);
      setSelectedRegion('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error submitting contribution",
        description: "There was a problem submitting your contribution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-serif font-semibold text-deepBlue dark:text-gold mb-4">
          Contribute to Astitva
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Share your local cultural heritage, festivals, monuments, or temples with our community. 
          Your contributions help preserve and celebrate India's rich cultural diversity.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bihu Festival or Meenakshi Temple" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the festival, monument, or cultural site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Type Field */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset date if not a festival
                        if (value !== 'festival') {
                          form.setValue('date', undefined);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="monument">Monument</SelectItem>
                        <SelectItem value="temple">Temple</SelectItem>
                        <SelectItem value="cultural_site">Cultural Site</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The category of your contribution
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Date Field - Only show for festivals */}
            {form.watch('type') === 'festival' && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Festival Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMMM d, yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When this festival is celebrated (approximate date for this year)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Region Field */}
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedRegion(value);
                        form.setValue('state', ''); // Reset state when region changes
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nationwide">All India (Nationwide)</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The geographical region in India
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* State Field */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedRegion}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedRegion ? "Select state" : "Select a region first"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableStates.map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The specific state where this is located
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Religion Field */}
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion/Cultural Association</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select religious or cultural association" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {religionOptions.map((religion) => (
                        <SelectItem key={religion.id} value={religion.id}>
                          {religion.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Associated religious or cultural tradition (if applicable)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide details about the cultural significance, history, or traditions..." 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the cultural significance, history, and traditions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel>Upload Image</FormLabel>
              <div className="flex items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center gap-2" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Upload size={16} />
                  Choose Image
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {imagePreview && (
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Image selected
                  </span>
                )}
              </div>
              {imagePreview && (
                <div className="mt-2 w-full max-w-xs h-40 relative rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload a representative image. Max size: 5MB
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Name Field */}
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Contact Email Field */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Contribution"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContributeForm;

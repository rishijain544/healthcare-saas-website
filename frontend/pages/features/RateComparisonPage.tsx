import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, MapPin, Star, DollarSign, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

const RateComparisonPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('');

  const popularTreatments = [
    'General Checkup',
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'Physical Therapy',
    'Dental Cleaning',
    'Eye Exam',
    'Vaccination'
  ];

  const handleSearch = async (treatment) => {
    if (!treatment) return;
    
    setIsLoading(true);
    try {
      const response = await apiClient.compareTreatmentPrices(treatment);
      setComparisonData(response.comparison);
    } catch (error) {
      console.error('Failed to fetch comparison data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTreatmentSelect = (treatment) => {
    setSelectedTreatment(treatment);
    setSearchTerm(treatment);
    handleSearch(treatment);
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Price Comparison',
      description: 'Compare treatment costs across multiple healthcare providers in your area instantly.',
    },
    {
      icon: MapPin,
      title: 'Location-based Results',
      description: 'Find the best prices near you with our GPS-enabled search functionality.',
    },
    {
      icon: Star,
      title: 'Quality Ratings',
      description: 'See patient reviews and quality ratings alongside pricing information.',
    },
    {
      icon: DollarSign,
      title: 'Insurance Coverage',
      description: 'Check which providers accept your insurance and estimate out-of-pocket costs.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Price Comparison
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Compare Healthcare
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Treatment Prices
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Make informed healthcare decisions by comparing treatment costs, quality ratings, and insurance coverage across providers in your area.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-20 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Search for a treatment (e.g., General Checkup, MRI, Blood Test)"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSearch(searchTerm)}
                  disabled={isLoading || !searchTerm}
                  className="mr-2"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Treatments */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Popular Treatments
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTreatments.map((treatment) => (
                <button
                  key={treatment}
                  onClick={() => handleTreatmentSelect(treatment)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
                >
                  {treatment}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Results */}
      {comparisonData && (
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Price Comparison for "{comparisonData.treatment_name}"
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Found {comparisonData.hospitals.length} providers offering this treatment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonData.hospitals.map((item, index) => (
                <div
                  key={item.hospital.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    index === 0 
                      ? 'border-green-500 dark:border-green-400' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {index === 0 && (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Best Price
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {item.hospital.name}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.hospital.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          ({item.hospital.rating})
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${item.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{item.hospital.address}</span>
                  </div>

                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {item.description}
                    </p>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Use Our Price Comparison Tool?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Make informed healthcare decisions with comprehensive pricing and quality information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Save Money on Healthcare
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Compare Prices
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      See treatment costs from multiple providers in your area to find the best value.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Check Quality
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Review patient ratings and quality scores to ensure you get the best care.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Book Instantly
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Schedule your appointment directly through our platform with your chosen provider.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Average Savings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>General Checkup:</span>
                    <span className="font-bold text-xl">$45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Blood Test:</span>
                    <span className="font-bold text-xl">$25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>MRI Scan:</span>
                    <span className="font-bold text-xl">$200</span>
                  </div>
                  <div className="border-t border-blue-400 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Annual Savings:</span>
                      <span>$1,200+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Comparing Prices Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who are saving money on healthcare by comparing prices before booking appointments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Comparing
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RateComparisonPage;

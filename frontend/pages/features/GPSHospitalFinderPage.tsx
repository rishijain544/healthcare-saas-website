import React, { useState, useEffect } from 'react';
import { MapPin, Star, Phone, Navigation, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

const GPSHospitalFinderPage = () => {
  const { t } = useLanguage();
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [minRating, setMinRating] = useState(0);

  const specialties = [
    'Cardiology',
    'Emergency',
    'Surgery',
    'Pediatrics',
    'Oncology',
    'Neurology',
    'Orthopedics',
    'Dermatology',
    'Psychiatry'
  ];

  useEffect(() => {
    getCurrentLocation();
    loadHospitals();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use default location (San Francisco) if geolocation fails
          setUserLocation({
            latitude: 37.7749,
            longitude: -122.4194
          });
        }
      );
    }
  };

  const loadHospitals = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.getHospitals();
      setHospitals(response.hospitals);
    } catch (error) {
      console.error('Failed to load hospitals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchHospitals = async () => {
    if (!userLocation) return;
    
    setIsLoading(true);
    try {
      const response = await apiClient.searchHospitals({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        radius: searchRadius,
        specialty: selectedSpecialty,
        rating_min: minRating
      });
      setHospitals(response.hospitals);
    } catch (error) {
      console.error('Failed to search hospitals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in kilometers
    return Math.round(d * 10) / 10;
  };

  const features = [
    {
      icon: MapPin,
      title: 'GPS Location Services',
      description: 'Automatically find hospitals and clinics near your current location with precise GPS tracking.',
    },
    {
      icon: Star,
      title: 'Patient Reviews & Ratings',
      description: 'Read authentic patient reviews and see quality ratings to make informed healthcare decisions.',
    },
    {
      icon: Filter,
      title: 'Advanced Filtering',
      description: 'Filter by specialty, distance, ratings, and insurance acceptance to find the perfect match.',
    },
    {
      icon: Navigation,
      title: 'Turn-by-Turn Directions',
      description: 'Get detailed directions to your chosen healthcare provider with integrated navigation.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              GPS Hospital Finder
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Healthcare
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Near You
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover top-rated hospitals and clinics in your area with our GPS-powered search. Read reviews, compare ratings, and find the best healthcare providers near you.
            </p>
          </motion.div>

          {/* Search Filters */}
          <motion.div 
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Radius
                </label>
                <select
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={25}>25 km</option>
                  <option value={50}>50 km</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    onClick={searchHospitals}
                    disabled={isLoading || !userLocation}
                    className="w-full"
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Location Status */}
          {userLocation && (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-green-600 dark:text-green-400 flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location detected: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
              </p>
            </motion.div>
          )}

          {/* Google Maps Placeholder */}
          <motion.div 
            className="max-w-4xl mx-auto bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                Interactive Google Maps
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Real-time hospital locations and navigation
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospital Results */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {hospitals.length > 0 ? `Found ${hospitals.length} Healthcare Providers` : 'Healthcare Providers'}
            </h2>
            {userLocation && (
              <p className="text-gray-600 dark:text-gray-400">
                Within {searchRadius} km of your location
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Searching for hospitals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(hospital.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          ({hospital.rating})
                        </span>
                      </div>
                    </div>
                    {userLocation && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {calculateDistance(
                            userLocation.latitude,
                            userLocation.longitude,
                            hospital.latitude,
                            hospital.longitude
                          )} km
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{hospital.address}</span>
                  </div>

                  {hospital.phone && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{hospital.phone}</span>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                          +{hospital.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button variant="primary" size="sm" className="w-full">
                        Book Appointment
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {hospitals.length === 0 && !isLoading && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No hospitals found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or increasing the search radius.
              </p>
              <Button variant="outline" onClick={loadHospitals}>
                Show All Hospitals
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Use Our Hospital Finder?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find the best healthcare providers in your area with our advanced GPS-powered search and filtering system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Find Your Perfect Healthcare Provider
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who use our GPS hospital finder to locate the best healthcare providers in their area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Searching
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Download App
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GPSHospitalFinderPage;

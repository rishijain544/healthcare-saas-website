import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, Star, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../lib/api';
import Button from './ui/Button';

interface RateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RateComparisonModal: React.FC<RateComparisonModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const popularTreatments = [
    'General Checkup',
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'Physical Therapy'
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
    setSearchTerm(treatment);
    handleSearch(treatment);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Price Comparison Tool</h2>
                  <p className="text-blue-100">Compare treatment costs across providers</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Search Section */}
              <div className="mb-6">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search for a treatment (e.g., General Checkup, MRI)"
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

                {/* Popular Treatments */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Popular Treatments
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTreatments.map((treatment) => (
                      <button
                        key={treatment}
                        onClick={() => handleTreatmentSelect(treatment)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
                      >
                        {treatment}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              {comparisonData && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Results for "{comparisonData.treatment_name}"
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Found {comparisonData.hospitals.length} providers
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comparisonData.hospitals.map((item, index) => (
                      <motion.div
                        key={item.hospital.id}
                        className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border-2 transition-all duration-300 ${
                          index === 0 
                            ? 'border-green-500 dark:border-green-400' 
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {index === 0 && (
                          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                            Best Price
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {item.hospital.name}
                            </h4>
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(item.hospital.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                ({item.hospital.rating})
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              ${item.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs mb-3">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{item.hospital.address}</span>
                        </div>

                        <Button variant="primary" size="sm" className="w-full">
                          Book Appointment
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {!comparisonData && !isLoading && (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Search for Treatment Prices
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter a treatment name or select from popular options above
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Searching for prices...</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RateComparisonModal;

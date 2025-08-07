import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Settings, Plus, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

interface Booking {
  id: number;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  status: string;
  notes?: string;
}

const UserDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newBooking, setNewBooking] = useState({
    appointment_date: '',
    appointment_time: '',
    service_type: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const response = await apiClient.getUserBookings(user!.id);
      setBookings(response.bookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createBooking({
        user_id: user!.id,
        ...newBooking,
      });
      setShowBookingForm(false);
      setNewBooking({
        appointment_date: '',
        appointment_time: '',
        service_type: '',
        notes: '',
      });
      loadBookings();
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.welcome')}, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('dashboard.user')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Language</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.language === 'hi' ? 'हि' : 'EN'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('dashboard.bookings')}
                  </h2>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowBookingForm(true)}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Booking</span>
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No bookings yet</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBookingForm(true)}
                      className="mt-4"
                    >
                      Create your first booking
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {booking.service_type}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.appointment_date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{booking.appointment_time}</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {booking.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View Medical Records
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">AI Health Assistant</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get instant answers to your health questions with our AI assistant.
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                Chat Now
              </Button>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                New Booking
              </h3>
              <form onSubmit={handleCreateBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Type
                  </label>
                  <select
                    value={newBooking.service_type}
                    onChange={(e) => setNewBooking({ ...newBooking, service_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Blood Test">Blood Test</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI">MRI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newBooking.appointment_date}
                    onChange={(e) => setNewBooking({ ...newBooking, appointment_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newBooking.appointment_time}
                    onChange={(e) => setNewBooking({ ...newBooking, appointment_time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={newBooking.notes}
                    onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={3}
                    placeholder="Any additional notes..."
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="flex-1">
                    Create Booking
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

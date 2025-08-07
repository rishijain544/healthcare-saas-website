import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Phone, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

interface Booking {
  id: number;
  user_id: number;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  status: string;
  notes?: string;
}

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const response = await apiClient.getDoctorBookings(user!.id);
      setBookings(response.bookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      await apiClient.updateBookingStatus(bookingId, status);
      loadBookings();
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const todaysBookings = bookings.filter(
    booking => booking.appointment_date === selectedDate
  );

  const upcomingBookings = bookings.filter(
    booking => new Date(booking.appointment_date) > new Date() && 
    (booking.status === 'pending' || booking.status === 'confirmed')
  );

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
            {t('dashboard.welcome')}, Dr. {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('dashboard.doctor')}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{todaysBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Daily Schedule
                  </h2>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="p-6">
                {todaysBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No appointments for this date</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todaysBookings
                      .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time))
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Patient #{booking.user_id}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {booking.service_type}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {booking.appointment_time}
                              </p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                          
                          {booking.notes && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {booking.notes}
                            </p>
                          )}

                          <div className="flex space-x-2">
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Tools */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  AI Call Patient
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Patient Records
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Availability
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
              <p className="text-green-100 text-sm mb-4">
                Use AI to help with patient calls and appointment scheduling.
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-green-600 hover:bg-gray-100">
                Start AI Call
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {booking.service_type}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {booking.appointment_date} at {booking.appointment_time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

import React, { useState, useEffect } from 'react';
import { Users, Calendar, FileText, Settings, TrendingUp, Phone, Globe, Shield } from 'lucide-react';
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

interface Invoice {
  id: number;
  patient_name: string;
  amount: number;
  status: string;
  date: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [bookingsResponse, invoicesResponse] = await Promise.all([
        apiClient.getAllBookings(),
        apiClient.getInvoices(),
      ]);
      setBookings(bookingsResponse.bookings);
      setInvoices(invoicesResponse.invoices);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalRevenue = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  const triggerAICall = async () => {
    try {
      await apiClient.makeAICall('+1234567890', 'Test AI call from admin', 'en');
      alert('AI call triggered successfully');
    } catch (error) {
      console.error('Failed to trigger AI call:', error);
      alert('Failed to trigger AI call');
    }
  };

  const generateBillingReport = async () => {
    try {
      await apiClient.generateInvoice({
        patient_name: 'Test Patient',
        treatment: 'Admin Test',
        amount: 100,
      });
      alert('Test invoice generated successfully');
      loadData();
    } catch (error) {
      console.error('Failed to generate invoice:', error);
      alert('Failed to generate invoice');
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
            {t('dashboard.admin')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingBookings}</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedBookings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'bookings', 'billing', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                System Controls
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={triggerAICall}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Test AI Call System
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={generateBillingReport}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Test Invoice
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Language Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {booking.service_type} - Patient #{booking.user_id}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {booking.appointment_date} at {booking.appointment_time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                All Bookings
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          Patient #{booking.user_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {booking.service_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {booking.appointment_date} {booking.appointment_time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Billing Overview
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${totalRevenue}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {invoices.filter(i => i.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Invoices</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {invoices.filter(i => i.status === 'paid').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Paid Invoices</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {invoice.patient_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {invoice.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              System Settings
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                  AI Configuration
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" onClick={triggerAICall}>
                    Test AI Call System
                  </Button>
                  <Button variant="outline" size="sm">
                    Configure AI Settings
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                  Billing Configuration
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" onClick={generateBillingReport}>
                    Test Billing System
                  </Button>
                  <Button variant="outline" size="sm">
                    Configure Billing Settings
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                  Language Settings
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" size="sm">
                    Manage Translations
                  </Button>
                  <Button variant="outline" size="sm">
                    Default Language Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

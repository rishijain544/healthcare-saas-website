import React, { useState } from 'react';
import { CreditCard, FileText, TrendingUp, CheckCircle, Download, Eye, Zap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

const BillingAutomationPage = () => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0101' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0102' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1-555-0103' },
  ]);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '' });

  const handleGenerateDemo = async () => {
    setIsGenerating(true);
    
    // Simulate ML processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const response = await apiClient.generateInvoice({
        patient_name: 'John Doe',
        treatment: 'General Checkup',
        medicine: 'Vitamin D supplements',
        doctor_name: 'Dr. Smith',
        amount: 150.00
      });
      setGeneratedInvoice(response.invoice);
    } catch (error) {
      console.error('Failed to generate demo invoice:', error);
      // Fallback demo data
      setGeneratedInvoice({
        id: 'INV-2024-001',
        patient_name: 'John Doe',
        treatment: 'General Checkup',
        amount: 150.00,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.email) {
      setPatients([...patients, { 
        id: patients.length + 1, 
        ...newPatient 
      }]);
      setNewPatient({ name: '', email: '', phone: '' });
      setShowPatientForm(false);
    }
  };

  const features = [
    {
      icon: CreditCard,
      title: 'Automated Invoice Generation',
      description: 'Generate professional invoices automatically based on patient visits and treatments.',
    },
    {
      icon: FileText,
      title: 'Insurance Claim Processing',
      description: 'Streamline insurance claims with automated form filling and submission tracking.',
    },
    {
      icon: TrendingUp,
      title: 'Financial Analytics',
      description: 'Get detailed insights into your revenue streams and payment patterns.',
    },
    {
      icon: CheckCircle,
      title: 'Payment Tracking',
      description: 'Monitor payment status and send automated reminders for overdue accounts.',
    },
  ];

  const benefits = [
    'Reduce billing errors by 95%',
    'Save 10+ hours per week on administrative tasks',
    'Improve cash flow with faster payment processing',
    'Ensure HIPAA compliance with secure data handling',
    'Generate detailed financial reports instantly',
    'Integrate seamlessly with existing practice management systems',
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
                <CreditCard className="w-4 h-4 mr-2" />
                Billing Automation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Automate Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Billing Process
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Eliminate manual billing tasks and reduce errors with our AI-powered billing automation system. 
                Generate invoices, process insurance claims, and track payments automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="primary" size="lg" onClick={handleGenerateDemo} disabled={isGenerating}>
                    <Zap className="w-5 h-5 mr-2" />
                    {isGenerating ? 'Generating...' : 'Try Demo'}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Invoice #INV-2024-001</h3>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    Paid
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Patient:</span>
                    <span className="text-gray-900 dark:text-white font-medium">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Service:</span>
                    <span className="text-gray-900 dark:text-white font-medium">General Checkup</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="text-gray-900 dark:text-white font-medium">Dec 15, 2024</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-blue-600 dark:text-blue-400">$150.00</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patient Management Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Patient Management
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Manage your patients and generate bills with ease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patient List */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Patients</h3>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setShowPatientForm(true)}
                >
                  Add Patient
                </Button>
              </div>
              
              <div className="space-y-4">
                {patients.map((patient) => (
                  <motion.div 
                    key={patient.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{patient.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{patient.phone}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate Bill
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add Patient Form */}
              {showPatientForm && (
                <motion.div 
                  className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Add New Patient</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Patient Name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <div className="flex space-x-2">
                      <Button variant="primary" size="sm" onClick={handleAddPatient}>
                        Add Patient
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowPatientForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ML Smart Billing */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Billing AI</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">Machine Learning Powered</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Intelligent Code Detection</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AI automatically suggests billing codes based on treatment descriptions
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fraud Prevention</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ML models detect unusual billing patterns and prevent errors
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Predictive Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Forecast payment delays and optimize cash flow management
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">ML Accuracy Rate</p>
                    <p className="text-2xl font-bold">98.7%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Processing Speed</p>
                    <p className="text-2xl font-bold">2.3s</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              Comprehensive Billing Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to streamline your billing process and improve cash flow.
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

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Why Choose Our Billing Automation?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">ROI Calculator</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Time saved per week:</span>
                    <span className="font-bold">10+ hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error reduction:</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Faster payments:</span>
                    <span className="font-bold">40%</span>
                  </div>
                  <div className="border-t border-blue-400 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Annual savings:</span>
                      <span>$25,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Results */}
      {generatedInvoice && (
        <motion.section 
          className="py-24 bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Demo Invoice Generated!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Here's what an automatically generated invoice looks like:
              </p>
            </div>
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Invoice #{generatedInvoice.id}
                </h3>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                  {generatedInvoice.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Patient Information</h4>
                  <p className="text-gray-600 dark:text-gray-300">{generatedInvoice.patient_name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Amount</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${generatedInvoice.amount}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <Button variant="primary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  Send to Patient
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

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
              Ready to Automate Your Billing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of healthcare providers who have streamlined their billing process with our automation tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BillingAutomationPage;

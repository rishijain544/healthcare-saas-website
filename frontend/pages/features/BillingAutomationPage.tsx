import React, { useState } from 'react';
import { CreditCard, FileText, TrendingUp, CheckCircle, Download, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../lib/api';
import Button from '../../components/ui/Button';

const BillingAutomationPage = () => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);

  const handleGenerateDemo = async () => {
    setIsGenerating(true);
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
    } finally {
      setIsGenerating(false);
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
            <div>
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
                <Button variant="primary" size="lg" onClick={handleGenerateDemo} disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Try Demo'}
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="relative">
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Billing Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to streamline your billing process and improve cash flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
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
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Why Choose Our Billing Automation?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
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
            </div>
          </div>
        </div>
      </section>

      {/* Demo Results */}
      {generatedInvoice && (
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Demo Invoice Generated!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Here's what an automatically generated invoice looks like:
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
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
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Billing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who have streamlined their billing process with our automation tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BillingAutomationPage;

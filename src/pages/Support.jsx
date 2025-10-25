import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle,
  HelpCircle,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  Shield,
  CreditCard,
  Settings,
  Search,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support ticket submitted:', { ...formData, category: selectedCategory });
    // Reset form
    setFormData({
      subject: '',
      message: '',
      priority: 'medium'
    });
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
  };

  const supportCategories = [
    { id: 'general', name: 'General Support', icon: HelpCircle, description: 'General questions and assistance' },
    { id: 'technical', name: 'Technical Issues', icon: AlertTriangle, description: 'Technical problems and bugs' },
    { id: 'billing', name: 'Billing & Account', icon: CreditCard, description: 'Billing questions and account issues' },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield, description: 'Privacy settings and security concerns' }
  ];

  const quickActions = [
    {
      title: 'Check Service Status',
      description: 'View current system status and outages',
      icon: CheckCircle,
      action: () => window.open('#', '_blank')
    },
    {
      title: 'Download User Guide',
      description: 'Complete guide to using Debt Detector',
      icon: FileText,
      action: () => window.open('#', '_blank')
    },
    {
      title: 'Account Settings',
      description: 'Manage your account and preferences',
      icon: Settings,
      action: () => window.location.href = '/settings'
    }
  ];

  const faqItems = [
    {
      question: 'How do I set up call forwarding?',
      answer: 'Go to Settings > Protected Services and configure your voicemail message. All calls will be automatically handled by our system.'
    },
    {
      question: 'How does mail scanning work?',
      answer: 'We digitize your physical mail and make it available in your dashboard. You can view, download, and manage all your mail digitally.'
    },
    {
      question: 'Can I change my subscription plan?',
      answer: 'Yes, you can upgrade or downgrade your plan anytime in Settings > Billing & Subscription.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and follow strict privacy protocols to protect your information.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach us through this support form, email, or phone. We typically respond within 24 hours.'
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get support for your Debt Detector services. We're here to help with any questions or issues you may have.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="card hover:shadow-lg transition-all duration-300 group text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Support Form */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Support</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submit a support ticket and we'll get back to you</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supportCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedCategory === category.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-5 w-5 mt-0.5 ${
                            selectedCategory === category.id
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-gray-400'
                          }`} />
                          <div>
                            <div className={`font-medium ${
                              selectedCategory === category.id
                                ? 'text-primary-900 dark:text-primary-100'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {category.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Standard support</option>
                  <option value="high">High - Urgent issue</option>
                  <option value="critical">Critical - Service disruption</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Please provide detailed information about your issue..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Other Ways to Reach Us</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900">
                    <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Phone Support</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">1-800-DebtDetector (24/7)</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email Support</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">support@Debt Detector.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Response Time</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              
              {/* Search FAQ */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-4">
                {filteredFAQ.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
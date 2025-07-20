import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';

export default function PrivacyPolicy() {
  const privacySections = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      content: `At Setlist Street, we believe your privacy is fundamental. We collect only the information necessary to provide gameplay features, personalize your experience, and process optional payments. We never sell your data or use it for advertising tracking.`
    },
    {
      id: 'data-collection',
      title: 'What We Collect',
      items: [
        'Email address and username for account creation and login',
        'Game predictions, scores, and gameplay statistics',
        'Payment information (processed securely by Stripe)',
        'Basic usage analytics to improve our platform',
        'Communications when you contact our support team'
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      items: [
        'Provide core gameplay features and maintain your account',
        'Calculate scores, rankings, and distribute prizes',
        'Send important game notifications and updates',
        'Improve our platform through anonymous usage analytics',
        'Provide customer support and respond to inquiries'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      content: `We do not share your personal data with third parties except for: (1) Payment processing through Stripe for paid games, (2) Essential service providers under strict confidentiality agreements, (3) Legal compliance when required by law. We never sell your data or share it for advertising purposes.`
    },
    {
      id: 'security',
      title: 'Data Security',
      content: `Your data is stored securely using industry-standard encryption and security practices. We use Supabase for secure data storage and Stripe for payment processing, both of which maintain SOC 2 compliance and use encrypted transmission protocols.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: `We retain your account information and game data as long as your account is active. Inactive accounts may be deleted after 2 years of no activity. Payment records are retained for tax and legal compliance purposes. You can request account deletion at any time.`
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      content: `We use essential cookies for login sessions and site functionality. We use privacy-friendly analytics that don't track individuals across websites. We don't use advertising cookies or sell data to advertisers. You can disable cookies in your browser settings.`
    },
    {
      id: 'rights',
      title: 'Your Privacy Rights',
      items: [
        'Access your personal data and download a copy',
        'Correct inaccurate or outdated information',
        'Delete your account and associated data',
        'Opt out of non-essential communications',
        'Request information about data processing activities'
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: `Setlist Street is not intended for users under 18. We don't knowingly collect personal information from children. If we discover we've collected data from someone under 18, we'll delete it immediately. Parents who believe we've collected their child's information should contact us.`
    },
    {
      id: 'changes',
      title: 'Policy Changes',
      content: `We may update this privacy policy to reflect changes in our practices or for legal reasons. When we make significant changes, we'll notify users via email and post the updated policy with a new effective date. Continued use constitutes acceptance of changes.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: `For privacy questions, data requests, or concerns about how we handle your information, contact us at privacy@setliststreet.com. We'll respond within 48 hours during business days.`
    }
  ];

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to protecting your privacy and being transparent about how we collect, 
              use, and safeguard your information.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 2025
            </div>
          </div>

          {/* Privacy Content */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {privacySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {section.title}
                  </h2>
                  
                  {section.content && (
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  
                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-purple-600 mr-3 font-bold">•</span>
                          <span className="text-gray-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <p className="text-gray-600 mb-4">
                Your privacy matters to us. This policy explains our commitment to protecting your personal information.
              </p>
              <p className="text-sm text-gray-500">
                For privacy questions or data requests, contact us at privacy@setliststreet.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
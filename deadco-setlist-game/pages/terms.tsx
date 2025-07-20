import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';

export default function TermsOfService() {
  const termsSections = [
    {
      id: 'acceptance',
      title: 'Terms Acceptance',
      content: `By accessing Setlist Street, creating an account, or participating in any games, you agree to be bound by these Terms of Service and our Privacy Policy. If you don't agree with these terms, please don't use our platform.`
    },
    {
      id: 'eligibility',
      title: 'User Eligibility',
      items: [
        'You must be at least 18 years old to create an account',
        'You must provide accurate and complete registration information',
        'You are responsible for maintaining the security of your account',
        'One account per person; multiple accounts are prohibited',
        'You must comply with all applicable local, state, and federal laws'
      ]
    },
    {
      id: 'gameplay',
      title: 'Gameplay Rules',
      items: [
        'You are responsible for any entries you submit and any wagers you place',
        'All predictions must be submitted before the specified deadline',
        'Prizes are awarded based on accuracy and rankings, not luck',
        'Game results are final once officially calculated and posted',
        'Cheating, manipulation, or exploitation of bugs is strictly prohibited'
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Prizes',
      content: `Entry fees for paid games are non-refundable once submitted. Prizes are distributed based on game rules and final standings. Payment processing is handled by Stripe with industry-standard security. We reserve the right to withhold prizes in cases of suspected fraud or rule violations.`
    },
    {
      id: 'conduct',
      title: 'User Conduct',
      items: [
        'Be respectful and kind to other community members',
        'No harassment, trolling, or abusive behavior will be tolerated',
        'Don\'t share false information or attempt to mislead other users',
        'Respect intellectual property rights and don\'t share copyrighted content',
        'Report any bugs, security issues, or inappropriate behavior to our team'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: `Setlist Street provides the platform "as is" without warranties. We're not liable for indirect damages, lost profits, or consequential damages arising from platform use. Our liability is limited to the amount you paid for services in the past 12 months.`
    },
    {
      id: 'modifications',
      title: 'Terms Modifications',
      content: `We may update these terms occasionally. When we do, we'll post the revised terms and update the "last modified" date. Continued use of the platform after changes constitutes acceptance of the new terms.`
    },
    {
      id: 'termination',
      title: 'Account Termination',
      content: `We reserve the right to suspend or terminate accounts that violate these terms. You may also delete your account at any time through your account settings. Upon termination, your access to paid features ends, but some data may be retained for legal compliance.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: `If you have questions about these Terms of Service, please contact us at legal@setliststreet.com. We'll respond to inquiries within 48 hours during business days.`
    }
  ];

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using Setlist Street. 
              By using our platform, you agree to be bound by these terms.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 2025
            </div>
          </div>

          {/* Terms Content */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {termsSections.map((section, index) => (
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
                These terms are effective as of the date above and apply to all users of Setlist Street.
              </p>
              <p className="text-sm text-gray-500">
                For questions about these terms, contact us at legal@setliststreet.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
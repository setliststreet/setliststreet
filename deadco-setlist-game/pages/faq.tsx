import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  faqs: FAQ[];
}

const FAQPage = () => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());

  const faqSections: FAQSection[] = [
    {
      title: 'Getting Started',
      faqs: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" in the top navigation. You\'ll need a valid email address and must be 18+ to participate in paid games. Account creation is free and gives you access to all prediction games.'
        },
        {
          q: 'Do I need to pay to play?',
          a: 'Not at all! You can play all games for free in "Play for Fun" mode. Paid options (charity donations, cash prizes, sponsored prizes) are completely optional ways to enhance your experience.'
        },
        {
          q: 'How do deadlines work?',
          a: 'All predictions must be submitted by 7:00 PM PT before each show. This gives us time to process entries and ensures fair play. Late submissions are not accepted.'
        },
        {
          q: 'Can I change my predictions after submitting?',
          a: 'No, all predictions are final once submitted. This ensures fairness and maintains the integrity of the competition. Please review your choices carefully before submitting.'
        },
        {
          q: 'How do I know if my submission went through?',
          a: 'You\'ll receive an immediate confirmation on screen and via email. You can also check your submission status in your account dashboard.'
        },
        {
          q: 'Can I play anonymously?',
          a: 'Yes! You can create an account with a username that doesn\'t reveal your identity. Your real name is only required for prize distribution if you win cash or physical prizes.'
        },
        {
          q: 'Will you create versions for other bands?',
          a: 'We\'re currently focused on Dead & Company for the GD60 anniversary concerts. Future expansion to other bands will depend on community demand and successful completion of this launch.'
        },
        {
          q: 'How can I submit game ideas?',
          a: 'We love community input! Send your game ideas to suggestions@setliststreet.com. Include a brief description of how the game would work and what makes it fun or challenging.'
        },
        {
          q: 'What is the time frame for submissions?',
          a: 'Submissions close at 7:00 PM PT the day before each show. For the August 1-3 shows, you have until 7:00 PM PT on July 31, August 1, and August 2 respectively for each show\'s games.'
        }
      ]
    },
    {
      title: 'Games & Scoring',
      faqs: [
        {
          q: 'How is scoring calculated?',
          a: 'Each game has its own scoring system: exact matches get full points, close predictions get partial points, and some games award bonus points for rare correct guesses. Detailed scoring rules are available on each game page.'
        },
        {
          q: 'What if there\'s a technical issue during the show?',
          a: 'We have backup systems and manual verification processes. In rare cases of technical difficulties, we may extend deadlines or provide make-good credits to affected players.'
        },
        {
          q: 'How are winners determined?',
          a: 'Winners are determined by points scored, with tiebreakers varying by game type. Some games award multiple prize tiers (1st, 2nd, 3rd place) while others use random selection from top scorers.'
        },
        {
          q: 'Can I see live results during shows?',
          a: 'Yes! Our live results page updates in real-time as songs are played, showing current standings and how your predictions are performing.'
        },
        {
          q: 'What are the most common Dead & Company setlist patterns?',
          a: 'Dead & Company typically plays 7-9 songs in Set 1, followed by Drums/Space in Set 2, then 4-6 more songs, and usually 1-2 encore songs. Popular openers include "Feel Like a Stranger" and "Help on the Way." Check our Setlist Hints page for detailed statistics.'
        }
      ]
    },
    {
      title: 'Prizes & Payments',
      faqs: [
        {
          q: 'How do cash prizes work?',
          a: 'Cash prize pools are created from paid entries ($1, $5, $10+ options). Winners are paid via PayPal, Venmo, or check. Prize distribution typically happens within 48 hours of show completion.'
        },
        {
          q: 'What charity options are available?',
          a: 'You can donate to pre-selected charities or suggest others. We support music education, environmental causes, and social justice organizations that align with Grateful Dead community values.'
        },
        {
          q: 'How do sponsored prizes work?',
          a: 'Sponsors provide prizes like concert tickets, merchandise, or experiences. These are awarded through random drawings from qualified participants or achievement-based criteria.'
        },
        {
          q: 'Are there any fees?',
          a: 'Playing for fun is completely free. Paid modes have small processing fees (typically $0.30 + 2.9%) handled by Stripe. Prize distributions may have minimal transfer fees depending on payout method.'
        },
        {
          q: 'How do you handle taxes on winnings?',
          a: 'Winners are responsible for tax implications of prizes. We provide documentation for prizes over $600 as required by law. Consult a tax professional for specific advice.'
        },
        {
          q: 'How can I become a sponsor?',
          a: 'We welcome sponsors who want to support the Grateful Dead community! Contact sponsor@setliststreet.com for partnership opportunities. We offer various sponsorship tiers and custom packages.'
        }
      ]
    },
    {
      title: 'Technical Questions',
      faqs: [
        {
          q: 'What browsers do you support?',
          a: 'Setlist Street works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
        },
        {
          q: 'Is there a mobile app?',
          a: 'Currently, Setlist Street is a web application optimized for mobile browsers. A native mobile app may be developed based on user demand and platform success.'
        },
        {
          q: 'How do you get setlist information?',
          a: 'We work with official sources and community contributors to get accurate, real-time setlist data. Our team verifies all information before updating game results.'
        },
        {
          q: 'What if I find a bug?',
          a: 'Please report bugs to support@setliststreet.com with details about what happened, what browser you\'re using, and steps to reproduce the issue. We respond to bug reports within 24 hours.'
        },
        {
          q: 'Do you have an API?',
          a: 'Not currently, but we\'re considering a public API for developers interested in building Dead & Company tools. Join our mailing list for updates on technical features.'
        },
        {
          q: 'How do you protect user data?',
          a: 'We use industry-standard encryption, secure servers, and minimal data collection. Payment processing is handled by Stripe with bank-level security. See our Privacy Policy for complete details.'
        }
      ]
    }
  ];

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const toggleFAQ = (id: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFAQs(newExpanded);
  };

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Setlist Street and the GD60 prediction games
            </p>
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            {faqSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full text-left bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-between">
                    {section.title}
                    <span className="text-purple-600">
                      {expandedSections.has(sectionIndex) ? '−' : '+'}
                    </span>
                  </h2>
                </button>

                {expandedSections.has(sectionIndex) && (
                  <div className="mt-4 space-y-4">
                    {section.faqs.map((faq, faqIndex) => {
                      const faqId = `${sectionIndex}-${faqIndex}`;
                      return (
                        <div key={faqId} className="bg-white border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleFAQ(faqId)}
                            className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                              {faq.q}
                              <span className="text-purple-600 ml-4">
                                {expandedFAQs.has(faqId) ? '−' : '+'}
                              </span>
                            </h3>
                          </button>

                          {expandedFAQs.has(faqId) && (
                            <div className="px-6 pb-6">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? We're here to help!
            </p>
            <p className="text-gray-600">
              Email us at <a href="mailto:support@setliststreet.com" className="text-purple-600 hover:text-purple-800 font-semibold">support@setliststreet.com</a>
            </p>
            <p className="text-gray-600 mt-4">
              Good luck and may the odds be ever in your favor!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage; 
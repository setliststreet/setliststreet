import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const charityOptions = [
  'Rex Foundation',
  'HeadCount',
  'Plastic Pollution Coalition',
  'REVERB',
  'Food Bank Coalition',
  'Music Education Foundation',
  'Environmental Defense Fund',
  'American Red Cross',
  'Doctors Without Borders',
  'Local Food Banks',
  'Cancer Research Foundation',
  'Veterans Support Network'
];

const randomDisplayNames = [
  'DeadHead42',
  'GratefulFan88',
  'TerrapinTunes',
  'TouchOfGrey',
  'SugarMagnolia',
  'UncleJohns',
  'FireMountain',
  'ScarletBegonias',
  'StellaBlueFan',
  'TruckinAlong',
  'EyesOfWorld',
  'FranklinsTower',
  'CaseyJones',
  'RippleFan',
  'MorningDewDrop'
];

export default function SignUp() {
  const [formData, setFormData] = useState({
    displayName: '',
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: '',
    preferredCharity: '',
    customCharity: '',
    termsAccepted: false,
    contactConsent: false
  });

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showCharityInput, setShowCharityInput] = useState(false);

  const generateRandomDisplayName = () => {
    const randomName = randomDisplayNames[Math.floor(Math.random() * randomDisplayNames.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    setFormData({
      ...formData,
      displayName: `${randomName}${randomNumber}`
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleCharityChange = (value: string) => {
    if (value === 'custom') {
      setShowCharityInput(true);
      setFormData({
        ...formData,
        preferredCharity: value,
        customCharity: ''
      });
    } else {
      setShowCharityInput(false);
      setFormData({
        ...formData,
        preferredCharity: value,
        customCharity: ''
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.termsAccepted) {
      alert('Please accept the terms of service');
      return;
    }
    
    if (!formData.contactConsent) {
      alert('Please agree to be contacted regarding winnings');
      return;
    }

    if (!formData.displayName || !formData.fullName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Form submitted:', formData);
    alert('Registration successful!');
  };

  return (
    <MainLayout>
      <div>
        <h1>Sign Up / Register</h1>
        <p>Sign up in order to win prizes.</p>
        
        <section>
          <h2>Registration Form</h2>
          
          <form>
            {/* Leaderboard Display Name */}
            <div>
              <label htmlFor="displayName">Leaderboard Display Name (Public):</label>
              <input
                type="text"
                id="displayName"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                placeholder="Enter your display name"
                required
              />
              <button type="button" onClick={generateRandomDisplayName}>
                Generate Random Name
              </button>
              <p>This name will be visible on public leaderboards</p>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full legal name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Payment Method Toggle */}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={showPaymentOptions}
                  onChange={(e) => setShowPaymentOptions(e.target.checked)}
                />
                I plan to play for prizes, cash, or charity (requires payment method)
              </label>
            </div>

            {/* Payment Methods */}
            {showPaymentOptions && (
              <div>
                <h3>Payment Method</h3>
                <p>Required for prize, cash, or charity games</p>
                
                <div>
                  <h4>Credit/Debit Card (Stripe)</h4>
                  <button type="button" onClick={() => handleInputChange('paymentMethod', 'stripe')}>
                    Connect Stripe Payment
                  </button>
                  {formData.paymentMethod === 'stripe' && (
                    <p>✓ Stripe payment method selected</p>
                  )}
                </div>

                <div>
                  <h4>Cryptocurrency</h4>
                  <button type="button" onClick={() => handleInputChange('paymentMethod', 'crypto')}>
                    Connect Crypto Wallet
                  </button>
                  {formData.paymentMethod === 'crypto' && (
                    <p>✓ Crypto payment method selected</p>
                  )}
                </div>

                <div>
                  <h4>Available Crypto Options:</h4>
                  <ul>
                    <li>Bitcoin (BTC)</li>
                    <li>Ethereum (ETH)</li>
                    <li>USD Coin (USDC)</li>
                    <li>Tether (USDT)</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Preferred Charity */}
            <div>
              <label htmlFor="charity">Preferred Charity (Optional):</label>
              <select
                id="charity"
                value={formData.preferredCharity}
                onChange={(e) => handleCharityChange(e.target.value)}
              >
                <option value="">Select a charity...</option>
                {charityOptions.map((charity) => (
                  <option key={charity} value={charity}>{charity}</option>
                ))}
                <option value="custom">Other (type your own)</option>
              </select>
              
              {showCharityInput && (
                <div>
                  <input
                    type="text"
                    value={formData.customCharity}
                    onChange={(e) => handleInputChange('customCharity', e.target.value)}
                    placeholder="Enter charity name"
                  />
                </div>
              )}
              
              <p>For charity games, winnings will be donated to your selected charity</p>
            </div>

            {/* Terms of Service Checkbox */}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  required
                />
                I have read and agree to the Terms of Service
              </label>
              <a href="/terms-of-service" target="_blank">Read Terms of Service</a>
            </div>

            {/* Contact Consent Checkbox */}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.contactConsent}
                  onChange={(e) => handleInputChange('contactConsent', e.target.checked)}
                  required
                />
                I agree to be contacted regarding winnings and important account updates
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={!formData.termsAccepted || !formData.contactConsent}
              >
                Complete Registration
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2>Registration Benefits</h2>
          <div>
            <h3>What you get:</h3>
            <ul>
              <li>Access to all game modes</li>
              <li>Leaderboard tracking</li>
              <li>Prize eligibility</li>
              <li>Charity donation options</li>
              <li>Cash game participation</li>
              <li>Achievement badges</li>
              <li>Game statistics</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Privacy & Security</h2>
          <div>
            <h3>We protect your information:</h3>
            <ul>
              <li>Secure payment processing via Stripe</li>
              <li>Encrypted data storage</li>
              <li>No sharing of personal information</li>
              <li>GDPR compliant</li>
              <li>Opt-out options available</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Form Preview</h2>
          <div>
            <h3>Current Registration Data:</h3>
            <p>Display Name: {formData.displayName || 'Not set'}</p>
            <p>Full Name: {formData.fullName || 'Not set'}</p>
            <p>Email: {formData.email || 'Not set'}</p>
            <p>Phone: {formData.phone || 'Not set'}</p>
            <p>Payment Method: {formData.paymentMethod || 'None selected'}</p>
            <p>Charity: {formData.preferredCharity === 'custom' ? formData.customCharity : formData.preferredCharity || 'None selected'}</p>
            <p>Terms Accepted: {formData.termsAccepted ? 'Yes' : 'No'}</p>
            <p>Contact Consent: {formData.contactConsent ? 'Yes' : 'No'}</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
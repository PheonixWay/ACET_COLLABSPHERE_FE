import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
      <div className="space-y-4 text-gray-600">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>
          Welcome to CollabSphere. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
        </p>
        <h3 className="text-xl font-semibold mt-6">1. Information We Collect</h3>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform or otherwise when you contact us.
        </p>
        <h3 className="text-xl font-semibold mt-6">2. How We Use Your Information</h3>
        <p>
          We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>
        <h3 className="text-xl font-semibold mt-6">3. Will Your Information Be Shared?</h3>
        <p>
          We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
        </p>
      </div>
    </div>
  );
}

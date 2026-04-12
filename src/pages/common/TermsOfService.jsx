import React from 'react';

export default function TermsOfService() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
      <div className="space-y-4 text-gray-600">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the CollabSphere website (the "Service") operated by us.
        </p>
        <h3 className="text-xl font-semibold mt-6">1. Agreement to Terms</h3>
        <p>
          By using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>
        <h3 className="text-xl font-semibold mt-6">2. Accounts</h3>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <h3 className="text-xl font-semibold mt-6">3. Content</h3>
        <p>
          Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
        </p>
      </div>
    </div>
  );
}

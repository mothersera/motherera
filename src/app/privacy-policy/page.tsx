import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">Privacy Policy</h1>
        <p className="text-stone-500 mb-8">Last updated: 10.01.25</p>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-700">
          <section>
            <p>
              Mother Era (“we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, dashboard, and services.
            </p>
            <p className="font-medium">
              By using Mother Era, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information only when it is necessary to provide and improve our services.</p>
            
            <h3 className="text-lg font-semibold text-stone-800 mb-2">a. Information You Provide</h3>
            <p className="mb-2">When you create an account or use our services, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Age or stage-related information (e.g., pregnancy stage, child age range)</li>
              <li>Basic profile details</li>
              <li>Information you voluntarily share in the community or dashboard</li>
            </ul>

            <h3 className="text-lg font-semibold text-stone-800 mb-2">b. Health & Wellness Information</h3>
            <p className="mb-2">To provide personalized care guidance, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Pregnancy-related inputs</li>
              <li>Nutrition preferences</li>
              <li>Child care selections</li>
              <li>Non-diagnostic wellness information</li>
            </ul>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
              <p className="text-amber-800 font-medium">⚠️ We do NOT collect medical records or provide medical diagnoses.</p>
            </div>

            <h3 className="text-lg font-semibold text-stone-800 mb-2">c. Automatically Collected Information</h3>
            <p className="mb-2">We may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Device type and browser</li>
              <li>Pages visited</li>
              <li>Basic usage analytics</li>
              <li>IP address (for security and analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Provide personalized content and recommendations</li>
              <li>Improve user experience and platform performance</li>
              <li>Enable dashboard features and progress tracking</li>
              <li>Manage subscriptions and pricing access</li>
              <li>Communicate important updates</li>
              <li>Maintain platform safety and security</li>
            </ul>
            <p className="font-bold text-stone-900">We do not sell your personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">3. Community & Public Content</h2>
            <p className="mb-2">If you post or comment in the Mother Era community:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your content may be visible to other users</li>
              <li>Please avoid sharing sensitive personal or medical information publicly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">4. Cookies & Analytics</h2>
            <p className="mb-2">Mother Era may use cookies or similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Remember your preferences</li>
              <li>Improve site performance</li>
              <li>Understand feature usage</li>
            </ul>
            <p>You can control cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">5. Data Sharing</h2>
            <p className="mb-2">We only share data:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>With trusted service providers (e.g., hosting, analytics, payments)</li>
              <li>When required by law</li>
              <li>To protect Mother Era and its users</li>
            </ul>
            <p>All partners are required to keep your data secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">6. Payments & Pricing</h2>
            <p className="mb-2">Payments are processed through secure third-party providers.</p>
            <p className="font-medium">Mother Era does not store your payment card details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">7. Data Security</h2>
            <p className="mb-2">We take reasonable technical and organizational measures to protect your data, including:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Secure servers</li>
              <li>Restricted access</li>
              <li>Encrypted connections where applicable</li>
            </ul>
            <p>However, no system is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">8. Children’s Privacy</h2>
            <p className="mb-2">Mother Era is designed for parents and caregivers.</p>
            <p>We do not knowingly collect personal data directly from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">9. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Access your personal information</li>
              <li>Update or correct your data</li>
              <li>Request account deletion</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p>You can do this through your account or by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">10. Medical Disclaimer</h2>
            <p className="mb-2 font-medium">Mother Era provides educational and wellness guidance only.</p>
            <p className="mb-2 font-medium">Our content is not a substitute for professional medical advice, diagnosis, or treatment.</p>
            <p>Always consult a qualified healthcare professional for medical concerns.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">11. Changes to This Policy</h2>
            <p className="mb-2">We may update this Privacy Policy from time to time.</p>
            <p>Any changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">12. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy or your data, contact us at:</p>
            <a href="mailto:support@motherera.com" className="text-rose-600 hover:text-rose-700 font-medium">📧 support@motherera.com</a>
          </section>
        </div>
      </div>
    </div>
  );
}

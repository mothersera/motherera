import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">Terms of Service</h1>
        <p className="text-stone-500 mb-8">Last updated: 10.01.25</p>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-700">
          <section>
            <p>
              Welcome to Mother Era. These Terms of Service (“Terms”) govern your use of the Mother Era website, dashboard, community, and related services (“Services”). By accessing or using Mother Era, you agree to these Terms.
            </p>
            <p className="font-medium">
              If you do not agree, please do not use the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">1. About Mother Era</h2>
            <p className="mb-2">Mother Era is a wellness and guidance platform designed to support:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Pregnancy care</li>
              <li>Postpartum care</li>
              <li>Newborn and child care</li>
              <li>Nutrition and family wellness</li>
              <li>Community-based support and education</li>
            </ul>
            <p>Mother Era provides educational and wellness guidance only and does not replace professional medical care.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">2. Eligibility</h2>
            <p className="mb-2">To use Mother Era:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least 18 years old</li>
              <li>You must be a parent, caregiver, or individual seeking wellness guidance</li>
              <li>You agree to provide accurate and truthful information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">3. Medical Disclaimer</h2>
            <p className="mb-2">Mother Era does not provide medical advice, diagnosis, or treatment.</p>
            <p className="mb-2">All content is for educational and informational purposes only. Always consult a qualified healthcare professional for medical concerns involving pregnancy, mental health, children, or nutrition.</p>
            <p className="font-medium">Using Mother Era does not create a doctor–patient relationship.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">4. User Accounts</h2>
            <p className="mb-2">To access certain features, you may need to create an account. You agree to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Keep your login credentials secure</li>
              <li>Be responsible for activity under your account</li>
              <li>Notify us immediately of unauthorized access</li>
            </ul>
            <p>Mother Era is not responsible for losses caused by unauthorized account use.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">5. Subscriptions, Pricing & Payments</h2>
            <p className="mb-2">Some features or resources may require a paid plan.</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Prices and plans are shown on the Pricing page</li>
              <li>Payments are handled by secure third-party providers</li>
              <li>Mother Era does not store your payment card information</li>
              <li>Access to paid content may be restricted if payment fails or is canceled</li>
            </ul>
            <p>Refunds, if applicable, follow the policy displayed at the time of purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">6. Community Guidelines</h2>
            <p className="mb-2">Mother Era includes a community feature. By participating, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Be respectful and supportive</li>
              <li>Avoid sharing false, harmful, or medical misinformation</li>
              <li>Not harass, abuse, or threaten others</li>
              <li>Not post spam, promotional content, or offensive material</li>
            </ul>
            <p>Mother Era reserves the right to remove content or suspend accounts that violate these rules.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">7. User Content</h2>
            <p className="mb-2">You retain ownership of content you post, such as comments or messages. By posting content, you grant Mother Era a non-exclusive, royalty-free license to display and use it within the platform.</p>
            <p className="mb-2 font-medium">Do not post:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Personal medical records</li>
              <li>Sensitive private information</li>
              <li>Content you do not have the right to share</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">8. Intellectual Property</h2>
            <p className="mb-2">All Mother Era content, including:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Text</li>
              <li>Design</li>
              <li>Logos</li>
              <li>Graphics</li>
              <li>Features</li>
            </ul>
            <p>is the property of Mother Era and may not be copied, modified, or distributed without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">9. Acceptable Use</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Misuse the platform</li>
              <li>Attempt to hack, disrupt, or reverse engineer the service</li>
              <li>Use the platform for illegal or harmful purposes</li>
              <li>Impersonate others or provide false information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">10. Termination</h2>
            <p className="mb-2">Mother Era may suspend or terminate your access if:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>You violate these Terms</li>
              <li>Your actions harm the platform or users</li>
              <li>Required by law</li>
            </ul>
            <p>You may stop using Mother Era at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">11. Limitation of Liability</h2>
            <p className="mb-2">Mother Era is provided “as is”. We are not responsible for:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Medical outcomes</li>
              <li>Decisions made based on platform content</li>
              <li>Data loss or service interruptions</li>
            </ul>
            <p>To the maximum extent permitted by law, Mother Era is not liable for indirect or consequential damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">12. Privacy</h2>
            <p>Your use of Mother Era is also governed by our Privacy Policy, which explains how we collect and use personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">13. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. Continued use of Mother Era after changes means you accept the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">14. Governing Law</h2>
            <p>These Terms are governed by the laws of India, unless otherwise required by applicable law.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">15. Contact Us</h2>
            <p className="mb-2">If you have questions about these Terms, contact us at:</p>
            <a href="mailto:support@motherera.com" className="text-rose-600 hover:text-rose-700 font-medium">📧 support@motherera.com</a>
          </section>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Breadcrumb/Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>
        
        <h1 className="font-serif text-3xl font-medium text-stone-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-stone max-w-none space-y-8 text-stone-800 leading-relaxed">
          <p className="mb-4">
            This Privacy Policy describes how <strong>Veechelz Nigeria Limited (RC-451171)</strong> collects, uses, and protects your personal information when you visit our website or engage our services.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Business Entity
          </h2>
          <p className="mb-4">
            Veechelz Nigeria Limited (RC-451171)<br/>
            Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja<br/>
            Nigeria
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Data We Collect
          </h2>
          <p className="mb-4">
            We collect the following types of personal information when you submit information through our consultation forms, order requests, or other interactions:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Installation address</li>
            <li>Project scope and specifications</li>
            <li>Project type (new construction, renovation, replacement, etc.)</li>
            <li>Preferred contact method and timing</li>
          </ul>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use your personal information to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Deliver tailored quotes and project proposals</li>
            <li>Schedule on-site measurements and consultations</li>
            <li>Process and fulfill nationwide deliveries</li>
            <li>Provide installation services across Lagos, Abuja, Port Harcourt, and other states</li>
            <li>Communicate directly regarding your orders, appointments, and service updates</li>
            <li>Improve our products and services based on customer feedback</li>
            <li>Send important service notifications and updates</li>
          </ul>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Data Retention & Security
          </h2>
          <p className="mb-4">
            We retain your contact information only for as long as necessary to fulfill the purposes outlined in this policy or as required by applicable laws and regulations.
          </p>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is not sold to third parties for marketing purposes.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Your Rights Under NDPR
          </h2>
          <p className="mb-4">
            As a Nigerian company operating under the Nigeria Data Protection Regulation (NDPR), you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request deletion of your personal data in certain circumstances</li>
            <li>Object to or restrict certain types of processing</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Data portability where technically feasible</li>
          </ul>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, wish to exercise your data protection rights, or have concerns about how we handle your personal information, please contact us at:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Email: <a href="mailto:veechelzngltd@gmail.com" className="text-stone-900 hover:text-stone-600 transition-colors">veechelzngltd@gmail.com</a></li>
            <li>Phone: <a href="tel:0911117575" className="text-stone-900 hover:text-stone-600 transition-colors">0911117575</a></li>
            <li>Address: Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja</li>
          </ul>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Changes to This Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the updated policy on our website.
          </p>
          
          <p className="mt-6 text-sm text-stone-500">
            Effective Date: September 2026
          </p>
        </div>
      </div>
    </div>
  )
}
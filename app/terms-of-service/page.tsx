import Link from 'next/link'

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        
        <div className="prose prose-stone max-w-none space-y-8 text-stone-800 leading-relaxed">
          <p className="mb-4">
            These Terms of Service ("Terms") govern your use of the Veechelz website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please do not use our services.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Business Entity & Jurisdiction
          </h2>
          <p className="mb-4">
            Veechelz Nigeria Limited (RC-451171), a company duly registered under the laws of the Federal Republic of Nigeria, with registered address at Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Scope of Services
          </h2>
          <p className="mb-4">
            We provide luxury residential window treatments, corporate office fit-outs, interior finishing systems, and related consultation services across Nigeria, including Lagos, Abuja, Port Harcourt, and other states.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Custom Orders & Measurements
          </h2>
          <p className="mb-4">
            All products are custom-made based on specifications confirmed during site surveys. Measurements taken during consultation are final, and customers acknowledge that custom-cut blinds and specialized interior systems cannot be returned or exchanged unless due to manufacturing defects or errors in our measurement process.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Warranty Coverage
          </h2>
          <p className="mb-4">
            We provide a 5-Year Warranty on all installed systems covering motorization components, mechanical operating mechanisms, and installation workmanship.
          </p>
          <p className="mb-4">
            The warranty does not cover physical damage from misuse, normal wear and tear, third-party alterations, or failure to follow care instructions.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Nationwide Delivery & Installation
          </h2>
          <p className="mb-4">
            We provide delivery and installation services to Lagos, Abuja, Port Harcourt, and other Nigerian states. Customers are responsible for providing clear access to installation sites, ensuring secure storage, providing adequate power supply for motorized systems, and being present during installation handover.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Pricing & Payment
          </h2>
          <p className="mb-4">
            All prices are quoted in Nigerian Naira (NGN) and are subject to change based on material costs and project complexity. A deposit is required to commence work, with the balance due upon completion and customer acceptance.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Limitation of Liability
          </h2>
          <p className="mb-4">
            To the maximum extent permitted by law, Veechelz Nigeria Limited shall not be liable for indirect, incidental, special, consequential, or punitive damages. Our total liability shall not exceed the total amount paid by you for the specific services giving rise to the claim.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Governing Law & Disputes
          </h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Abuja, Nigeria.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Changes to These Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time. Continued use of our services after modifications constitutes your acceptance of the updated Terms.
          </p>
          
          <h2 className="font-serif text-2xl font-medium text-stone-900 mt-6 mb-4">
            Contact Information
          </h2>
          <p className="mb-4">
            For questions about these Terms of Service, please contact us at:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Email: <a href="mailto:veechelzngltd@gmail.com" className="text-stone-900 hover:text-stone-600 transition-colors">veechelzngltd@gmail.com</a></li>
            <li>Phone: <a href="tel:0911117575" className="text-stone-900 hover:text-stone-600 transition-colors">0911117575</a></li>
          </ul>
          
          <p className="mt-6 text-sm text-stone-500">
            Effective Date: September 2026
          </p>
        </div>
      </div>
    </div>
  )
}
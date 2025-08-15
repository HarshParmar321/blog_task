import React from 'react';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-global-1 mb-6">
            Welcome to SUVIT
          </h1>
          <p className="text-xl text-global-3 mb-8 max-w-2xl mx-auto">
            Your comprehensive business management solution with GST management, 
            invoice automation, and expense tracking capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              className="bg-global-1 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border border-global-1 text-global-1 px-8 py-3 rounded-lg font-semibold hover:bg-global-1 hover:text-white transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Content sections to test scrolling */}
        <div className="mt-24 space-y-16">
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-global-1 mb-4">GST Management</h2>
            <p className="text-global-3">
              Streamline your GST compliance with automated calculations, filing, and reporting.
            </p>
          </section>
          
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-global-1 mb-4">Invoice Automation</h2>
            <p className="text-global-3">
              Create, send, and track invoices automatically with our intelligent system.
            </p>
          </section>
          
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-global-1 mb-4">Expense Tracking</h2>
            <p className="text-global-3">
              Monitor and categorize expenses with real-time insights and analytics.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

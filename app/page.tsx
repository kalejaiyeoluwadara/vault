"use client";

import React from 'react';
import { 
  Share2, 
  FileText, 
  Image, 
  Lock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickFeature } from './components/QuickFeature';



export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Share Anything, 
            <br />
            <span className="text-blue-600">Instantly & Privately</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transfer texts, files, and images without ever needing to exchange contact information. 
            Your data, your control.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="shadow-md">
              <Share2 className="mr-2 h-5 w-5" />
              Start Sharing
            </Button>
          </div>
        </div>

        {/* Quick Features Section */}
        <section className="mt-16">
          <div className="grid md:px-20 md:grid-cols-3 gap-6">
            <QuickFeature 
              icon={<FileText className="h-12 w-12" />}
              title="Secure Text"
              description="Send and store text snippets without revealing your identity."
            />
            <QuickFeature 
              icon={<Image className="h-12 w-12" />}
              title="Image Vault"
              description="Quickly store and share images with complete privacy."
            />
            <QuickFeature 
              icon={<Lock className="h-12 w-12" />}
              title="No Contact Needed"
              description="Share data instantly without exchanging personal information."
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2025 Vault. Simple Sharing, Zero Friction.
          </p>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-6 text-white hover:text-gray-300"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="z-50">
        <SignUp
          path="/sign-up"
          routing="path"
          appearance={{
            elements: {
              card: "shadow-2xl rounded-xl bg-white",
              headerTitle: "text-xl font-semibold text-center text-gray-800",
              headerSubtitle: "text-sm text-center text-gray-700",
              socialButtonsBlockButton:
                "bg-[#196B74] hover:bg-[#155b63] text-white font-medium rounded-md",
              formFieldLabel: "text-sm font-medium text-gray-700",
              formFieldInput:
                "border-gray-300 focus:ring-[#196B74] focus:border-[#196B74]",
              formButtonPrimary:
                "bg-[#196B74] hover:bg-[#155b63] text-white font-semibold rounded-md py-2",
              footerActionText: "text-sm text-gray-700",
              footerActionLink: "text-[#196B74] hover:underline font-medium",
            },
            variables: {
              colorPrimary: "#196B74",
              borderRadius: "0.75rem",
              colorBackground: "#eff0eb",
            },
          }}
        />
      </div>
    </div>
  );
}

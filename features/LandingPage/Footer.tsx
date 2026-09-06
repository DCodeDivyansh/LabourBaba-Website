import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-orange-100 rounded-3xl py-12 px-6 pb-28">
      <div className="max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Logo.svg"
            alt="LabourBaba Logo"
            width={240}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        {/* Copyright */}
        <p className="mt-4 text-gray-800 font-medium">
          © 2026 LabourBaba. Built for Industrial Reliability.
        </p>

        {/* Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          <a
            href="/privacy"
            className="text-gray-900 font-semibold hover:text-orange-500 transition-colors"
          >
            Privacy Policy
          </a>

          <a
            href="/terms"
            className="text-gray-900 font-semibold hover:text-orange-500 transition-colors"
          >
            Terms of Service
          </a>

          <a
            href="/support"
            className="text-gray-900 font-semibold hover:text-orange-500 transition-colors"
          >
            Contact Support
          </a>

          <a
            href="/careers"
            className="text-gray-900 font-semibold hover:text-orange-500 transition-colors"
          >
            Careers
          </a>
        </div>
      </div>
    </footer>
  );
}
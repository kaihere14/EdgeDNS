import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black">
                ED
              </div>
              <span className="font-black text-xl text-gray-900">EdgeDNS</span>
            </div>
            <p className="text-sm text-gray-600">
              DNS at the speed of Redis. Built for modern developers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Developers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Social & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              &copy; {currentYear} EdgeDNS. All rights reserved.
            </div>

            {/* Social links */}
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-300 transition-colors"
                title="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.29 20a11.976 11.976 0 0011.93-11.93A8.5 8.5 0 0020 2.5a8.5 8.5 0 01-2.47.68A4.31 4.31 0 0019.53 1a8.65 8.65 0 01-2.75 1.05 4.3 4.3 0 00-7.5 3.93A12.2 12.2 0 112.41 3.35a4.3 4.3 0 001.33 5.75A4.25 4.25 0 012 8.85v.05a4.31 4.31 0 003.45 4.22 4.3 4.3 0 01-1.94.08 4.31 4.31 0 004.02 2.99A8.63 8.63 0 010 14.5a12.2 12.2 0 008.29 3" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-300 transition-colors"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817a9.6 9.6 0 012.502.337c1.91-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.192 20 14.438 20 10.017 20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-300 transition-colors"
                title="Discord"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.944 4.126a15.5 15.5 0 00-3.903-.603.058.058 0 00-.062.03c-.169.302-.358.695-.49.958a14.387 14.387 0 00-4.27 0C8.087 4.55 7.898 4.148 7.73 3.846a.06.06 0 00-.06-.03 15.45 15.45 0 00-3.906.603.055.055 0 00-.03.024C1.266 8.346.78 12.47 2.035 16.46a.062.062 0 00.039.034 15.43 15.43 0 004.67 2.356.06.06 0 00.066-.021c.364-.495.688-1.018.967-1.568a.059.059 0 00-.032-.083 10.16 10.16 0 01-1.454-.69.06.06 0 00-.063.01c-.097.073-.195.148-.288.225a.059.059 0 00-.015.078c.305.457.633.893.972 1.305a.06.06 0 00.066.01c3.079.97 6.419.97 9.477 0a.06.06 0 00.066-.01c.34-.412.667-.85.971-1.304a.06.06 0 00-.014-.078c-.093-.078-.19-.153-.29-.226a.059.059 0 00-.062-.01 9.945 9.945 0 01-1.455.69.06.06 0 00-.032.083c.28.55.602 1.073.965 1.568a.06.06 0 00.066.021 15.39 15.39 0 004.671-2.357.06.06 0 00.04-.033c1.35-4.135.691-7.716-2.12-10.88a.052.052 0 00-.028-.024zM6.69 13.873c-.94 0-1.714-.863-1.714-1.92 0-1.056.765-1.92 1.714-1.92.95 0 1.73.87 1.714 1.92 0 1.056-.765 1.92-1.714 1.92zm6.622 0c-.942 0-1.715-.863-1.715-1.92 0-1.056.766-1.92 1.715-1.92.95 0 1.73.87 1.714 1.92 0 1.056-.764 1.92-1.714 1.92z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

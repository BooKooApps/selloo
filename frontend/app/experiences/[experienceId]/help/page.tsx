import { getCurrentUser } from '@/lib/auth';
import Sidebar from '../../../components/layout/sidebar';
import { FiHelpCircle, FiMail, FiMessageCircle, FiBook, FiFileText, FiVideo } from 'react-icons/fi';

export default async function HelpPage() {
  const user = await getCurrentUser();

  const helpSections = [
    {
      title: 'Getting Started',
      icon: FiFileText,
      items: [
        { title: 'How to set up your store', description: 'Learn how to configure your store settings' },
        { title: 'Adding your first product', description: 'Step-by-step guide to adding products' },
        { title: 'Setting up categories', description: 'Organize your products with categories' },
      ],
    },
    {
      title: 'Managing Products',
      icon: FiFileText,
      items: [
        { title: 'Creating products', description: 'Guide to creating and managing products' },
        { title: 'Product pricing', description: 'How to set and update product prices' },
        { title: 'Digital delivery', description: 'Setting up automatic digital product delivery' },
      ],
    },
    {
      title: 'Analytics & Reports',
      icon: FiFileText,
      items: [
        { title: 'Understanding your analytics', description: 'Learn how to read your sales data' },
        { title: 'Revenue tracking', description: 'Track your earnings and sales' },
        { title: 'Product performance', description: 'See which products are selling best' },
      ],
    },
    {
      title: 'Account & Settings',
      icon: FiFileText,
      items: [
        { title: 'Store customization', description: 'Customize your store appearance' },
        { title: 'Payment settings', description: 'Configure payment methods' },
        { title: 'Security settings', description: 'Manage your account security' },
      ],
    },
  ];

  const quickLinks = [
    { title: 'Documentation', icon: FiBook, href: '#' },
    { title: 'Video Tutorials', icon: FiVideo, href: '#' },
    { title: 'FAQ', icon: FiHelpCircle, href: '#' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar user={user || { name: 'User', username: 'user' }} />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#fa4616]/20 rounded-xl">
                <FiHelpCircle className="text-[#fa4616]" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Help & Support</h1>
                <p className="text-gray-400 text-lg">Get help with your store and find answers to common questions</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className="flex items-center gap-4 p-6 bg-[#111] border border-white/10 rounded-xl hover:border-[#fa4616]/50 transition-all group"
                >
                  <div className="p-3 bg-[#fa4616]/20 rounded-lg group-hover:bg-[#fa4616]/30 transition-colors">
                    <Icon className="text-[#fa4616]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-400">Browse resources</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Help Sections */}
          <div className="space-y-8">
            {helpSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-[#111] border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="text-[#fa4616]" size={24} />
                    <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className="p-4 bg-[#0a0a0a] border border-white/5 rounded-lg hover:border-[#fa4616]/30 transition-colors cursor-pointer"
                      >
                        <h3 className="text-white font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-r from-[#fa4616]/20 to-[#fa4616]/10 border border-[#fa4616]/30 rounded-xl p-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-[#fa4616]/20 rounded-xl">
                <FiMessageCircle className="text-[#fa4616]" size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white mb-2">Still need help?</h2>
                <p className="text-gray-300 mb-6">
                  Our support team is here to help you. Reach out to us and we'll get back to you as soon as possible.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:support@selloo.com"
                    className="flex items-center gap-2 px-6 py-3 bg-[#fa4616] text-white rounded-lg hover:bg-[#ff5a2e] transition-colors font-medium"
                  >
                    <FiMail size={18} />
                    Email Support
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-white/10 text-white rounded-lg hover:border-[#fa4616]/50 transition-colors font-medium"
                  >
                    <FiMessageCircle size={18} />
                    Live Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

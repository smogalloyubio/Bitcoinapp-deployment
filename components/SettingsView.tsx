
import React, { useState } from 'react';
import { User, Shield, Bell, Moon, Globe, CreditCard, ChevronRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const sections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: <User size={18} className="text-indigo-400" />,
      items: [
        { label: 'Profile Information', detail: 'John Doe • john@example.com' },
        { label: 'Payment Methods', detail: 'Visa ending in 4242' },
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={18} className="text-emerald-400" />,
      items: [
        { label: 'Password', detail: 'Last changed 3 months ago' },
        { label: 'Two-Factor Authentication', isToggle: true, state: twoFactor, setState: setTwoFactor },
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: <Bell size={18} className="text-amber-400" />,
      items: [
        { label: 'Push Notifications', isToggle: true, state: notifications, setState: setNotifications },
        { label: 'Currency Display', detail: 'USD ($)' },
        { label: 'Language', detail: 'English (US)' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
        <p className="text-slate-400 text-sm">Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/50">
              {section.icon}
              <h3 className="font-bold text-slate-200">{section.title}</h3>
            </div>
            <div className="divide-y divide-slate-800">
              {section.items.map((item, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-100">{item.label}</p>
                    {item.detail && <p className="text-xs text-slate-500 mt-1">{item.detail}</p>}
                  </div>
                  {item.isToggle ? (
                    <button 
                      onClick={() => item.setState && item.setState(!item.state)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${item.state ? 'bg-indigo-600' : 'bg-slate-700'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${item.state ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  ) : (
                    <ChevronRight size={18} className="text-slate-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6">
        <h3 className="text-rose-400 font-bold mb-2">Danger Zone</h3>
        <p className="text-slate-500 text-xs mb-4">Deleting your account is permanent. All your portfolio history and tracked assets will be wiped from our secure nodes.</p>
        <button className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-rose-500/10">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsView;

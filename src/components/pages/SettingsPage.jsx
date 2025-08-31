import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Save, Download, Trash2, Key, Shield, Activity } from 'lucide-react';

const SettingsPage = () => {
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [dataRetention, setDataRetention] = useState("90_days");

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Settings</h2>
          <p style={{ color: colors.textSecondary }}>Manage your account and application preferences</p>
        </div>
        <Button variant="primary" icon={Save} onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Theme</label>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Language</label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: colors.text }}>Enable Notifications</label>
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="toggle toggle-primary"
            />
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Data & Privacy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Data Retention Period</label>
            <select 
              value={dataRetention} 
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="30_days">30 Days</option>
              <option value="90_days">90 Days</option>
              <option value="1_year">1 Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <Button variant="secondary" icon={Download}>Export My Data</Button>
          <Button variant="danger" icon={Trash2}>Delete My Account</Button>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Security</h3>
        <div className="space-y-4">
          <Button variant="secondary" icon={Key}>Change Password</Button>
          <Button variant="secondary" icon={Shield}>Two-Factor Authentication</Button>
          <Button variant="secondary" icon={Activity}>View Login Activity</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
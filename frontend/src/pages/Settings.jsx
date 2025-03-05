import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Lock, Bell, Download, Trash2, LogOut } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="w-295 flex-1 p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <p className="mb-6">Manage your preferences and account settings.</p>

      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-4">
        <span>Dark Mode</span>
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? "bg-blue-600" : "bg-gray-600"}
            relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              darkMode ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-4">
        <span>Enable Notifications</span>
        <Switch
          checked={notifications}
          onChange={setNotifications}
          className={`${notifications ? "bg-green-600" : "bg-gray-600"}
            relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              notifications ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      <div className="space-y-3">
        <button className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg w-full text-left hover:bg-gray-700">
          <Lock size={18} />
          Change Password
        </button>
        <button className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg w-full text-left hover:bg-gray-700">
          <Bell size={18} />
          Notification Preferences
        </button>
        <button className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg w-full text-left hover:bg-gray-700">
          <Download size={18} />
          Backup & Restore Data
        </button>
        <button className="flex items-center gap-2 bg-red-600 p-3 rounded-lg w-full text-left hover:bg-red-500">
          <Trash2 size={18} />
          Delete Account
        </button>
        <button className="flex items-center gap-2 bg-gray-700 p-3 rounded-lg w-full text-left hover:bg-gray-600">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;

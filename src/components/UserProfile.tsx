import React from 'react';
import {
  User,
  Crown,
  Zap,
  MessageSquare,
  Clock,
  Settings,
  BarChart3,
  RefreshCw,
  ChevronRight,
  Edit2
} from 'lucide-react';
import './UserProfile.scss';

interface UsageStats {
  totalTokens: number;
  remainingTokens: number;
  totalConversations: number;
  averageResponseTime: string;
}

interface UserData {
  name: string;
  email: string;
  avatarUrl: string;
  subscription: {
    plan: 'Free' | 'Pro' | 'Enterprise';
    renewalDate: string;
    status: 'active' | 'expired';
  };
  usageStats: UsageStats;
}

// Mock data - replace with actual data from your backend
const userData: UserData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  subscription: {
    plan: "Pro",
    renewalDate: "2024-04-15",
    status: "active"
  },
  usageStats: {
    totalTokens: 1000000,
    remainingTokens: 750000,
    totalConversations: 156,
    averageResponseTime: "1.2s"
  }
};

const UserProfile = () => {
  const getUsagePercentage = () => {
    const used = userData.usageStats.totalTokens - userData.usageStats.remainingTokens;
    return (used / userData.usageStats.totalTokens) * 100;
  };

  return (
    <div className="profile">
      <div className="profile__container">
        {/* Header Section */}
        <div className="profile__header">
          <div className="profile__user-info">
            <div className="profile__avatar-container">
              <img src={userData.avatarUrl} alt={userData.name} className="profile__avatar" />
              <button className="profile__avatar-edit">
                <Edit2 size={16} />
              </button>
            </div>
            <div className="profile__user-details">
              <h1>{userData.name}</h1>
              <p>{userData.email}</p>
            </div>
          </div>
          <button className="profile__settings-btn">
            <Settings size={20} />
            Settings
          </button>
        </div>

        {/* Subscription Card */}
        <div className="profile__card profile__subscription">
          <div className="profile__card-header">
            <Crown size={20} />
            <h2>Subscription Plan</h2>
          </div>
          <div className="profile__plan-info">
            <div className="profile__plan-badge">
              {userData.subscription.plan} Plan
            </div>
            <p className="profile__renewal">
              Renews on {new Date(userData.subscription.renewalDate).toLocaleDateString()}
            </p>
            <button className="profile__upgrade-btn">
              Upgrade Plan
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="profile__card profile__usage">
          <div className="profile__card-header">
            <Zap size={20} />
            <h2>Token Usage</h2>
          </div>
          <div className="profile__usage-stats">
            <div className="profile__usage-bar">
              <div 
                className="profile__usage-progress" 
                style={{ width: `${getUsagePercentage()}%` }}
              />
            </div>
            <div className="profile__usage-numbers">
              <span>{userData.usageStats.remainingTokens.toLocaleString()} tokens remaining</span>
              <span>{userData.usageStats.totalTokens.toLocaleString()} total</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile__stats-grid">
          <div className="profile__stat-card">
            <MessageSquare size={20} />
            <div className="profile__stat-info">
              <h3>Total Conversations</h3>
              <p>{userData.usageStats.totalConversations}</p>
            </div>
          </div>
          <div className="profile__stat-card">
            <Clock size={20} />
            <div className="profile__stat-info">
              <h3>Average Response Time</h3>
              <p>{userData.usageStats.averageResponseTime}</p>
            </div>
          </div>
          <div className="profile__stat-card">
            <BarChart3 size={20} />
            <div className="profile__stat-info">
              <h3>Usage Analytics</h3>
              <p>View Details →</p>
            </div>
          </div>
          <div className="profile__stat-card">
            <RefreshCw size={20} />
            <div className="profile__stat-info">
              <h3>Token Reset</h3>
              <p>15 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
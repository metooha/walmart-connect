import React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { TextField } from '@/components/ui/TextField';
import { Select, SelectItem } from '@/components/ui/Select';
import { Tag } from '@/components/ui/Tag';
import { Checkbox } from '@/components/ui/Checkbox';
import { Divider } from '@/components/ui/Divider';
import { MastHead } from '@/components/ui/MastHead';
import { MediaSolution } from '@/components/ui/MediaSolutionsDropdown';
import SettingsSidebar from '@/features/settings/SettingsSidebar';
import { Plus, X, ChevronUp, ChevronDown } from '@/components/icons';
import styles from './Settings.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

interface Application {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  users: User[];
  metrics: {
    activeUsers: number;
    campaigns: number;
    lastActivity: string;
  };
}

const INITIAL_APPS: Application[] = [
  {
    id: 'sponsored-search',
    name: 'Sponsored Search',
    description: 'Search advertising campaigns and keyword management',
    status: 'active',
    users: [
      { id: '1', name: 'Amy Ha', email: 'amy.ha@walmart.com', role: 'admin' },
      { id: '2', name: 'John Smith', email: 'john.smith@walmart.com', role: 'editor' },
    ],
    metrics: {
      activeUsers: 12,
      campaigns: 45,
      lastActivity: '2 hours ago'
    }
  },
  {
    id: 'display-advertising',
    name: 'Display Advertising',
    description: 'Banner and display ad campaign management',
    status: 'active',
    users: [
      { id: '3', name: 'Amy Ha', email: 'amy.ha@walmart.com', role: 'admin' },
      { id: '4', name: 'Jane Doe', email: 'jane.doe@walmart.com', role: 'viewer' },
    ],
    metrics: {
      activeUsers: 8,
      campaigns: 23,
      lastActivity: '5 hours ago'
    }
  },
  {
    id: 'seller-center',
    name: 'Seller Center',
    description: 'Partner portal for marketplace sellers',
    status: 'active',
    users: [
      { id: '5', name: 'Amy Ha', email: 'amy.ha@walmart.com', role: 'admin' },
    ],
    metrics: {
      activeUsers: 156,
      campaigns: 0,
      lastActivity: '1 hour ago'
    }
  },
  {
    id: 'omni-roas',
    name: 'Omni ROAS',
    description: 'Cross-channel return on ad spend analytics',
    status: 'active',
    users: [
      { id: '6', name: 'Amy Ha', email: 'amy.ha@walmart.com', role: 'admin' },
    ],
    metrics: {
      activeUsers: 5,
      campaigns: 12,
      lastActivity: '3 days ago'
    }
  },
];

export default function SettingsPage() {
  const [applications, setApplications] = React.useState<Application[]>(INITIAL_APPS);
  const [selectedApp, setSelectedApp] = React.useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = React.useState(false);
  const [newUserEmail, setNewUserEmail] = React.useState('');
  const [newUserRole, setNewUserRole] = React.useState<'admin' | 'editor' | 'viewer'>('viewer');
  const [selectedMediaSolution, setSelectedMediaSolution] = React.useState<MediaSolution>('Display Advertising');
  const [activeSection, setActiveSection] = React.useState<'applications' | 'global'>('applications');

  const selectedApplication = applications.find(app => app.id === selectedApp);

  const handleAddUser = () => {
    if (!selectedApp || !newUserEmail) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: newUserEmail.split('@')[0].replace('.', ' '),
      email: newUserEmail,
      role: newUserRole
    };

    setApplications(prev => prev.map(app => 
      app.id === selectedApp 
        ? { ...app, users: [...app.users, newUser] }
        : app
    ));

    setNewUserEmail('');
    setNewUserRole('viewer');
    setIsAddingUser(false);
  };

  const handleChangeRole = (appId: string, userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    setApplications(prev => prev.map(app =>
      app.id === appId
        ? {
            ...app,
            users: app.users.map(user =>
              user.id === userId ? { ...user, role: newRole } : user
            )
          }
        : app
    ));
  };

  const handleRemoveUser = (appId: string, userId: string) => {
    setApplications(prev => prev.map(app =>
      app.id === appId
        ? { ...app, users: app.users.filter(user => user.id !== userId) }
        : app
    ));
  };

  const getRoleColor = (role: string): 'brand' | 'positive' | 'warning' => {
    switch (role) {
      case 'admin': return 'brand';
      case 'editor': return 'positive';
      case 'viewer': return 'warning';
      default: return 'warning';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      <div className="flex h-[calc(100vh-54px)]">
        {/* Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1 h-auto self-stretch flex flex-col overflow-auto">
          <div style={{
            padding: 'clamp(24px, 4vw, 48px)',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%'
          }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '12px'
              }}>
                {activeSection === 'applications' ? 'Applications' : 'Global Settings'}
              </h1>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtlest)',
                maxWidth: '800px'
              }}>
                {activeSection === 'applications'
                  ? 'Manage applications, users, and permissions across Walmart Connect Ad Center.'
                  : 'Configure global settings and preferences for your account.'
                }
              </p>
            </div>

      {/* Applications Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {applications.map((app) => (
          <div
            key={app.id}
            className={styles.appCard}
            onClick={() => setSelectedApp(app.id === selectedApp ? null : app.id)}
          >
            {/* App Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  marginBottom: '8px'
                }}>
                  {app.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: 'var(--ld-semantic-color-text-subtle)',
                  marginBottom: '12px'
                }}>
                  {app.description}
                </p>
              </div>
              <Tag variant="secondary" color={app.status === 'active' ? 'positive' : 'warning'}>
                {app.status}
              </Tag>
            </div>

            {/* Quick Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text-brand)',
                  marginBottom: '4px'
                }}>
                  {app.metrics.activeUsers}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--ld-semantic-color-text-subtle)'
                }}>
                  Active Users
                </div>
              </div>
              
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text-brand)',
                  marginBottom: '4px'
                }}>
                  {app.metrics.campaigns}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--ld-semantic-color-text-subtle)'
                }}>
                  Campaigns
                </div>
              </div>
              
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--ld-semantic-color-text)',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {app.metrics.lastActivity}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--ld-semantic-color-text-subtle)'
                }}>
                  Last Activity
                </div>
              </div>
            </div>

            {/* User Management - Expanded State */}
            {selectedApp === app.id && (
              <div style={{ marginTop: '20px' }}>
                <Divider />
                <div style={{ paddingTop: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: 'var(--ld-semantic-color-text)'
                  }}>
                    Users & Permissions
                  </h4>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingUser(!isAddingUser);
                    }}
                  >
                    <Plus style={{ width: 16, height: 16, marginRight: 6 }} />
                    Add User
                  </Button>
                </div>

                {/* Add User Form */}
                {isAddingUser && (
                  <div style={{
                    padding: '16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                    borderRadius: '6px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <TextField
                        label="Email"
                        size="small"
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="user@walmart.com"
                      />
                      <Select
                        label="Role"
                        size="small"
                        value={newUserRole}
                        onValueChange={(value) => setNewUserRole(value as 'admin' | 'editor' | 'viewer')}
                      >
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </Select>
                    </div>
                    <ButtonGroup>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAddingUser(false);
                          setNewUserEmail('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddUser();
                        }}
                        disabled={!newUserEmail}
                      >
                        Add User
                      </Button>
                    </ButtonGroup>
                  </div>
                )}

                {/* Users List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {app.users.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                        borderRadius: '6px'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* User Avatar */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                        color: 'var(--ld-semantic-color-text-brand-bold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>

                      {/* User Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: 'var(--ld-semantic-color-text)',
                          marginBottom: '2px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {user.name}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: 'var(--ld-semantic-color-text-subtle)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {user.email}
                        </div>
                      </div>

                      {/* Role Select */}
                      <div style={{ flexShrink: 0, minWidth: '140px' }}>
                        <Select
                          label=""
                          size="small"
                          value={user.role}
                          onValueChange={(role) => handleChangeRole(app.id, user.id, role as 'admin' | 'editor' | 'viewer')}
                        >
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </Select>
                      </div>

                      {/* Remove Button */}
                      {app.users.length > 1 && (
                        <Button
                          variant="tertiary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveUser(app.id, user.id);
                          }}
                          aria-label="Remove user"
                        >
                          <X style={{ width: 16, height: 16 }} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}

            {/* Expand Indicator */}
            <div style={{ marginTop: '12px' }}>
              <Divider />
              <div style={{
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'center'
              }}>
              {selectedApp === app.id ? (
                <ChevronUp style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtle)' }} />
              ) : (
                <ChevronDown style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtle)' }} />
              )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Settings Section */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Global Settings
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '24px'
        }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '16px'
            }}>
              User Roles
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Tag variant="secondary" color="brand">Admin</Tag>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                  Full access to all features and settings
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Tag variant="secondary" color="positive">Editor</Tag>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                  Can create and edit campaigns
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Tag variant="secondary" color="warning">Viewer</Tag>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                  Read-only access to data and reports
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '16px'
            }}>
              Quick Stats
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtle)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Applications:</span>
                <strong style={{ color: 'var(--ld-semantic-color-text)' }}>
                  {applications.length}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Users:</span>
                <strong style={{ color: 'var(--ld-semantic-color-text)' }}>
                  {applications.reduce((sum, app) => sum + app.users.length, 0)}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Active Apps:</span>
                <strong style={{ color: 'var(--ld-semantic-color-text)' }}>
                  {applications.filter(app => app.status === 'active').length}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
}

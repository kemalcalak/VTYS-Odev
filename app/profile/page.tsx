'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        credentials: 'include', // Important for sending cookies
      });
      
      if (response.status === 401) {
        // Redirect to login page if unauthorized
        router.push('/auth/login');
        return;
      }
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      
      const data = await response.json();
      setUser(data.user);
      setFormData({
        name: data.user.name,
        email: data.user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError('Profil yüklenemedi');
      console.error('Profile fetch error:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending cookies
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      setUser(data.user);
      setIsEditing(false);
      setError('');
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Profil güncellenemedi');
      console.error('Profile update error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button onClick={handleEdit} variant="outline" className="hover:scale-105 transition-transform duration-200">
                Edit Profilenle
              </Button>
              <Button 
                variant="outline" 
                onClick={async () => {
                  try {
                    await fetch('/api/auth/logout', {
                      method: 'POST',
                      credentials: 'include'
                    });
                    router.push('/');
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="hover:scale-105 transition-transform duration-200 text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="hover:scale-105 transition-transform duration-200">
                Değişiklikleri Kaydet
              </Button>
              <Button onClick={handleCancel} variant="outline" className="hover:scale-105 transition-transform duration-200">
                İptal
              </Button>
            </div>
          )}
        </div>
      </div>
      <Card className="max-w-2xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">İsim</Label>
            {isEditing ? (
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            ) : (
              <p className="mt-1">{user.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-posta</Label>
            {isEditing ? (
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
            ) : (
              <p className="mt-1">{user.email}</p>
            )}
          </div>

          {isEditing && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Yeni Şifreyi Onayla</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  İptal
                </Button>
                <Button onClick={handleSave}>Kaydet</Button>
              </>
            ) : (
              <Button onClick={handleEdit}>Profili Düzenle</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
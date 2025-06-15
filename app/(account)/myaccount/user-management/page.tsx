
'use client';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserType } from '@/types';

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<any>({
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    areaOfOperations: []
  });
  const ROLES = ['admin', 'authority', 'school', 'transporter'];
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users by role
  const handleRoleFilter = (role:string) => {
    setSelectedRole(role);
    const filtered = role 
      ? users.filter(user => user.role === role)
      : users;
    setFilteredUsers(filtered);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewUser((prev:any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAreaOfOperationsChange = (e:any) => {
    const areas = e.target.value.split(',').map((area:any) => area.trim());
    setNewUser((prev:any) => ({
      ...prev,
      areaOfOperations: areas
    }));
  };

  const handleCreateUser = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}users`, 
        newUser, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      toast.success('User created successfully');
      getAllUsers(); // Refresh user list
      setIsCreateModalOpen(false);
      // Reset form
      setNewUser({
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
        district: '',
        sector: '',
        cell: '',
        village: '',
        areaOfOperations: []
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user. Please try again.');
    }
  };

  // Load users on component mount
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {/* Role Filter Buttons */}
          <Button 
            variant={selectedRole === '' ? 'default' : 'outline'}
            onClick={() => handleRoleFilter('')}
          >
            All Users
          </Button>
          {ROLES.map(role => (
            <Button 
              key={role}
              variant={selectedRole === role ? 'default' : 'outline'}
              className={`${selectedRole === role ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => handleRoleFilter(role)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          ))}
        </div>

        {/* Create User Button/Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <FaPlus className="mr-2" /> Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <Input
                name="name"
                placeholder="Full Name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
              <Input
                name="phoneNumber"
                placeholder="Phone Number"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
                required
              />
              
              {/* Role Selection */}
              <Select 
              
                name="role"
                value={newUser.role}
                onValueChange={(value) => setNewUser((prev:any )=> ({...prev, role: value}))}
                required
              >
                <SelectTrigger >
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="w-full bg-primary">
                  {ROLES.map(role => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Conditional Fields Based on Role */}
              {newUser.role === 'school' && (
                <>
                  <Input
                    name="district"
                    placeholder="District"
                    value={newUser.district}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="sector"
                    placeholder="Sector"
                    value={newUser.sector}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="cell"
                    placeholder="Cell"
                    value={newUser.cell}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="village"
                    placeholder="Village"
                    value={newUser.village}
                    onChange={handleInputChange}
                  />
                </>
              )}

              {newUser.role === 'transporter' && (
                <Input
                  name="areaOfOperations"
                  placeholder="Areas of Operations (comma-separated)"
                  value={newUser.areaOfOperations.join(', ')}
                  onChange={handleAreaOfOperationsChange}
                />
              )}

              <Button type="submit" className="w-full">
                Create User
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* User List */}
      {isLoading ? (
        <div>Loading users...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map(user => (
            <div 
              key={user._id} 
              className="border p-4 shadow-lg rounded-lg "
            >
              <h3 className="font-bold">{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Role: {user.role}</p>
              {user.role === 'school' && (
                <div>
                  <p>District: {user.district}</p>
                  <p>Sector: {user.sector}</p>
                </div>
              )}
              {user.role === 'transporter' && (
                <p>Areas: {user.areaOfOperations?.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
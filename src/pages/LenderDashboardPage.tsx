
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  FileCheck, 
  Users, 
  Settings, 
  LogOut,
  Edit,
  Trash2,
  Plus,
  Search 
} from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarInset 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

// Sample lender data
const lenders = [
  { 
    id: '1', 
    name: 'QuickCash Finance', 
    loanTypes: ['Personal Loan', 'Two-Wheeler', 'Consumer Durable'], 
    interestRate: '8.5% - 12.25%', 
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'Rapid Lenders Co.', 
    loanTypes: ['Personal Loan', 'Home Loan', 'Education Loan'], 
    interestRate: '9.0% - 13.5%', 
    status: 'Active'
  },
  { 
    id: '3', 
    name: 'EasyFunds Bank', 
    loanTypes: ['Personal Loan', 'Business Loan', 'Vehicle Loan'], 
    interestRate: '7.5% - 10.75%', 
    status: 'Inactive'
  }
];

const LenderDashboardPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleEdit = (id: string) => {
    navigate(`/admin/lender-profile/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would show a confirmation dialog
    toast.success(`Lender with ID ${id} deleted`);
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await signOut();
      // Navigation is handled in the auth context
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="p-4">
              <h2 className="text-xl font-semibold">Lender Admin</h2>
              <p className="text-xs text-gray-500">Manage your lending profile</p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <a href="#">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Lenders" isActive={true}>
                  <a href="#">
                    <Building2 />
                    <span>Lenders</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Applications">
                  <a href="#">
                    <FileCheck />
                    <span>Loan Applications</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Users">
                  <a href="#">
                    <Users />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <a href="#">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Lenders Management</h1>
            <p className="text-gray-500">
              View and manage all lenders on the platform.
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lenders..."
                className="pl-10"
              />
            </div>
            
            <Button onClick={() => navigate('/admin/lender-profile')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lender
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Loan Types</TableHead>
                  <TableHead>Interest Rate Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lenders.map((lender) => (
                  <TableRow key={lender.id}>
                    <TableCell className="font-medium">{lender.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lender.loanTypes.map((type, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{lender.interestRate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lender.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lender.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 mr-2"
                        onClick={() => handleEdit(lender.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(lender.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LenderDashboardPage;

"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { 
  LockOpen2Icon, 
  LockClosedIcon, 
  PlusIcon, 
  TrashIcon 
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [vaults, setVaults] = useState([
    { id: 1, name: "Personal Docs", type: "Text", shared: true },
    { id: 2, name: "Family Photos", type: "Image", shared: false },
    { id: 3, name: "Work Files", type: "File", shared: true },
  ]);
  const [newVault, setNewVault] = useState({
    name: "",
    type: "Text",
    shared: false
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // No session
  if (!session) return null;

  // Handle vault creation
  const handleCreateVault = () => {
    if (!newVault.name.trim()) return;

    const vault = {
      id: Date.now(),
      ...newVault
    };

    setVaults([...vaults, vault]);
    setNewVault({ name: "", type: "Text", shared: false });
  };

  // Handle vault deletion
  const handleDeleteVault = (id:number) => {
    setVaults(vaults.filter(vault => vault.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-2xl md:text-3xl text-center text-blue-800 flex items-center justify-center">
            <LockOpen2Icon className="mr-3 w-8 h-8" />
            Vault Dashboard
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* User Profile Section */}
          <div className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-200 object-cover"
              />
            )}
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {session.user.name}
              </h2>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
          </div>

          {/* Vaults Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Your Vaults</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" /> New Vault
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Vault</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input 
                        id="name" 
                        value={newVault.name}
                        onChange={(e) => setNewVault({...newVault, name: e.target.value})}
                        className="col-span-3" 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select 
                        value={newVault.type}
                        onValueChange={(value) => setNewVault({...newVault, type: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Vault Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Text">Text</SelectItem>
                          <SelectItem value="Image">Image</SelectItem>
                          <SelectItem value="File">File</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleCreateVault} className="w-full">
                    Create Vault
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            {vaults.map((vault) => (
              <div 
                key={vault.id} 
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4">
                  {vault.shared ? (
                    <LockOpen2Icon className="text-blue-500 h-6 w-6" />
                  ) : (
                    <LockClosedIcon className="text-gray-500 h-6 w-6" />
                  )}
                  <div>
                    <h4 className="text-lg font-medium">{vault.name}</h4>
                    <p className="text-sm text-gray-500">{vault.type} Vault</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {vault.shared && (
                    <Badge variant="secondary">Shared</Badge>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" className="h-8 w-8">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the "{vault.name}" vault.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteVault(vault.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
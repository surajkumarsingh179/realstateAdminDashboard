"use client";
import React from "react";
import { Header } from "@/components/layout/Header";
import { useMobileMenuOpen } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Lock, Bell, Palette, Shield, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const onMobileMenuOpen = useMobileMenuOpen();
  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Settings"
        subtitle="Manage your account and application preferences"
        onMobileMenuOpen={onMobileMenuOpen || (() => {})}
      />

      <div className="flex-1 p-4 md:p-6 max-w-3xl space-y-5">
        {/* Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-sm">Profile Information</CardTitle>
                <CardDescription className="text-xs">Update your personal details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Full Name</Label>
                <Input defaultValue="Admin User" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input defaultValue="admin@brokerfirm.com" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Role</Label>
                <Input defaultValue="Super Admin" disabled className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone</Label>
                <Input placeholder="+91 98765 43210" className="h-8 text-sm" />
              </div>
            </div>
            <Button size="sm">Save Profile</Button>
          </CardContent>
        </Card>

        {/* Firm Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-sm">Firm Information</CardTitle>
                <CardDescription className="text-xs">Your brokerage details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Firm Name</Label>
                <Input defaultValue="BrokerFirm Pvt Ltd" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">RERA Number</Label>
                <Input placeholder="RERA/MH/001234" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">City</Label>
                <Input defaultValue="Mumbai" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Website</Label>
                <Input placeholder="https://yourfirm.com" className="h-8 text-sm" />
              </div>
            </div>
            <Button size="sm">Save Firm Info</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-sm">Security</CardTitle>
                <CardDescription className="text-xs">Manage your password and security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Current Password</Label>
                <Input type="password" placeholder="••••••••" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">New Password</Label>
                <Input type="password" placeholder="••••••••" className="h-8 text-sm" />
              </div>
            </div>
            <Button size="sm" variant="outline">Change Password</Button>
          </CardContent>
        </Card>

        {/* Coming soon features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Coming in Future Phases</CardTitle>
            <CardDescription className="text-xs">Features planned for upcoming releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { icon: Bell, label: "Notification Preferences", phase: "Phase 2" },
                { icon: Palette, label: "Theme Customization", phase: "Phase 2" },
                { icon: Shield, label: "Team & Role Management", phase: "Phase 3" },
              ].map(({ icon: Icon, label, phase }) => (
                <div key={label} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-not-allowed">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{phase}</Badge>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

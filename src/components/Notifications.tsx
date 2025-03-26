'use client'

import { Label } from './ui/label'
import { Mail, Bell, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

export default function Notifications() {
    const [notificationMethod, setNotificationMethod] = useState('email')
    return (
        <Card className="mb-6 border-border bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-2xl">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified when items matching your search criteria become available</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    defaultValue="email"
                    value={notificationMethod}
                    onValueChange={setNotificationMethod}
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                            <Mail className="h-4 w-4" />
                            Email
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="push" id="push" />
                        <Label htmlFor="push" className="flex items-center gap-2 cursor-pointer">
                            <Bell className="h-4 w-4" />
                            On this device
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="discord" id="discord" />
                        <Label htmlFor="discord" className="flex items-center gap-2 cursor-pointer">
                            <MessageSquare className="h-4 w-4" />
                            Discord
                        </Label>
                    </div>
                </RadioGroup>

                {notificationMethod === 'email' && (
                    <div className="mt-4">
                        <Label htmlFor="email-address">Email Address</Label>
                        <Input id="email-address" placeholder="your@email.com" className="mt-1 bg-background" />
                    </div>
                )}

                {notificationMethod === 'discord' && (
                    <div className="mt-4">
                        <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
                        <Input id="discord-webhook" placeholder="https://discord.com/api/webhooks/..." className="mt-1 bg-background" />
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full">Notify me!</Button>
            </CardFooter>
        </Card>
    )
}

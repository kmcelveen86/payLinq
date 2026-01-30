"use client";

import { useState, useEffect } from "react";
import { generateApiKey, getApiKeys, revokeApiKey, listWebhooks, createWebhook, deleteWebhook } from "@/app/actions/merchant";
import { Button } from "@/components/Marketplace/components/ui/button";
import { Input } from "@/components/Marketplace/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Marketplace/components/ui/card";
import { Trash, Copy, Check, Plus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function DevelopersPage() {
    const [keys, setKeys] = useState<any[]>([]);
    const [webhooks, setWebhooks] = useState<any[]>([]);
    const [newKey, setNewKey] = useState<string | null>(null);
    const [keyName, setKeyName] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const handleCopy = () => {
        if (newKey) {
            navigator.clipboard.writeText(newKey);
            setIsCopied(true);
            toast.success("Copied to clipboard");
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const loadData = async () => {
        try {
            const [k, w] = await Promise.all([getApiKeys(), listWebhooks()]);
            setKeys(k);
            setWebhooks(w);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data");
        }
    };

    const handleCreateKey = async () => {
        setLoading(true);
        try {
            const res = await generateApiKey(keyName || "Secret Key");
            setNewKey(res.secretKey);
            setKeyName("");
            await loadData();
            toast.success("API Key Created");
        } catch (e) {
            toast.error("Failed to create key");
        } finally {
            setLoading(false);
        }
    };

    const handleRevokeKey = async (id: string) => {
        if (!confirm("Are you sure? This implementation will stop working immediately.")) return;
        try {
            await revokeApiKey(id);
            await loadData();
            toast.success("Key Revoked");
        } catch (e) {
            toast.error("Failed to revoke key");
        }
    };

    const handleAddWebhook = async () => {
        if (!webhookUrl) return;
        setLoading(true);
        try {
            await createWebhook(webhookUrl, ["order.created", "upp.awarded"]);
            setWebhookUrl("");
            await loadData();
            toast.success("Webhook Added");
        } catch (e) {
            toast.error("Failed to add webhook");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWebhook = async (id: string) => {
        try {
            await deleteWebhook(id);
            await loadData();
            toast.success("Webhook Deleted");
        } catch (e) {
            toast.error("Failed to delete webhook");
        }
    };

    return (
        <div className="container mx-auto max-w-5xl space-y-8 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Developers</h1>
                    <p className="text-muted-foreground">Manage your API keys and webhook integrations.</p>
                </div>
            </div>

            {newKey && (
                <Card className="border-green-500 bg-green-500/10">
                    <CardHeader>
                        <CardTitle className="text-green-600 flex items-center gap-2">
                            <Check className="h-5 w-5" /> New Secret Key Generated
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2 text-sm">Please copy this key now. It will not be shown again.</p>
                        <div className="flex items-center gap-2 bg-background p-2 rounded border">
                            <code className="flex-1 font-mono text-sm break-all">{newKey}</code>
                            <Button
                                size={isCopied ? "default" : "icon"}
                                variant={isCopied ? "default" : "ghost"}
                                className={`transition-all duration-200 ${isCopied ? "bg-green-600 hover:bg-green-700 text-white w-24" : "w-10"}`}
                                onClick={handleCopy}
                            >
                                {isCopied ? (
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4" />
                                        <span className="text-xs font-semibold">Copied</span>
                                    </div>
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => setNewKey(null)}>
                            Done
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* API Keys Section */}
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>API Keys</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <Input
                            placeholder="Key Name (e.g. Production)"
                            value={keyName}
                            onChange={(e) => setKeyName(e.target.value)}
                            className="w-full md:w-48"
                        />
                        <Button onClick={handleCreateKey} disabled={loading} className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Generate Key
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {keys.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No API keys found. Generate one to get started.</div>
                    ) : (
                        <div className="space-y-4">
                            {keys.map((key) => (
                                <div key={key.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                                    <div className="overflow-hidden">
                                        <div className="font-medium flex items-center gap-2 flex-wrap">
                                            <span className="truncate">{key.name}</span>
                                            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono whitespace-nowrap">
                                                {key.keyPrefix}...
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            <span className="block sm:inline">Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                                            <span className="hidden sm:inline mx-1">•</span>
                                            <span className="block sm:inline">Last Used: {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : "Never"}</span>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="icon" onClick={() => handleRevokeKey(key.id)} className="shrink-0 self-end sm:self-center">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Webhooks Section */}
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>Webhooks</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <Input
                            placeholder="https://api.yoursite.com/webhooks"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="w-full md:w-64"
                        />
                        <Button onClick={handleAddWebhook} variant="outline" disabled={loading} className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Add Endpoint
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {webhooks.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No webhook endpoints configured.</div>
                    ) : (
                        <div className="space-y-4">
                            {webhooks.map((wh) => (
                                <div key={wh.id} className="flex flex-col gap-3 p-4 border rounded-lg">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="font-mono text-sm break-all">{wh.url}</div>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 shrink-0" onClick={() => handleDeleteWebhook(wh.id)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <span>Secret:</span>
                                            <code className="bg-muted px-1 rounded">{wh.secret}</code>
                                            <CopySecretButton secret={wh.secret} />
                                        </div>
                                        <span className="hidden sm:inline">•</span>
                                        <span>Events: {wh.events.join(", ")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* Documentation Section */}
            <div className="pt-8 border-t">
                <h2 className="text-2xl font-bold tracking-tight mb-6">API Documentation</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Authentication */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Authentication</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Authenticate your requests by including your secret key in the Authorization header.
                            </p>
                            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                                <span className="text-blue-500">Authorization:</span> Bearer sk_live_...
                            </div>
                        </CardContent>
                    </Card>

                    {/* Base URL */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Base URL</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                All API requests should be made to the following base URL:
                            </p>
                            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                                https://paylinq.com/api/v1
                            </div>
                        </CardContent>
                    </Card>

                    {/* Orders API */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Create Order</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Create a new transaction when a customer completes a purchase.
                            </p>
                            <div className="bg-muted p-4 rounded-lg font-mono text-xs md:text-sm overflow-x-auto">
                                <div className="text-green-600 mb-2">POST /orders</div>
                                <pre>{`{
  "amount": 2500,           // Amount in cents ($25.00)
  "currency": "usd",
  "externalOrderId": "ord_123",
  "customer": {
    "email": "customer@example.com",
    "phone": "+15550000000" // Optional, for matching
  }
}`}</pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Offers API */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Track Offer Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-medium">New</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Track views and redemptions for your offers to update your dashboard in real-time.
                            </p>
                            <div className="bg-muted p-4 rounded-lg font-mono text-xs md:text-sm overflow-x-auto">
                                <div className="text-green-600 mb-2">POST /offers/:offerId/track</div>
                                <pre>{`// Request Body
{
  "type": "view" // "view", "click", or "redemption"
}

// Response
{
  "success": true,
  "stats": {
    "views": 150,
    "redemptions": 12
  }
}`}</pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Webhooks */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Webhook Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Verify webhook events using the <code className="text-foreground">x-paylinq-signature</code> header.
                                Compute an HMAC-SHA256 signature of the request body using your webhook secret.
                            </p>
                            <div className="bg-black/90 text-white p-4 rounded-lg font-mono text-xs md:text-sm overflow-x-auto">
                                <pre>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const computed = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return computed === signature;
}`}</pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function CopySecretButton({ secret }: { secret: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(secret);
        setIsCopied(true);
        toast.success("Secret copied");
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={handleCopy}
        >
            {isCopied ? (
                <Check className="h-3 w-3 text-green-500" />
            ) : (
                <Copy className="h-3 w-3" />
            )}
            <span className="sr-only">Copy Secret</span>
        </Button>
    );
}

"use client";

import { useState } from "react";
import { submitMerchantApplication } from "@/app/actions/merchant/submitApplication";
import { Store, Globe, User, Mail, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? (
                <>
                    <Loader2 size={18} className="animate-spin" /> Submitting...
                </>
            ) : (
                <>
                    Submit Application <CheckCircle2 size={18} />
                </>
            )}
        </button>
    );
}

export default function MerchantApplyPage() {
    const { organization } = useOrganization();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);

        // We can optionally add a small delay here if we want to ensure the user sees the spinner
        // await new Promise(resolve => setTimeout(resolve, 500));

        const result = await submitMerchantApplication(formData);

        if (result?.error) {
            setError(result.error);
        }
        // Redirect happens in server action on success
    }

    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-primary/5 p-8 text-center border-b border-border">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Store className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        Complete Your Merchant Profile
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                        Tell us a bit about your business ({organization?.name}) to get your store listed on PayLinq.
                    </p>
                </div>

                <form action={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Store size={14} className="text-muted-foreground" /> Business Name
                                </label>
                                <input
                                    name="businessName"
                                    type="text"
                                    defaultValue={organization?.name || ""}
                                    required
                                    className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Globe size={14} className="text-muted-foreground" /> Website URL
                                </label>
                                <input
                                    name="website"
                                    type="url"
                                    className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <User size={14} className="text-muted-foreground" /> Contact Name
                                </label>
                                <input
                                    name="contactName"
                                    type="text"
                                    required
                                    className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Mail size={14} className="text-muted-foreground" /> Contact Email
                                </label>
                                <input
                                    name="contactEmail"
                                    type="email"
                                    required
                                    className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <FileText size={14} className="text-muted-foreground" /> Category
                            </label>
                            <select
                                name="category"
                                required
                                className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            >
                                <option value="">Select a category...</option>
                                <option value="retail">Retail</option>
                                <option value="dining">Dining & Food</option>
                                <option value="services">Services</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="travel">Travel</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <FileText size={14} className="text-muted-foreground" /> Description
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Tell us about your business..."
                            />
                        </div>
                    </div>

                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}

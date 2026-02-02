"use client";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { Button } from "@/components/Marketplace/components/ui/button"; // Replaced with custom motion button
import { Input } from "@/components/Marketplace/components/ui/input";
import { Textarea } from "@/components/Marketplace/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/Marketplace/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Marketplace/components/ui/select";
import { updateMerchantProfile, type MerchantProfileData } from "@/app/actions/updateMerchantProfile";
import { toast } from "sonner";
import { Loader2, Store, Link as LucideLink, Percent, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/Marketplace/lib/utils";

// Schema definition
const merchantFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    description: z.string().optional(),
    integrationType: z.string(),
    affiliateLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    testAffiliateLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    commissionRate: z.coerce.number().min(0).max(100).optional(),

    // New Fields
    tagline: z.string().optional(),
    category: z.string().optional(),
    tagsRaw: z.string().optional(), // Virtual field for UI
    presence: z.string().default("online").optional(),
    uppEarningRate: z.coerce.number().min(0).optional(),
    uppEarningType: z.string().optional(),
});

type MerchantFormValues = z.infer<typeof merchantFormSchema>;

export function MerchantSettingsForm({ merchant }: { merchant: any }) {
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => setIsSuccess(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    const form = useForm<MerchantFormValues>({
        resolver: zodResolver(merchantFormSchema),
        defaultValues: {
            name: merchant.name || "",
            website: merchant.website || "",
            description: merchant.description || "",
            integrationType: merchant.integrationType || "manual",
            affiliateLink: merchant.affiliateLink || "",
            testAffiliateLink: merchant.testAffiliateLink || "", // used for dev mode only
            commissionRate: merchant.commissionRate || 0,

            tagline: merchant.tagline || "",
            category: merchant.category || "",
            tagsRaw: merchant.tags ? merchant.tags.join(", ") : "",
            presence: merchant.presence || undefined,
            uppEarningRate: merchant.uppEarningRate || 0,
            uppEarningType: merchant.uppEarningType || "percentage",
        },
    });

    function onSubmit(data: MerchantFormValues) {
        startTransition(async () => {
            // Process tags
            const tagsArray = data.tagsRaw
                ? data.tagsRaw.split(",").map(t => t.trim()).filter(Boolean)
                : [];

            const formData = {
                ...data,
                // Ensure optional fields are handled correctly
                website: data.website || null,
                description: data.description || null,
                affiliateLink: data.affiliateLink || null,
                testAffiliateLink: data.testAffiliateLink || null, // Include in submit
                // Always use the existing negotiated rate, do not trust form data
                commissionRate: merchant.commissionRate || 0,

                tagline: data.tagline || null,
                category: data.category || null,
                tags: tagsArray,
                presence: data.presence || "online",
                // Lock reward settings to negotiated terms
                uppEarningRate: merchant.uppEarningRate || 0,
                uppEarningType: merchant.uppEarningType || "percentage",
            };
            const result = await updateMerchantProfile(formData);

            if (result.success) {
                form.reset(data); // Reset form state to current values so isDirty becomes false
                setIsSuccess(true);
                toast.success("Settings saved successfully");
            } else {
                toast.error(result.error || "Something went wrong");
            }
        });
    }

    function onError(errors: any) {
        toast.error("Please fix the errors in the form before saving.");
        console.error("Form validation errors:", errors);
    }

    const integrationType = form.watch("integrationType");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">

                {/* Profile Section */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Store className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Business Profile</h3>
                            <p className="text-sm text-muted-foreground">Manage your public storefront details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Corp" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-11">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Fashion">Fashion</SelectItem>
                                            <SelectItem value="Beauty">Beauty</SelectItem>
                                            <SelectItem value="Travel">Travel</SelectItem>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Dining">Dining</SelectItem>
                                            <SelectItem value="Grocery">Grocery</SelectItem>
                                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com" className="h-11" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="tagline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tagline</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Expect More. Pay Less." className="h-11" {...field} />
                                    </FormControl>
                                    <FormDescription>A short catchy phrase appearing on your card.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tagsRaw"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="fashion, trending, organic" className="h-11" {...field} />
                                    </FormControl>
                                    <FormDescription>Comma-separated keywords.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell customers what distinguishes your brand..."
                                            className="resize-none min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This will be displayed on your marketplace listing.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Integration Section */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                        <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <LucideLink className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{`Integration & Rewards`}</h3>
                            <p className="text-sm text-muted-foreground">Configure how customers shop and earn rewards</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="integrationType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Integration Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-11">
                                                <SelectValue placeholder="Select integration type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="manual">Manual (No Integration)</SelectItem>
                                            <SelectItem value="affiliate">Affiliate Link</SelectItem>
                                            <SelectItem value="api">Direct API</SelectItem>
                                            <SelectItem value="marketplace">Marketplace Sync</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Determines how we track sales and attribute rewards.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {integrationType === "affiliate" && (
                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="affiliateLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Affiliate Tracking Link (Production)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <LucideLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="https://example.com?ref=paylinq" className="pl-9 h-11" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                {`The destination URL for "Shop Now" buttons in production.`}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="testAffiliateLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Test Affiliate Link (Development)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <LucideLink className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                                    <Input placeholder="http://localhost:3000?ref=paylinq" className="pl-9 h-11 border-orange-200 focus-visible:ring-orange-500" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-orange-600/80">
                                                {`Used ONLY when NODE_ENV is 'development'. Useful for localhost testing.`}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Rewards Configuration */}
                            <FormField
                                control={form.control}
                                name="presence"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Operating Mode</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Select mode" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="online">Online Only</SelectItem>
                                                <SelectItem value="local">Local Only</SelectItem>
                                                <SelectItem value="both">Both (Online & Local)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>Where do you accept customers?</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Read-only Commission Rate */}
                            <div className="space-y-2">
                                <FormLabel>Commission Rate</FormLabel>
                                <div className="h-11 px-3 py-2 rounded-md border border-input bg-muted text-muted-foreground text-sm flex items-center">
                                    {merchant.commissionRate || 0}%
                                </div>
                                <FormDescription>
                                    The negotiated revenue share percentage for Paylinq.
                                </FormDescription>
                            </div>

                            {/* Read-only Reward Rate */}
                            <div className="space-y-2">
                                <FormLabel>UPP Reward Rate</FormLabel>
                                <div className="h-11 px-3 py-2 rounded-md border border-input bg-muted text-muted-foreground text-sm flex items-center">
                                    {merchant.uppEarningRate || 0} {merchant.uppEarningType === 'percentage' ? '%' : 'UP'}
                                </div>
                                <FormDescription>
                                    Amount/Percentage of UP earned per purchase.
                                </FormDescription>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end pt-4">
                    <motion.button
                        type="submit"
                        disabled={isPending || isSuccess || !form.formState.isDirty}
                        className={cn(
                            "relative h-12 px-8 text-lg font-medium rounded-xl shadow-lg transition-all overflow-hidden flex items-center justify-center min-w-[180px]",
                            isSuccess
                                ? "bg-green-500 text-white shadow-green-500/20"
                                : !form.formState.isDirty
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-primary/20 hover:shadow-primary/40"
                        )}
                        whileHover={!isPending && !isSuccess && form.formState.isDirty ? { scale: 1.02 } : {}}
                        whileTap={!isPending && !isSuccess && form.formState.isDirty ? { scale: 0.98 } : {}}
                        layout
                    >
                        <AnimatePresence mode="wait">
                            {isPending ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex items-center"
                                >
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Saving...
                                </motion.div>
                            ) : isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="flex items-center"
                                >
                                    <Check className="mr-2 h-6 w-6" />
                                    Saved!
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    Save Changes
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </form>
        </Form>
    );
}

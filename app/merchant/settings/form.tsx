"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/Marketplace/components/ui/button";
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
import { Loader2, Store, Link as LucideLink, Percent } from "lucide-react";

// Schema definition
const merchantFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    description: z.string().optional(),
    integrationType: z.string(),
    affiliateLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    commissionRate: z.coerce.number().min(0).max(100).optional(),
});

type MerchantFormValues = z.infer<typeof merchantFormSchema>;

export function MerchantSettingsForm({ merchant }: { merchant: any }) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<MerchantFormValues>({
        resolver: zodResolver(merchantFormSchema),
        defaultValues: {
            name: merchant.name || "",
            website: merchant.website || "",
            description: merchant.description || "",
            integrationType: merchant.integrationType || "manual",
            affiliateLink: merchant.affiliateLink || "",
            commissionRate: merchant.commissionRate || 0,
        },
    });

    function onSubmit(data: MerchantFormValues) {
        startTransition(async () => {
            const formData = {
                ...data,
                // Ensure optional fields are handled correctly
                website: data.website || null,
                description: data.description || null,
                affiliateLink: data.affiliateLink || null,
                commissionRate: data.commissionRate || 0,
            };
            const result = await updateMerchantProfile(formData);

            if (result.success) {
                toast.success("Settings saved successfully");
            } else {
                toast.error(result.error || "Something went wrong");
            }
        });
    }

    const integrationType = form.watch("integrationType");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                            <h3 className="text-xl font-semibold">Integration & Rewards</h3>
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
                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <FormField
                                    control={form.control}
                                    name="affiliateLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Affiliate Tracking Link</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <LucideLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="https://example.com?ref=paylinq" className="pl-9 h-11" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                The destination URL for "Shop Now" buttons.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="commissionRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Commission Rate (%)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input type="number" step="0.1" className="pl-9 h-11" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            The revenue share percentage for Paylinq.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary h-12 px-8 text-lg shadow-lg shadow-primary/20 rounded-xl"
                    >
                        {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}

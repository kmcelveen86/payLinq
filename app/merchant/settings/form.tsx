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
import { Loader2 } from "lucide-react";

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
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acme Corp" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about your business..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This will be displayed on the marketplace.
                                </FormDescription>
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
                                    <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium pt-4 border-t">Integration Settings</h3>

                    <FormField
                        control={form.control}
                        name="integrationType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Integration Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
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
                                    How users will shop at your store.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {integrationType === "affiliate" && (
                        <FormField
                            control={form.control}
                            name="affiliateLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Affiliate Tracking Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com?ref=paylinq" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The link users will be redirected to when they click "Shop Now".
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="commissionRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Commission Rate (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.1" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The percentage of revenue shared with Paylinq.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}

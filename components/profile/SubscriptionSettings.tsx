import React from "react";
import { motion } from "framer-motion";
import { CreditCard, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { useSubscriptionStatus, useManageSubscription } from "../../app/hooks/useProfile";

const SubscriptionSettings = () => {
    const { data: subscription, isLoading } = useSubscriptionStatus();
    const { mutate: manageSubscription, isPending: isRedirecting } = useManageSubscription();

    const handleManageClick = () => {
        manageSubscription(undefined);
    };

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 flex items-center justify-center"
            >
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2D9642]"></div>
            </motion.div>
        );
    }

    const isSubscribed = subscription?.status === "active" || subscription?.status === "trialing";
    const tierName = subscription?.tier ? subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1) : "Free";
    const nextBillingDate = subscription?.currentPeriodEnd
        ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
        : null;

    return (
        <motion.div
            key="subscription"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                    <CreditCard size={20} className="mr-2 text-[#2D9642]" />
                    Subscription & Billing
                </h2>
            </div>

            {/* Credit Balance Banner */}
            {subscription?.balance !== undefined && subscription.balance < 0 && (
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-6 flex items-start">
                    <div className="p-2 bg-green-900/50 rounded-lg mr-3">
                        <CreditCard className="text-green-400 h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-green-400 font-medium">Account Credit Available</h4>
                        <p className="text-sm text-gray-400 mt-1">
                            You have a credit of <span className="text-white font-bold">${(Math.abs(subscription.balance) / 100).toFixed(2)}</span> on your account.
                            This will be automatically applied to your next invoice.
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">Current Plan</h3>
                        <div className="flex items-center space-x-3">
                            <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                ${tierName === 'Black' ? 'from-slate-400 to-slate-100' :
                                    tierName === 'Gold' ? 'from-amber-400 to-yellow-200' :
                                        tierName === 'Silver' ? 'from-slate-300 to-slate-100' :
                                            'from-gray-400 to-gray-200'}`}>
                                {tierName.toLowerCase() === 'none' ? 'No' : tierName} Membership
                            </span>
                            {isSubscribed && (
                                <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full border border-green-700 flex items-center">
                                    <CheckCircle size={10} className="mr-1" />
                                    Active
                                </span>
                            )}
                        </div>
                        {isSubscribed && nextBillingDate && (
                            <p className="text-gray-400 text-sm mt-2 flex items-center">
                                <Calendar size={14} className="mr-1" />
                                Next billing date: {nextBillingDate}
                            </p>
                        )}
                        {!isSubscribed && (
                            <p className="text-gray-400 text-sm mt-2">
                                You are currently on the free plan. Upgrade to unlock premium features and rewards.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className=" space-y-4">
                <h3 className="text-md font-medium text-white">Manage Subscription</h3>
                <p className="text-gray-400 text-sm mb-4">
                    View your payment history, download invoices, cancel your subscription, or update your payment method securely via Stripe.
                </p>

                <button
                    onClick={handleManageClick}
                    disabled={isRedirecting || tierName.toLowerCase() === 'none'}
                    className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRedirecting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Redirecting...
                        </>
                    ) : (
                        <>
                            Manage Subscription
                            <ExternalLink size={16} className="ml-2" />
                        </>
                    )}
                </button>
            </div>
        </motion.div >
    );
};

export default SubscriptionSettings;

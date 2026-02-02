import { SignOutButton } from "@clerk/nextjs";

export default function BannedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h2>
                <p className="text-gray-600 mb-6">
                    Your account has been suspended due to a violation of our terms of service or a security concern.
                </p>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                        If you believe this is an error, please contact support.
                    </p>
                    <div className="pt-4 border-t">
                        <SignOutButton>
                            <button className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

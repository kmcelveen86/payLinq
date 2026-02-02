import Link from "next/link";
import { notFound } from "next/navigation";
import ClientAppActions from "./ClientAppActions";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { prisma } = await import("@/lib/prisma");

    const application = await prisma.merchantApplication.findUnique({
        where: { id },
    });

    if (!application) return notFound();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Link href="/merchants/applications" className="text-gray-500 hover:text-gray-900 border rounded px-3 py-1.5 text-sm bg-white w-fit">
                        ← Back
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Review Application</h1>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Applicant Details</h3>
                    <dl className="space-y-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                            <dd className="mt-1 text-gray-900">{application.businessName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="mt-1 text-gray-900">{application.category}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Website</dt>
                            <dd className="mt-1 text-gray-900 break-all">{application.website}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-gray-900">{application.description || "N/A"}</dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Info</h3>
                    <dl className="space-y-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="mt-1 text-gray-900">{application.contactName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-gray-900 break-all">{application.contactEmail}</dd>
                        </div>
                    </dl>

                    <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
                        <ClientAppActions applicationId={application.id} status={application.status} />
                        <p className="text-xs text-gray-500 mt-2 text-center md:text-left">Creating a merchant will make it visible on the platform.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

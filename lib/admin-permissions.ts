export type AdminRole = "super_admin" | "support" | "analyst";

export const PERMISSIONS: Record<string, AdminRole[]> = {
    VIEW_DASHBOARD: ["super_admin", "support", "analyst"],
    MANAGE_MERCHANTS: ["super_admin", "support"],
    MANAGE_CUSTOMERS: ["super_admin", "support"],
    MANAGE_UPP: ["super_admin"],
    MANAGE_ADMINS: ["super_admin"],
    IMPERSONATE_USER: ["super_admin"],
    VIEW_AUDIT_LOGS: ["super_admin"],
    VIEW_SECURITY_LOGS: ["super_admin"],
    MANAGE_APPLICATIONS: ["super_admin", "support"],
    VIEW_MERCHANTS: ["super_admin", "support", "analyst"],
    VIEW_CUSTOMERS: ["super_admin", "support", "analyst"],
    VIEW_UPP: ["super_admin", "support", "analyst"],
    VIEW_ANALYTICS: ["super_admin"],
    MANAGE_RATES: ["super_admin"],
};

export interface Coupon {
    id: string;
    code: string;
    createdAt?: string;
    used: boolean;
    planId: number | null;
}

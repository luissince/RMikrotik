import type { Plan } from "../plan/plan";
import type { User } from "../user/user";

export interface Subscription {
    id: number;
    endDate: string;
    method: string;
    price: number;
    startDate: string;
    status: string;
    plan: Plan;
    user: User;
}
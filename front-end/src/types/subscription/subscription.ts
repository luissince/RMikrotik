import type { Plan } from "../plan/plan";
import type { User } from "../user/user";

export interface Subscription {
    id: number;
    endDate: string;
    method: string;
    plan_id: number;
    price: number;
    startDate: string;
    status: string;
    user_id: number;
    plan: Plan;
    user: User;
}
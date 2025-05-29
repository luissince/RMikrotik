import type { PlanCharacteristic } from "./plan-characteric";

export interface Plan {
    id: string;
    active: boolean;
    durationInDays: number;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    characteristics: PlanCharacteristic[];
}
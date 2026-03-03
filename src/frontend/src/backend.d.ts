import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    message: string;
    timestamp: bigint;
    phoneNumber: string;
}
export interface TableReservation {
    date: string;
    name: string;
    time: string;
    timestamp: bigint;
    phoneNumber: string;
    guests: bigint;
}
export interface backendInterface {
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllTableReservations(): Promise<Array<TableReservation>>;
    reserveTable(name: string, phoneNumber: string, date: string, time: string, guests: bigint): Promise<void>;
    submitContactForm(name: string, phoneNumber: string, message: string): Promise<void>;
}

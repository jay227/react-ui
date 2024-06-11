import { FilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";

export interface PostingBatch {
    id: number;
    batchId: number;
    batchType: CashPostingBatchTypes;
    source: string;
    batchDate: string;
    assignedAmount: number;
    specificCode: SpecificPaymentCodes;
    isPosting: boolean;
    isPosted: boolean;
    amount: number;
    itemCount: number;
    items: PostingItem[];
    postedBy: string;
    lastModifier: string;
}
export interface PostingItem {
    accountNumber: number;
    groupAccountNumber: number;
    batchSource: string;
    batchId: number;
    batchItemId: number;
    amount: number;
    appliedAmount: number;
    amountRemaining: number;
    isPosted: boolean;
    serviceType: ServiceIncludeTypes;
    isDirty: boolean;
    payments: PaymentBase[];
}

export enum SpecificPaymentCodes {
    None = 0,
    Adjustment = 738,
    Discount = 746,
    ChargeBack = 741,
    CreditMemo = 549,
    Movement = 740,
    Reversal = 743,
    Release = 744,
    Payment = 624,
    Closeout = 742
}

export enum CashPostingRemitTypes {
    Post = 0,
    RemitPull = 1,
    Research = 2,
    Unknown = 3,
    UnknownClient = 4,
    Review = 5
}

export interface PaymentBase {
    entityState: EntityStatusTypes;
    accountNumber: number;
    invoiceAmount: number;
    paidAmount: number;
    appliedAmount: number;
    endDebtorId: string;
    endDebtorName: string;
    isDelinquent: boolean;
    process: boolean;
    invoiceNumber: string;
    invoiceId: string;
    checkNumber: string;
    specificCode: SpecificPaymentCodes | null;
    currentBalance: number;
    createdDate: string;
    newBalance: number;
    serviceIncludeType: ServiceIncludeTypes;
    comments: string;
    isPosted: boolean;
}

export enum CashPostingBatchTypes {
    PncLockBox = 0,
    WellsFargoLockBox = 1,
    PncAch = 2,
    WellsFargoAch = 3,
    ThirdPartyPay = 4,
    CreditCard = 5,
    WalkIns = 6,
    BmoAch = 7,
    BmoLockBox = 8,
    Discount = 9,
    UnappiedCash = 10,
    ChargeBack = 11,
    Movement = 12
}

export enum EntityStatusTypes {
    Unmodified = 0,
    Added = 1,
    Deleted = 2,
    Modified = 3
}

export enum ServiceIncludeTypes {
    None = 0,
    FullService = 1,
    FundingOnly = 2,
    All = 3
}

export type DealStatus = 'Active' | 'Pending Review' | 'Monitoring' | 'Closed';

export type Deal = {
  id: string;
  name: string;
  type: string;
  amount: string;
  lenders: number;
  region: string;
  leadArranger: string;
  signedDate: string;
  maturityDate: string;
  status: DealStatus;
  flag?: {
    type: 'warning' | 'error' | 'info';
    message: string;
  };
};

export type DealFilter = {
  search?: string;
  status?: DealStatus;
  hasFlag?: boolean;
  leadArranger?: string;
  dealType?: string;
  region?: string;
};

export type SortConfig = {
  key: keyof Deal | null;
  direction: 'asc' | 'desc';
};

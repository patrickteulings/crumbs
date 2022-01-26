export interface CrumbTemplate {
  id: string;
  label: string;
  date?: Date | any;
  categoryID: string;
  amount: number;
  color: string;
  target?: number;
  increase?: boolean;
  timespan?: string;
}

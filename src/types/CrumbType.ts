export interface ICrumb {
  id: string;
  label: string;
  date?: Date | any;
  categoryID: string;
  amount: number;
  colour?: string;
  max?: number
}

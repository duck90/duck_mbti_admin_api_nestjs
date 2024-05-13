export interface IAdmin {
  id: number;
  username: string;
  role: 'admin' | 'manager';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

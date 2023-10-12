export type TSendMailParams = {
  to: string[];
  subject?: string;
  context?: any;
  template: string;
};

export interface IMailer {
  sendMail(params: TSendMailParams): Promise<boolean>;
}

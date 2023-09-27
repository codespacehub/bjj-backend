export interface ICreateHash {
  execute(data: string): Promise<string>;
}

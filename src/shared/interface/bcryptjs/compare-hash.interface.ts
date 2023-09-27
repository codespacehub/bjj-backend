export interface ICompareHash {
  execute: (value: string, hash: string) => Promise<boolean>;
}

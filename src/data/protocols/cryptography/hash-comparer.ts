export interface HashComparer {
    compare: (plainText: string, cipherText: string) => Promise<boolean>;
}

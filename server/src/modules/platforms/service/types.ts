export interface IPlatformFn {
    sendPost: (msg: string) => Promise<{ status: string }>;
}

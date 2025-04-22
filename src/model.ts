declare global {
    interface Window {
        tv: any;
        Hls: any;
    }
}

export type PlayerConfig = {
    assetId: number | string;
    manifestUrl: string;
};
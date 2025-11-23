type LogLevel = "log" | "warn" | "error" | "info";

class Logger {
    private isEnabled: boolean;

    constructor() {
        this.isEnabled = this.checkLoggingEnabled();
    }

    private checkLoggingEnabled(): boolean {
        if (typeof window === "undefined") {
            return false;
        }
        const params = new URLSearchParams(window.location.search);
        return params.has("log");
    }

    private formatMessage(level: LogLevel, message: string, ...args: any[]): void {
        if (!this.isEnabled) {
            return;
        }

        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

        switch (level) {
            case "log":
                console.log(`${prefix} ${message}`, ...args);
                break;
            case "warn":
                console.warn(`${prefix} ${message}`, ...args);
                break;
            case "error":
                console.error(`${prefix} ${message}`, ...args);
                break;
            case "info":
                console.info(`${prefix} ${message}`, ...args);
                break;
        }
    }

    public log(message: string, ...args: any[]): void {
        this.formatMessage("log", message, ...args);
    }

    public warn(message: string, ...args: any[]): void {
        this.formatMessage("warn", message, ...args);
    }

    public error(message: string, ...args: any[]): void {
        this.formatMessage("error", message, ...args);
    }

    public info(message: string, ...args: any[]): void {
        this.formatMessage("info", message, ...args);
    }
}

export const logger = new Logger();

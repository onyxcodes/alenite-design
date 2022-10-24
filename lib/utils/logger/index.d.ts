declare const browserLogger: import("pino").Logger<{
    browser: {
        serialize: true;
        write: {
            info: (o: object) => void;
            error: (o: object) => void;
        };
    };
}>;
export default browserLogger;

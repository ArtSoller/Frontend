import * as Sentry from "@sentry/react"
import { AxiosError } from "axios"

const init = () => {
    Sentry.init({
        dsn: "https://7a324430d86c8cfe1a7bd0c7b6c6f775@o4507537879072768.ingest.de.sentry.io/4507537887526992",
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    })
}

const log = (error: AxiosError) => {
    Sentry.captureException(error)
}

export const logger = {
    init,
    log
}
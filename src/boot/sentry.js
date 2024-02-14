import { boot } from "quasar/wrappers";
// import * as Sentry from "@sentry/browser";
// import * as Integrations from "@sentry/integrations";
// import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { Replay } from '@sentry/replay';

export default boot(({ app, router }) => {

  // https://github.com/jlvvlj/heroes-platform-demo/blob/master/src/boot/errors.js

  if (process.env.VUE_MODE !== "production") {
    console.log(`I'm on a development build`)
  }

  if (process.env.VUE_MODE === "production" && process.env.VUE_SENTRY_DSN) {
    console.log(`I'm on a production build`)
    Sentry.init({
      app,
      dsn: process.env.VUE_SENTRY_DSN,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: ["localhost", "app.malgori.pl", /^\//],
        }),
        new Replay({
          // Additional SDK configuration goes in here, for example:
          maskAllText: false,
          blockAllMedia: false
          // See below for all available options
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });

  }

});

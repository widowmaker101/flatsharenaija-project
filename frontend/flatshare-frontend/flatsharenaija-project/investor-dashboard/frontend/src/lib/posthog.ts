import posthog from 'posthog-js';

posthog.init('YOUR_PROJECT_API_KEY', {
  api_host: 'https://app.posthog.com', // or your self-hosted PostHog URL
  autocapture: true,
});

export default posthog;

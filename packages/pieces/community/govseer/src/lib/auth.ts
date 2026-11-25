import { PieceAuth } from '@activepieces/pieces-framework';
import { AuthenticationType, httpClient, HttpMethod } from '@activepieces/pieces-common';
import { govseerCommon } from './common';

export const govseerAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  description: `To get your Govseer API key:
1. Sign in at https://govseer.com and open your account page.
2. Under **API keys**, create a key and copy it. It is shown once.
3. Paste it here.

A free plan is available. Plans and limits: https://govseer.com/docs/api`,
  required: true,
  validate: async ({ auth }) => {
    try {
      await httpClient.sendRequest({
        method: HttpMethod.GET,
        url: `${govseerCommon.baseUrl()}/api/v1/cpsc/certificates`,
        authentication: { type: AuthenticationType.BEARER_TOKEN, token: auth },
      });
      return { valid: true };
    } catch {
      return { valid: false, error: 'Govseer did not accept this API key. Check that it was copied in full and has not been revoked.' };
    }
  },
});

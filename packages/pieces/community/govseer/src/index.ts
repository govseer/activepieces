import { createPiece, PieceCategory } from '@activepieces/pieces-framework';
import { createCustomApiCallAction } from '@activepieces/pieces-common';
import { govseerAuth } from './lib/auth';
import { govseerCommon } from './lib/common';
import { getEuLabel } from './lib/actions/get-eu-label';
import { getMarketplaceFields } from './lib/actions/get-marketplace-fields';
import { getShippingFields } from './lib/actions/get-shipping-fields';
import { checkUsCanada } from './lib/actions/check-us-canada';
import { getUpcomingRules } from './lib/actions/get-upcoming-rules';

export const govseer = createPiece({
  displayName: 'Govseer',
  description:
    'Compliance checks for chemical products: EU CLP labels, marketplace and shipping fields, and OSHA HCS and WHMIS checks read from safety data sheets.',
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://cdn.activepieces.com/pieces/govseer.png',
  categories: [PieceCategory.COMMERCE],
  auth: govseerAuth,
  authors: ['govseer'],
  actions: [
    getEuLabel,
    getMarketplaceFields,
    getShippingFields,
    checkUsCanada,
    getUpcomingRules,
    createCustomApiCallAction({
      baseUrl: () => govseerCommon.baseUrl(),
      auth: govseerAuth,
      authMapping: async (auth) => ({
        Authorization: `Bearer ${auth.secret_text}`,
      }),
    }),
  ],
  triggers: [],
});

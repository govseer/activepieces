import { createAction } from '@activepieces/pieces-framework';
import { govseerAuth } from '../auth';
import { govseerCommon } from '../common';

export const getShippingFields = createAction({
  auth: govseerAuth,
  name: 'get_shipping_fields',
  classification: 'READ',
  displayName: 'Get Shipping Fields',
  description:
    'Read a safety data sheet and get the UN number, proper shipping name, hazard class, packing group and US ground limited quantity rule.',
  audience: 'both',
  aiMetadata: {
    description:
      'Read section 14 of a safety data sheet (PDF) and return the transport fields: UN number, proper shipping name, hazard class and packing group, checked against sections 2 and 3, with the US ground limited quantity rule for that class and packing group. Use for shipping and carrier forms; a product not regulated for transport returns empty fields. Each call counts one sheet against the plan; safe to retry.',
    idempotent: true,
  },
  props: {
    sheet: govseerCommon.sheetProperty(),
  },
  async run(context) {
    return govseerCommon.readSheet({
      apiKey: context.auth.secret_text,
      path: '/api/v1/shipping-fields',
      queryParams: {},
      sheet: context.propsValue.sheet,
    });
  },
});

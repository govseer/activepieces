import { createAction, Property } from '@activepieces/pieces-framework';
import { govseerAuth } from '../auth';
import { govseerCommon } from '../common';

export const getMarketplaceFields = createAction({
  auth: govseerAuth,
  name: 'get_marketplace_fields',
  classification: 'READ',
  displayName: 'Get Marketplace Hazard Fields',
  description: 'Read a safety data sheet and get the hazard fields bol.com, eBay and Amazon EU ask sellers for.',
  audience: 'both',
  aiMetadata: {
    description:
      'Read a chemical product\'s safety data sheet (PDF) and return the hazard fields that bol.com, eBay and Amazon EU listing forms ask for, in the languages the seller sells in. Use when filling marketplace listings; for the full EU label text use Get EU CLP Label. Each call counts one sheet against the plan; safe to retry.',
    idempotent: true,
  },
  props: {
    sheet: govseerCommon.sheetProperty(),
    sales_languages: Property.StaticMultiSelectDropdown({
      displayName: 'Sales Languages',
      description: 'The languages you sell in. Each marketplace answers in the ones it uses (bol.com always in Dutch and French).',
      required: false,
      defaultValue: ['EN'],
      options: { options: govseerCommon.euLanguageOptions() },
    }),
    product_name: Property.ShortText({
      displayName: 'Product Name',
      description: 'Leave empty to use the product name on the sheet.',
      required: false,
    }),
    quantity: Property.ShortText({
      displayName: 'Nominal Quantity',
      description: 'The amount in the pack, for example 500 ml or 1 kg.',
      required: false,
    }),
    findings_language: Property.StaticDropdown({
      displayName: 'Findings Language',
      description: 'The language of the notes about the sheet.',
      required: true,
      defaultValue: 'EN',
      options: { options: govseerCommon.findingsLanguageOptions() },
    }),
  },
  async run(context) {
    const { sheet, sales_languages, product_name, quantity, findings_language } = context.propsValue;
    const name = product_name?.trim();
    const amount = quantity?.trim();
    return govseerCommon.readSheet({
      apiKey: context.auth.secret_text,
      path: '/api/v1/marketplace-fields',
      queryParams: {
        ui: findings_language,
        ...(sales_languages && sales_languages.length > 0 ? { langs: sales_languages.join(',') } : {}),
        ...(name ? { name } : {}),
        ...(amount ? { quantity: amount } : {}),
      },
      sheet,
    });
  },
});

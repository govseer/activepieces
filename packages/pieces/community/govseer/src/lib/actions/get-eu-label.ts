import { createAction, Property } from '@activepieces/pieces-framework';
import { govseerAuth } from '../auth';
import { govseerCommon } from '../common';

export const getEuLabel = createAction({
  auth: govseerAuth,
  name: 'get_eu_label',
  classification: 'READ',
  displayName: 'Get EU CLP Label',
  description:
    'Read a safety data sheet and get the EU CLP label elements an online listing must show, in the official wording.',
  audience: 'both',
  aiMetadata: {
    description:
      'Read a chemical product\'s safety data sheet (PDF) and return its EU CLP label elements: pictograms, signal word, hazard and precautionary statements in their official wording, and the "Contains" line, in the chosen EU languages, with what the sheet leaves open. Use for EU product pages and labels; for marketplace forms use Get Marketplace Hazard Fields, for transport data use Get Shipping Fields. Each call counts one sheet against the plan; safe to retry.',
    idempotent: true,
  },
  props: {
    sheet: govseerCommon.sheetProperty(),
    label_languages: Property.StaticMultiSelectDropdown({
      displayName: 'Label Languages',
      description: 'The languages of the label. The sheet counts once, whatever the number of languages.',
      required: true,
      defaultValue: ['EN'],
      options: { options: govseerCommon.euLanguageOptions() },
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
    const { sheet, label_languages, findings_language } = context.propsValue;
    return govseerCommon.readSheet({
      apiKey: context.auth.secret_text,
      path: '/api/v1/check',
      queryParams: { langs: label_languages.join(','), ui: findings_language },
      sheet,
    });
  },
});

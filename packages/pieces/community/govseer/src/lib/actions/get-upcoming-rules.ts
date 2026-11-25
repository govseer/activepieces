import { createAction, Property } from '@activepieces/pieces-framework';
import { govseerAuth } from '../auth';
import { govseerCommon } from '../common';

export const getUpcomingRules = createAction({
  auth: govseerAuth,
  name: 'get_upcoming_rules',
  classification: 'SEARCH',
  displayName: 'Get Upcoming Rule Changes',
  description: 'Get dated rule changes ahead for chemical product compliance, each with its official source.',
  audience: 'both',
  aiMetadata: {
    description:
      'List dated upcoming rule changes for EU CLP, OSHA HCS, WHMIS, Quebec French labels, CPSC eFiling and Amazon dangerous goods, each with its date and official source. Use to answer what changes and when; it reads no sheet and does not count against the plan. Safe to retry.',
    idempotent: true,
  },
  props: {
    areas: Property.StaticMultiSelectDropdown({
      displayName: 'Areas',
      description: 'Leave empty for all areas.',
      required: false,
      options: {
        options: [
          { label: 'Amazon dangerous goods', value: 'amazon' },
          { label: 'CPSC eFiling', value: 'cpsc' },
          { label: 'EU CLP hazard labels', value: 'hazard-labels' },
          { label: 'OSHA HCS and WHMIS', value: 'sds-gap' },
          { label: 'Quebec French labels', value: 'quebec-label' },
        ],
      },
    }),
    language: Property.StaticDropdown({
      displayName: 'Language',
      required: true,
      defaultValue: 'EN',
      options: { options: govseerCommon.findingsLanguageOptions() },
    }),
  },
  async run(context) {
    const { areas, language } = context.propsValue;
    return govseerCommon.getJson({
      apiKey: context.auth.secret_text,
      path: '/api/v1/upcoming-rules',
      queryParams: {
        lang: language,
        ...(areas && areas.length > 0 ? { products: areas.join(',') } : {}),
      },
    });
  },
});

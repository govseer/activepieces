import { createAction, Property } from '@activepieces/pieces-framework';
import { govseerAuth } from '../auth';
import { govseerCommon } from '../common';

export const checkUsCanada = createAction({
  auth: govseerAuth,
  name: 'check_osha_hcs_whmis',
  classification: 'READ',
  displayName: 'Check Against OSHA HCS and WHMIS',
  description: 'Read a safety data sheet and list what it lacks under OSHA HCS 2024 and Canada\'s WHMIS, with the rule behind each gap.',
  audience: 'both',
  aiMetadata: {
    description:
      'Check a safety data sheet (PDF) against the US OSHA Hazard Communication Standard 2024 and Canada\'s WHMIS and return each gap with the rule it comes from. Use for US and Canadian sheets; for EU labels use Get EU CLP Label. Each call counts one sheet against the plan; safe to retry.',
    idempotent: true,
  },
  props: {
    sheet: govseerCommon.sheetProperty(),
    rules: Property.StaticDropdown({
      displayName: 'Rules',
      description: 'Which rules to check the sheet against.',
      required: true,
      defaultValue: 'us,ca',
      options: {
        options: [
          { label: 'OSHA HCS and WHMIS', value: 'us,ca' },
          { label: 'OSHA HCS only (US)', value: 'us' },
          { label: 'WHMIS only (Canada)', value: 'ca' },
        ],
      },
    }),
  },
  async run(context) {
    return govseerCommon.readSheet({
      apiKey: context.auth.secret_text,
      path: '/api/v1/sds-check',
      queryParams: { jur: context.propsValue.rules },
      sheet: context.propsValue.sheet,
    });
  },
});

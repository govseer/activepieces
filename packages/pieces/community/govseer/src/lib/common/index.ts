import { ApFile, Property } from '@activepieces/pieces-framework';
import { AuthenticationType, httpClient, HttpMethod } from '@activepieces/pieces-common';

export const govseerCommon = {
  readSheet,
  getJson,
  sheetProperty,
  euLanguageOptions: () => languageOptions({ languages: EU_LANGUAGES }),
  findingsLanguageOptions: () => languageOptions({ languages: FINDINGS_LANGUAGES }),
  baseUrl: () => BASE_URL,
};

async function readSheet({
  apiKey,
  path,
  queryParams,
  sheet,
}: {
  apiKey: string;
  path: string;
  queryParams: Record<string, string>;
  sheet: ApFile;
}): Promise<unknown> {
  const response = await httpClient.sendRequest<unknown>({
    method: HttpMethod.POST,
    url: `${BASE_URL}${path}`,
    authentication: { type: AuthenticationType.BEARER_TOKEN, token: apiKey },
    headers: { 'Content-Type': 'application/pdf' },
    queryParams,
    body: sheet.data,
    timeout: 120000,
  });
  return response.body;
}

async function getJson({
  apiKey,
  path,
  queryParams,
}: {
  apiKey: string;
  path: string;
  queryParams: Record<string, string>;
}): Promise<unknown> {
  const response = await httpClient.sendRequest<unknown>({
    method: HttpMethod.GET,
    url: `${BASE_URL}${path}`,
    authentication: { type: AuthenticationType.BEARER_TOKEN, token: apiKey },
    queryParams,
  });
  return response.body;
}

function sheetProperty() {
  return Property.File({
    displayName: 'Safety Data Sheet',
    description:
      'The safety data sheet as a PDF, for example from a trigger, a Google Drive or email step, or an HTTP request. It may be in any EU language.',
    required: true,
  });
}

function languageOptions({ languages }: { languages: string[][] }) {
  return languages.map(([label, value]) => ({ label, value }));
}

const BASE_URL = 'https://govseer-api-823928849037.europe-west1.run.app';

const EU_LANGUAGES = [
  ['Bulgarian', 'BG'],
  ['Croatian', 'HR'],
  ['Czech', 'CS'],
  ['Danish', 'DA'],
  ['Dutch', 'NL'],
  ['English', 'EN'],
  ['Estonian', 'ET'],
  ['Finnish', 'FI'],
  ['French', 'FR'],
  ['German', 'DE'],
  ['Greek', 'EL'],
  ['Hungarian', 'HU'],
  ['Irish', 'GA'],
  ['Italian', 'IT'],
  ['Latvian', 'LV'],
  ['Lithuanian', 'LT'],
  ['Maltese', 'MT'],
  ['Polish', 'PL'],
  ['Portuguese', 'PT'],
  ['Romanian', 'RO'],
  ['Slovak', 'SK'],
  ['Slovenian', 'SL'],
  ['Spanish', 'ES'],
  ['Swedish', 'SV'],
];

const FINDINGS_LANGUAGES = [
  ['Dutch', 'NL'],
  ['English', 'EN'],
  ['French', 'FR'],
  ['German', 'DE'],
  ['Italian', 'IT'],
  ['Polish', 'PL'],
  ['Spanish', 'ES'],
];

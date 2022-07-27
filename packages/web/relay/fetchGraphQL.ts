import { config } from '../config';

async function fetchGraphQL(text: string, variables: any) {
  const response = await fetch(config.FAKETTER_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return response.json();
}

export default fetchGraphQL;

const COHERE_TOKEN_API = import.meta.env.VITE_COHERE_KEY
const COHERE_API_GENERATE_URL = import.meta.env.VITE_COHERE_URL_GEN

export async function hotelReview(input, size) {
  const data = {
    model: 'command-xlarge-nightly',
    prompt: `${input}`,
    max_tokens: size,
    temperature: 1.2,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE'
  }
  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'post',
    headers: {
      Accept: 'application / json',
      Authorization: `Bearer ${COHERE_TOKEN_API}`,
      'content-type': 'application/json',
      'Cohere-version': '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  const { text } = response.generations[0]
  return text
    .replace('--', '')
    .replaceAll('"', '')
    .trim()
}

const handleResponse = async <R = unknown>(response: Response): Promise<R> => {
  const text = await response.text()

  if (!response.ok) {
    return Promise.reject<R>(Error(text))
  }

  if (!text.length) {
    return Promise.reject<R>(Error('We expected a response, but nothing got returned.'))
  }

  return JSON.parse(text) as Promise<R>
}

export async function request<R>(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<R> {
  return fetch(input, init).then(resp => handleResponse<R>(resp))
}

//API URL parsing with template literal types
type BaseUrl = 'https://api.example.com';
type ApiVersion = 'v1' | 'v2' | 'v3';
type Endpoint = 'users' | 'products' | 'orders';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiUrl = `${BaseUrl}/${ApiVersion}/${Endpoint}`;

type ParsedRequest<T extends ApiUrl> = T extends `${BaseUrl}/${infer V extends ApiVersion}/${infer E extends Endpoint}`
  ? { url: T; method: HttpMethod; version: V; endpoint: E }
  : never;

function createApiRequest<T extends ApiUrl>(url: T, method: HttpMethod): ParsedRequest<T> {
  const parts = url.split('/');
  const endpoint = parts.pop() as Endpoint;
  const version = parts.pop() as ApiVersion;

  return {
    url,
    method,
    version,
    endpoint
  } as ParsedRequest<T>;
}

const request = createApiRequest('https://api.example.com/v1/users', 'GET');

console.log(request.version);  // v1
console.log(request.endpoint); // users

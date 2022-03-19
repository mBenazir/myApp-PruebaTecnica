export const baseUrl = 'http://localhost:3000/';
export function getUrlEndpoint(entity: string) {
  return baseUrl + entity;
}

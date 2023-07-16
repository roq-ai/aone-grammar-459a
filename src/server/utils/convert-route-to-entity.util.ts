const mapping: Record<string, string> = {
  assignments: 'assignment',
  lessons: 'lesson',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

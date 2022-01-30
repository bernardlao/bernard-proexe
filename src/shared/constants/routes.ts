export const ROUTES = {
  BASE: '/',
  DASHBOARD: '/dashboard',
  NEW_USER: '/user/new',
  EDIT_USER: {
    path: '/user/:id',
    parse: (id: string) => ROUTES.EDIT_USER.path.replace(':id', id),
  }
}
import {adminRoutes} from './adminRoutes'
import {subAdminRoutes} from './subAdminRoutes'

export const privateRoutes =[
    ...adminRoutes,
    ...subAdminRoutes
]
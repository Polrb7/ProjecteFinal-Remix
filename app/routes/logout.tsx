import { logout } from '~/data/auth'

export const action = async ({ request }: { request: Request }) => {
    return logout(request)
}
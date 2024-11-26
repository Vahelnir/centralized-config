import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

import type User from '#models/user'

export function useUser() {
  const page = usePage()
  return computed(() => page.props.user as User)
}

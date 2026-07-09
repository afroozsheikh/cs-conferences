import type { NextConfig } from 'next'
import { checkSlugCollisions } from './lib/build-checks'

checkSlugCollisions()

const nextConfig: NextConfig = {}

export default nextConfig

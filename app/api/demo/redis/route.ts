import { createRedisInstance } from '@/redis'
import { NextResponse } from 'next/server'

const redis = createRedisInstance()

export async function GET(request: Request) {
  const count = await redis.incr('counter')
  return NextResponse.json({ count })
}

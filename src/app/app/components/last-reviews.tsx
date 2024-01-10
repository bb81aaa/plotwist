'use client'

import { supabase } from '@/services/supabase'
import { Review } from '@/types/supabase/reviews'
import { useQuery } from '@tanstack/react-query'
import { LastReviewItem, LastReviewItemSkeleton } from './last-review-item'

export const LastReviews = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['last-reviews'],
    queryFn: async () =>
      await supabase
        .from('reviews_with_user')
        .select()
        .order('id', { ascending: false })
        .limit(3)
        .returns<Review[]>(),
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Last reviews</h3>

        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <LastReviewItemSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (!response?.data) return <></>

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Last reviews</h3>

      <div className="space-y-8">
        {response.data.map((review) => (
          <LastReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

import { Skeleton } from '@heroui/react'
import Main from '../../../components/Main'
import TwoColumnLayout from '../../../components/TwoColumnLayout'

const ProductDetailSkeleton = () => (
  <Main contentClassName="flex flex-col gap-y-12">
    <Skeleton className="w-full min-h-52 rounded-2xl" />

    <div className="flex flex-col gap-y-8">
      <Skeleton className="h-4 w-32 rounded" />

      <TwoColumnLayout gap="xl">
        <TwoColumnLayout.Main>
          <div className="flex flex-col gap-3 lg:gap-7.5">
            <Skeleton className="w-full aspect-17/18 rounded-2xl" />
            <div className="flex gap-3 lg:gap-7.5">
              <Skeleton className="flex-1 aspect-square rounded-xl" />
              <Skeleton className="flex-1 aspect-square rounded-xl" />
              <Skeleton className="flex-1 aspect-square rounded-xl" />
            </div>
          </div>
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <div className="flex flex-col gap-7.5 lg:py-10">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="space-y-2.5">
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-10 w-3/4 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            </div>
            <Skeleton className="h-8 w-28 rounded" />
            <Skeleton className="h-11 w-full rounded-full" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </div>
  </Main>
)

export default ProductDetailSkeleton

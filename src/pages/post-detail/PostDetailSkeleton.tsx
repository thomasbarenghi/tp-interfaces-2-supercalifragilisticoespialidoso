import TwoColumnLayout from '../../components/TwoColumnLayout'

const PostDetailSkeleton = () => (
  <TwoColumnLayout gap="xl">
    <TwoColumnLayout.Main>
      <div className="rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-3/4 w-full animate-pulse" />
    </TwoColumnLayout.Main>
    <TwoColumnLayout.Sidebar>
      <div className="flex flex-col gap-4 animate-pulse pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </TwoColumnLayout.Sidebar>
  </TwoColumnLayout>
)

export default PostDetailSkeleton

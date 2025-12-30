export default function Home() {
  // 백엔드에서 데이터를 가져올 예정
  const items: any[] = [];

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p className="text-xl text-gray-600 mb-2">상품이 없습니다</p>
          <p className="text-gray-400">상품을 등록해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
          >
            <div className="aspect-square bg-gray-100 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400">이미지</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

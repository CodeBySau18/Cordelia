const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mb-4"></div>
      <p className="text-xl text-white-700">Loading, please wait...</p>
    </div>
  );
};

export default Loading;

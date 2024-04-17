export default function SkeletonList() {
    return (
        <ul className="flex flex-col">
            <li className="item px-6 pt-2 flex-1 pb-8 animate-pulse">
                <div className="h-2.5 bg-cyan-200 rounded-full w-48 my-4"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full max-w-[300px]"></div>
                <span className="sr-only">Loading...</span>
            </li>
            <li className="item px-6 pt-2 flex-1 pb-8 animate-pulse">
                <div className="h-2.5 bg-cyan-200 rounded-full w-48 my-4"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full max-w-[300px]"></div>
                <span className="sr-only">Loading...</span>
            </li>
            <li className="item px-6 pt-2 flex-1 pb-8 animate-pulse">
                <div className="h-2.5 bg-cyan-200 rounded-full w-48 my-4"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full max-w-[300px]"></div>
                <span className="sr-only">Loading...</span>
            </li>
            <li className="item px-6 pt-2 flex-1 pb-8 animate-pulse">
                <div className="h-2.5 bg-cyan-200 rounded-full w-48 my-4"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full max-w-[300px]"></div>
                <span className="sr-only">Loading...</span>
            </li>
            <li className="item px-6 pt-2 flex-1 pb-8 animate-pulse">
                <div className="h-2.5 bg-cyan-200 rounded-full w-48 my-4"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-cyan-200 rounded-full max-w-[300px]"></div>
                <span className="sr-only">Loading...</span>
            </li>
        </ul>
    );
}
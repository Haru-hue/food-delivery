const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-orange flex w-40 h-40 text-white items-center justify-center rounded-full">
                <div className="lds-hourglass"></div>
            </div>
        </div>
    )
}

export default Loading
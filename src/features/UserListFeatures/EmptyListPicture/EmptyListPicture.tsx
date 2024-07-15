import emptyListPicture from "../../../shared/media/Empty.svg"

export const EmptyListPicture = () => {
    return (
        <div className='flex justify-center items-center h-full w-full col-span-6 col-start-4'>
            <img
                src={emptyListPicture.toString()}
                alt='Your list is empty'
                className='mx-auto'
            />
        </div>
    )
}
import UserIcon from "../../../shared/media/Profile.svg"

export const ProfileFields = () => {
    return (
        <div className='bg-viat-bg shadow-md rounded-md p-4 mt-8'>
            <div className='flex items-center space-x-2'>
                <img src={UserIcon.toString()} alt='User Icon' className='h-10 w-10' />
                <div className='flex flex-col space-y-1'>
                    <div className='font-viat-small text-viat-size-body text-viat-text'>
                        {/*TODO: Make link and show username*/}
                        {"Username's workspace"}
                    </div>
                    <a
                        href=''
                        className='font-viat-small text-viat-size-small bg-viat-primary-shade text-transparent bg-clip-text'
                    >
                        Open Profile
                    </a>
                </div>
            </div>
        </div>
    )
}
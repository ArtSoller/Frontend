import UserIcon from "../../../shared/media/Profile.svg"

export const ProfileFields = () => {
    return (
        <div className='bg-viat-secondary shadow-lg rounded-lg p-6 mt-8 border border-viat-primary'>
            <div className='flex items-center space-x-4'>
                <img src={UserIcon.toString()} alt='User Icon' className='h-12 w-12 rounded-full border-2 border-viat-primary' />
                <div className='flex flex-col space-y-1'>
                    <div className='font-viat-medium text-viat-size-body text-viat-text'>
                        {/*TODO: Make link and show username*/}
                        {"Username's Workspace"}
                    </div>
                    <a
                        href=''
                        className='font-viat-medium text-viat-size-small text-viat-primary hover:text-viat-primary-dark'
                    >
                        View Profile
                    </a>
                </div>
            </div>
        </div>
    )
}

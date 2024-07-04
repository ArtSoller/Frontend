import { SignUpButton } from "../../features/SignUpButton"
import { SignInButton } from "../../features/SignInButton"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/Screenshot1.svg"

export const LandingPageNavBar = () => {
    const linkClasses: string =
        "text-viat-primary font-viat-body hover:text-viat-accent font-bold"
    return (
        <header className='relative h-20'>
            <div className='container mx-auto px-24 h-full'>
                <div className='flex items-center justify-between h-full'>
                    <div className='flex items-center'>
                        <img src="../../shared/media/Screenshot1.svg" alt='Viatorus Logo' className='h-10 w-auto' />
                    </div>
                    <nav className='flex space-x-8'>
                        {/*TODO: Make actual links*/}
                        <a href='' className={linkClasses}>
                            Convert
                        </a>
                        <a href='' className={linkClasses}>
                            Comparison
                        </a>
                        <a href='' className={linkClasses}>
                            Analytics
                        </a>
                    </nav>
                    <div className='flex space-x-4'>
                        <SignInButton />
                        <SignUpButton />
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 border-b-2 border-viat-primary'></div>
        </header>
    )
}
import Container from "../atoms/Container";
import Header from "../atoms/Header";
import Main from "../atoms/Main";

export function Hero() {
    function Anchor({ text, href, dark = false }: {
        text: string,
        href: string,
        dark?: boolean
    }) {
        return (
            <a href={href} className={`border-2 border-solid rounded-full overflow-hidden border-pink-600 duration-200 hover:opacity-70 text-center ${dark ? "text-pale-100 bg-pink-600" : "text-pink-600"}`}>
                <p className='px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3'>{text}</p>
            </a>
        )
    }

    const footer = (
        <footer className="p-4 sm:p-8 flex justify-center text-indigo-600 gap-1">
            <p className="opacity-90">Created with ♥️ by</p><a href="https://isabella-riquetti.netlify.app/" target="_blank" className="opacity-90 hover:opacity-100 hover:underline">Isabella</a>
        </footer>
    );

    const content = (
        <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-12 text-pale-500'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl text-center'><span className='text-pink-600'>CareMinder</span> is your go-to platform for scheduling <span className='text-pink-600'>selfcare</span> tasks and reminders, ensuring you always look and feel your <span className="text-pink-600">best</span>!</h1>
            <p className='text-lg sm:text-xl md:text-2xl max-w-[80%] text-center text-pink-600 mx-auto'>Stay on top of your beauty and wellness routine with personalized reminders, helping you maintain your glow effortlessly.</p>
            <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
                <Anchor text="Sing Up" href="/singup" />
                <Anchor text="Login" dark href="/login" />
            </div>
        </div>
    );

    return (
        <Container>
            <Header />
            <Main>
                {content}
            </Main>
            {footer}
        </Container>);
}

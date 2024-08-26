import { ReactNode } from "react";

interface Props {
    imgUrl: string;
    children: ReactNode;
    alt?: string;
}

export const SplitPane = ({ children, imgUrl, alt = "" }: Props) => {
    return (
        <main className="flex h-screen">
            <section className="flex flex-1 items-center justify-center overflow-auto">{children}</section>
            <aside className="flex-1 bg-gradient-to-b from-dark-900 via-purple-900 to-purple-600 h-full hidden lg:block">
                <img draggable="false" className="object-right object-contain w-full h-full" src={imgUrl} alt={alt} />
            </aside>
        </main>
    );
};

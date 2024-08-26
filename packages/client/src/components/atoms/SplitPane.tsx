import { ReactNode } from "react";

interface Props {
    imageIcon: ReactNode;
    children: ReactNode;
}

export const SplitPane = ({ children, imageIcon }: Props) => {
    return (
        <main className="grid grid-cols-2 h-screen w-full gap-1 m-8">
            <section className="flex items-center justify-center">{children}</section>
            <aside className="h-full hidden lg:flex max-w-[600px]">
                {imageIcon}
            </aside>
        </main>
    );
};

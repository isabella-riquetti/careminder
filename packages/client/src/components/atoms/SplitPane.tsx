import { ReactNode } from "react";

interface Props {
    imageIcon: ReactNode;
    children: ReactNode;
}

export const SplitPane = ({ children, imageIcon }: Props) => {
    return (
        <main className="flex h-screen w-full gap-1">
            <section className="flex w-1/2 items-center justify-center">{children}</section>
            <aside className="h-full w-1/2 hidden lg:flex max-w-[600px]">
                {imageIcon}
            </aside>
        </main>
    );
};

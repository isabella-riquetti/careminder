import { ReactNode } from "react";

interface Props {
    imageIcon: ReactNode;
    children: ReactNode;
}

export const SplitPane = ({ children, imageIcon }: Props) => {
    return (
        <main className="flex justify-center items-center my-auto w-full gap-1">
            <section className="flex w-1/2 items-center justify-center">{children}</section>
            <aside className="w-0 lg:w-1/2 max-w-[600px]">
                {imageIcon}
            </aside>
        </main>
    );
};

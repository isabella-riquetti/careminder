import { FunctionComponent, ReactNode, SVGProps } from 'react';

interface MenuItemProps {
    href?: string;
    text: string;
    children?: ReactNode;
    icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
    className?: string;
}

function MenuItem({ href, text, icon: Icon, children, className }: MenuItemProps) {
    const content = (
        <>
            {Icon && <Icon className='w-[30px] h-[30px]' />}
            {children}
            <div className='ml-2'>
                {text}
            </div>
        </>
    );

    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href } : {};

    return (
        <div className={`py-2 pl-2 lg:pl-7 pr:1 lg:pr-3 mr-2 lg:mr-4 ${window.location.pathname === href ? "bg-pink-700 text-white rounded-r-lg" : ""} ${className ?? ""}`}>
            <Wrapper {...wrapperProps} className="flex flex-col lg:flex-row items-center">
                {content}
            </Wrapper>
        </div>
    );
}

export default MenuItem;

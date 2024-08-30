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
            {Icon && <Icon className='w-[30px] h-[30px] transition-all ease-in-out duration-300' />}
            {children}
            <div className='w-0 group-hover:ml-2 group-hover:w-fit transition-all ease-in-out overflow-hidden duration-300'>
                {text}
            </div>
        </>
    );

    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href } : {};

    return (
        <div className={`flex items-center justify-center text-pink-900 ${className}`}>
            <Wrapper {...wrapperProps} className="flex items-center">
                {content}
            </Wrapper>
        </div>
    );
}

export default MenuItem;

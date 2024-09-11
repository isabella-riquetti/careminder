import { FunctionComponent, ReactNode, SVGProps } from 'react';

interface MenuItemProps {
    href?: string;
    text?: string;
    children?: ReactNode;
    icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
    className?: string;
}

function MenuItem({ href, text, icon: Icon, children, className }: MenuItemProps) {
    const content = (
        <>
            {Icon && <Icon className='w-[30px] h-[30px]' />}
            {children}
            {text && <div className='truncate max-w-full'>{text}</div>}
        </>
    );

    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href } : {};

    return (
        <div className={`${className ?? ""}`}>
            <Wrapper {...wrapperProps} className="flex flex-row items-center px-2 gap-3">
                {content}
            </Wrapper>
        </div>
    );
}

export default MenuItem;

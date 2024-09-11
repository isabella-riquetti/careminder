import { FunctionComponent, ReactNode, SVGProps } from 'react';

interface MenuItemProps {
    href?: string;
    text?: string;
    children?: ReactNode;
    icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
    className?: string;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ href, text, icon: Icon, children, className }) => {
    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href } : {};

    return (
        <div className={className ?? ""}>
            <Wrapper {...wrapperProps} className="flex flex-row items-center px-2 gap-3">
                {Icon && <Icon className="w-8 h-8" />}
                {children}
                {text && <div className="truncate max-w-full">{text}</div>}
            </Wrapper>
        </div>
    );
};

export default MenuItem;

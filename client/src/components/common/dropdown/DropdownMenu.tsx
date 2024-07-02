import React from "react";

type TDropdownMenuProps = {
    children?: React.ReactNode
    style?: React.CSSProperties
    className?: string
    labeledBy?: string
};

const DropdownMenu = React.forwardRef(
    (props: TDropdownMenuProps, ref: React.Ref<HTMLDivElement>) => {
        return (
            <div
                ref={ref}
                style={props.style}
                className={props.className}
                aria-labelledby={props.labeledBy}
            >
                {props.children}
            </div>
        )
    }
)

export default DropdownMenu
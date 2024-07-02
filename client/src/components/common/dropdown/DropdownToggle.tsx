import React from "react";

type TDropdownToggleProps = {
    children?: React.ReactNode
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}
}

const DropdownToggle = React.forwardRef(
    (props: TDropdownToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
        <a
            className="d-inline-flex dropdown-toggle"
            href="#"
            ref={ref}
            onClick={e => {
                e.preventDefault()
                props.onClick(e)
            }}
        >
            {props.children}
        </a>
    )
)

export default DropdownToggle
import React, {FC} from 'react';

interface IOptionCustomizeProps {
    img: string
}

const OptionCustomize: FC<IOptionCustomizeProps> = ({img}) => {
    return (
        <div className="col-4">
            <button className="tyn-thumb">
                <img src={img} className="tyn-image" alt="" />
            </button>
        </div>
    )
}

const OptionsCustomize = () => {
    return (
        <div className="tab-pane show active" id="chat-options-customize">
            <ul className="d-flex flex-column gap gap-4">
                <li>
                    <h6 className="tyn-title-overline">Change Background</h6>
                    <div className="row g-3">
                        <OptionCustomize
                            img={'../../../../../../assets/img/gallery/chat/thumb-1.jpg'}
                        />
                        <OptionCustomize
                            img={'../../../../../../assets/img/gallery/chat/thumb-1.jpg'}
                        />
                        <OptionCustomize
                            img={'../../../../../../assets/img/gallery/chat/thumb-1.jpg'}
                        />
                        <OptionCustomize
                            img={'../../../../../../assets/img/gallery/chat/thumb-1.jpg'}
                        />
                        <OptionCustomize
                            img={'../../../../../../assets/img/gallery/chat/thumb-1.jpg'}
                        />
                        <OptionCustomize
                            img={'../../../../../../assets/img/gallery/chat/thumb-1.jpg'}
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default OptionsCustomize;
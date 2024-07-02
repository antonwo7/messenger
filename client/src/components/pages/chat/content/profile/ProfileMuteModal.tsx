import React, {FC, useState} from 'react';
import {Modal} from "react-bootstrap";
import {CloseIcon} from "../../../../common/icons";

interface IProfileMuteModalProps {
    closeHandler: () => void
    successHandler: (minutes: number) => void
}

const ProfileMuteModal: FC<IProfileMuteModalProps> = ({closeHandler, successHandler}) => {
    const initialMuteValue = 15
    const [muteValue, setMuteValue] = useState(initialMuteValue)

    const changeMuteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || initialMuteValue
        setMuteValue(value)
    }

    const onSuccess = () => {
        successHandler(muteValue)
    }

    return (
        <Modal show={true} dialogClassName="modal-dialog-centered modal-sm" contentClassName="border-0">
            <Modal.Body className="p-4">
                <h4 className="pb-2">Mute conversation</h4>
                <ul className="tyn-media-list gap gap-2">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="muteFor" value={15} checked={muteValue === 15} id="muteFor15min" onChange={changeMuteValueHandler} />
                            <label className="form-check-label" htmlFor="muteFor15min"> For 15 minutes </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="muteFor" value={60} checked={muteValue === 60} id="muteFor1Hour" onChange={changeMuteValueHandler} />
                            <label className="form-check-label" htmlFor="muteFor1Hour"> For 1 Hours </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="muteFor" value={1440} checked={muteValue === 1440} id="muteFor1Days" onChange={changeMuteValueHandler} />
                            <label className="form-check-label" htmlFor="muteFor1Days"> For 1 Days </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="muteFor" value={-1} checked={muteValue === -1} id="muteForInfinity" onChange={changeMuteValueHandler} />
                            <label className="form-check-label" htmlFor="muteForInfinity"> Until I turn back On </label>
                        </div>
                    </li>
                </ul>
                <ul className="tyn-list-inline gap gap-3 pt-3">
                    <li>
                        <button className="btn btn-md btn-danger js-chat-mute" onClick={onSuccess}>Mute</button>
                    </li>
                    <li>
                        <button className="btn btn-md btn-light" onClick={closeHandler}>Close</button>
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-md btn-icon btn-pill btn-white shadow position-absolute top-0 end-0 mt-n3 me-n3"
                    onClick={closeHandler}
                >
                    <CloseIcon />
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProfileMuteModal;
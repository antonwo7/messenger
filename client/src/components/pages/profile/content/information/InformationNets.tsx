import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {ProfileContext} from "../../../Profile";
import {INet, IUser, IUserLanguage, IUserNet, TShortUser} from "../../../../../models/user";
import {CloseIcon, EditIcon, PlusIcon} from "../../../../common/icons";
import {ILanguage} from "../../../../../models/common";
import {userAPI} from "../../../../../api/user";
import {useAppSelector} from "../../../../../store/hooks";

interface INewNet extends Omit<IUserNet, 'id'>{}

const InformationNets = () => {
    const authUser = useAppSelector(state => state.auth.authUser) as TShortUser
    const {user, common} = useContext(ProfileContext) as {user: IUser, common: any}
    const [nets, setNets] = useState<IUserNet[]>(user?.nets || [])
    const [changeNet, {isLoading, isSuccess}] = userAPI.useChangeNetMutation()
    const [addNet] = userAPI.useAddNetMutation()
    const [deleteNet] = userAPI.useDeleteNetMutation()
    const [netAdding, setNetAdding] = useState<false | INewNet>(false)

    useEffect(() => {
        if (user && 'nets' in user && user.nets !== undefined) {
            setNets(user.nets)
        }
    }, [user?.nets])

    const commonNets = useMemo(() => {
        return common?.nets.reduce((temp: {[key: number]: INet}, net: INet) => ({...temp, [net.id]: net}), {})
    }, [common?.nets])

    const closeNetHandler = () => {
        setNetAdding(false)
    }

    const addNetHandler = () => {
        setNetAdding({
            net_id: 0,
            url: ''
        })
    }

    const changeNetHandler = (netId: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNets(nets.map((net: IUserNet) => {
            if (net.id === netId) {
                const field = e.target.name
                if (field in net) {
                    net = {...net, [field]: e.target.value}
                    net.id = +net.id
                }
            }
            return net
        }))
    }

    // const saveNetHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     if (e.target.dataset.id === undefined) return;
    //     changeNet({
    //         id: +e.target.dataset.id,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const saveNetHandler = () => {
        if (!netAdding || !netAdding?.net_id || !netAdding?.url) return;
        addNet(netAdding)
        closeNetHandler()
    }

    const deleteNetHandler = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.netid === undefined) return;
        deleteNet(+e.currentTarget.dataset.netid)
        closeNetHandler()
    }

    const changeEditingNetHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (!netAdding || !e.target.value || !e.target.name) return;

        const field = e.target.name as string
        const value = e.target.value as string

        setNetAdding({
            ...netAdding, [field]: value
        })
    }

    const isAuthUserProfile = authUser.id === user.id

    return (
        <div className="tyn-profile-details mt-3">
            <div className="col-12">
                <div className="row gy-4">
                    <div className="col-lg-3">
                        <h6>Social media</h6>
                        {isAuthUserProfile && <div className="tyn-subtext">Edit Your nets</div>}
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-gs">
                            {nets && nets.map((net, index) => (
                                <>
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <select name="id" className="form-control mr-3" value={net.id} disabled={true}>
                                                    {common?.nets && common.nets.map((commonNet: INet) => (
                                                        <option value={commonNet.id}>{commonNet.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <input type="text" name="url" className="form-control" data-id={net.id} placeholder="Url" value={net.url} disabled={true}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                {isAuthUserProfile && <button className="btn" data-netid={net.id} onClick={deleteNetHandler}>
                                                    <CloseIcon />
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                            {netAdding ? (
                                <>
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <select name="net_id" className="form-control mr-3" onChange={changeEditingNetHandler} value={netAdding?.net_id || 0}>
                                                    <option value="0" />
                                                    {common?.nets && common.nets.map((commonLanguage: INet) => (
                                                        <option value={commonLanguage.id}>{commonLanguage.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <input type="text" name="url" className="form-control" placeholder="Url" value={netAdding?.url || ''} onChange={changeEditingNetHandler} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <button className="btn btn-light" onClick={saveNetHandler}>
                                                    <EditIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <button className="btn btn-light btn-inline" onClick={closeNetHandler}>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            {isAuthUserProfile && <button className="btn btn-light" onClick={addNetHandler}>
                                                <PlusIcon />
                                            </button>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationNets;
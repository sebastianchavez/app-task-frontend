//******** React ********/
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

//******** Services ********/
import { get, post, remove, put } from '../servives/api'
import { log, error } from '../servives/logger'
import { toast, confirm } from '../servives/messages'

//******** Components ********/
import DevForm from '../components/Forms/DevForm'
import DevsTable from '../components/Tables/DevsTable'
import DevModal from '../components/Modals/DefaultModal'
import DevHeader from '../components/Headers/DevHeader'
import DevDetail from '../components/Views/DevDetail'

//******** CONSTANTS ********/
import CONSTANTS from '../constants/constants'


export default () => {

    const [devs, setDevs] = useState([])
    const [data, setData] = useState({})
    const [filter, setFilter] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [modalTitle, setModalTitle] = useState('Nuevo desarrollo')
    const [quant, setQuant] = useState(CONSTANTS.QUANT[0].value)
    const [user, setUser] = useState(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null)

    useEffect(() => {
        getDevs()
    }, [])


    const addDev = async (values) => {
        try {
            if (values._id) {
                await put(`devs/update-dev/${values._id}`, values)
                toast('Desarrollo actualizado')
                log('Devs', 'addDev', { info: 'Success' })
            } else {
                await post('devs/new-dev', values)
                toast('Desarrollo agregada')
                log('Devs', 'addDev', { info: 'Success' })
            }
            getDevs()
            handleClose()
        } catch (e) {
            toast('Problemas al agregar desarrollo, intente más tarde', 'error')
            error('Devs', 'addDev', { info: 'Catch error', error: e })
        }
    }

    const onDelete = async (_id) => {
        try {
            let res = await confirm('Desea eliminar este desarrollo?')
            if (res.value) {
                await remove(`devs/delete-dev/${_id}`)
                toast('Desarrollo eliminada')
                log('Devs', 'onDelete', { info: 'Success' })
                getDevs()
            }
        } catch (e) {
            toast('Problemas al eliminar desarrollo, intente más tarde', 'error')
            error('Devs', 'onDelete', { info: 'Catch error', error: e })
        }
    }

    const onEdit = () => {
        setData({ action: 'edit' })
    }

    const getDevs = async () => {
        try {
            if (user) {
                const response = await get(`devs/get-by-userId/${user._id}/quant/${quant}`)
                setDevs(response.data)
                log('Devs', 'getDevs', { info: 'Success', response })
            }
        } catch (e) {
            error('Devs', 'getDevs', { info: 'Catch error', error: e })
        }
    }

    const searchDev = async e => {
        try {
            e.preventDefault()
            let query = `?name=${filter.name ? filter.name : ''}&state=${filter.state ? filter.state : ''}&type=${filter.type ? filter.type : ''}&quant=${quant}`
            const devs = await get(`devs/get-by-params/${query}`)
            log('Devs', 'searchDev', { info: 'Success', response: devs })
            setDevs(devs.data)
        } catch (e) {
            toast('Problemas al buscar desarrollo, intente más tarde', 'error')
            error('Devs', 'searchDev', { info: 'Catch error', error: e })
        }
    }

    const openNewModal = () => {
        setData({ action: 'new' })
        setModalTitle('Nueva desarrollo')
        handleShow()
    }

    const openEditModal = data => {
        setData({ action: 'edit', ...data })
        setModalTitle('Editar desarrollo')
        handleShow()
    }

    const openViewModal = data => {
        setData({ action: 'view', ...data })
        setModalTitle('Desarrollo')
        handleShow()
    }


    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <DevHeader {...{ searchDev, filter, setFilter }} />
                </div>
            </div>
            <div className="card card-body mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <Button className="btn btn-success" variant="primary" onClick={openNewModal}>
                            Nuevo desarrollo
                        </Button>
                        <DevModal onHide={handleClose} show={show} title={modalTitle}>
                            {
                                data.action && data.action === 'view'
                                    ? <DevDetail {...{ data }} />
                                    : <DevForm {...{ addDev, data }} />
                            }
                        </DevModal>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-2 mr-auto">
                        <div className="form-group">
                            <select onChange={e => setQuant(e.target.value)} name="" className="form-control" id="">
                                {CONSTANTS.QUANT.map((q, i) => <option key={i + '_quant'} value={q.value}>{q.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 ml-auto">
                        <div className="form-group">
                            <input type="text" placeholder="Buscar" className="form-control" name="" id="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-2" style={{ overflow: 'auto', maxHeight: 700 }}>
                        <DevsTable {...{ devs, onDelete, onEdit, openEditModal, openViewModal }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
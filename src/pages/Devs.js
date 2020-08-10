import React, { useEffect, useState } from 'react'
import DevForm from '../components/Forms/DevForm'
import { toast } from 'react-toastify'
import DevsTable from '../components/Tables/DevsTable'
import { get, post, remove, put } from '../servives/api'

export default () => {

    //TODO: cambiar diseño, agregar modal para nuevo y editar
    
    const [devs, setDevs] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        getDevs()
    },[])


    const addDev = async (values) => {
        try {
            console.log(values)
            if(values._id) {
                await put(`devs/update-dev/${values._id}`, values)
                toast('Desarrollo actualizado', { type: 'info', autoClose: 2000, hideProgressBar: true })
            } else {
                await post('devs/new-dev', values)
                toast('Desarrollo agregada', { type: 'info', autoClose: 2000, hideProgressBar: true })
            }
            getDevs()
        } catch (e) {
            console.error(e)
        }
    }

    const onDelete = async (_id) => {
        try {
            if (window.confirm('Eliminar desarrollo?')) {
                await remove(`devs/delete-dev/${_id}`)
                toast('Desarrollo eliminada', { type: 'error', autoClose: 2000, hideProgressBar: true })
                getDevs()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const onEdit = () => {
        setData({action: 'edit'})
    }

    const getDevs = async () => {
        try {
            const response = await get('devs/get-devs')
            setDevs(response.data.devs)
        } catch (e) {
            console.error(e)
        }
    }

    
    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4 mt-2">
                    <DevForm {...{ addDev, data }} />
                </div>
                <div className="col-md-8 mt-2" style={{ overflow: 'auto', maxHeight: 700 }}>
                    <DevsTable {...{ devs, onDelete, onEdit }}/>
                </div>
            </div>
        </div>
    )
}
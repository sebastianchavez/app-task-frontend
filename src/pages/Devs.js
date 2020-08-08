import React, { useEffect, useState } from 'react'
import DevForm from '../components/Forms/DevForm'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import DevsTable from '../components/Tables/DevsTable'

export default () => {

    useEffect(() => {
        getDevs()
    }, [])

    const [devs, setDevs] = useState([])

    const addDev = async (values) => {
        try {
            await db.collection('devs').doc().set(values)
            toast('Desarrollo agregada', { type: 'info', autoClose: 2000, hideProgressBar: true })
        } catch (err) {
            console.error(err)
        }
    }

    const onDelete = async (id) => {
        try {
            if (window.confirm('Eliminar desarrollo?')) {
                await db.collection('devs').doc(id).delete()
                toast('Desarrollo eliminada', { type: 'error', autoClose: 2000, hideProgressBar: true })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const getDevs = () => {
        try {
            db.collection('devs').onSnapshot(querySnapshot => {
                const docs = []
                querySnapshot.forEach(d => {
                    docs.push({ ...d.data(), id: d.id })
                })
                setDevs(docs)
                console.log(docs)
            })
        } catch (err) {

        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4 mt-2">
                    <DevForm {...{ addDev }} />
                </div>
                <div className="col-md-8 bg-secondary mt-2" style={{ overflow: 'auto', maxHeight: 700 }}>
                    <DevsTable {...{devs, onDelete}}/>
                </div>
            </div>
        </div>
    )
}
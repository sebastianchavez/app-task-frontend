import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TaskForm from '../components/Forms/TaskForm'
import { db } from '../firebase'
import TasksTable from '../components/Tables/TasksTable'
import TaskModal from '../components/Modals/TaskModal'

export default () => {

    useEffect(() => {
        getTasks()
        getDevs()
    }, [])

    const [tasks, setTasks] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [devs, setDevs] = useState([])
    const [modalData, setModalData] = useState({})

    const openModal = (task) => {
        setModalData(task)
    }

    const getTasks = () => {
        db.collection('tasks').onSnapshot(querySnapshot => {
            const docs = []
            querySnapshot.forEach(t => {
                docs.push({ ...t.data(), id: t.id })
            })
            setTasks(docs)
            console.log('tasks', docs)
        })
    }

    const addOrEdit = async (values) => {
        try {
            if (currentId === '') {
                await db.collection('tasks').doc().set(values)
                toast('Nueva tarea agregada', { type: 'info', autoClose: 2000, hideProgressBar: true })
            } else {
                if (!values.cancel) {
                    await db.collection('tasks').doc(currentId).update(values)
                    toast('Tarea actualizada', { type: 'info', autoClose: 2000, hideProgressBar: true })
                }
                setCurrentId('')
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

    const onDelete = async (id) => {
        try {
            if (window.confirm('Eliminar tarea?')) {
                await db.collection('tasks').doc(id).delete()
                toast('Tarea eliminada', { type: 'error', autoClose: 2000, hideProgressBar: true })
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4 mt-2">
                    <TaskForm {...{ addOrEdit, currentId, tasks, devs }} />
                </div>
                <div className="col-md-8 bg-secondary mt-2" style={{ overflow: 'auto', maxHeight: 700 }}>
                    <TasksTable {...{ tasks, setCurrentId, onDelete, openModal }} />
                </div>
            </div>
            <TaskModal {...{modalData}} />
        </div>
    )
}

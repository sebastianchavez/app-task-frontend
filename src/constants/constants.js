export default {
    STATES: [
        { name: 'Creado', value: 'created' },
        { name: 'En desarrollo', value: 'developing' },
        { name: 'Finalizado', value: 'finish' },
        { name: 'Pendiente', value: 'pending' },
        { name: 'Cancelado', value: 'cancelled' }
    ],
    PRIORITIES: [
        { name: 'Muy baja', value: 'low' },
        { name: 'Baja', value: 'low' },
        { name: 'Media' ,value: 'medium' },
        { name: 'Alta', value: 'high' },
        { name: 'Muy alta', value: 'high' }
    ],
    TYPES: [
        { name: 'Web', value: 'web' },
        { name: 'Móvil', value: 'mobile' },
        { name: 'Escritorio', value: 'desktop' },
        { name: 'Juego', value: 'game' },
        { name: 'Devops', value: 'devops' }
    ],
    QUANT: [
        { name: '10', value: 10 },
        { name: '25', value: 25 },
        { name: '50', value: 50 },
        { name: '100', value: 100 },
        { name: 'Todos', value: 'all' },
    ]
}
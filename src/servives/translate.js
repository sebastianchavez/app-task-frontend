const dictiorary = [
    {eng: 'low', esp: 'Baja'},
    {eng: 'medium', esp: 'Media'},
    {eng: 'high', esp: 'Alta'},
    {eng: 'veryHigh', esp: 'Muy alta'},
    {eng: 'created', esp: 'Creado'},
    {eng: 'assign', esp: 'Asignado'},
    {eng: 'finish', esp: 'Finalizado'},
    {eng: 'pending', esp: 'Pendiente'},
    {eng: 'developing', esp: 'En desarrollo'},
    {eng: 'cancelled', esp: 'Cancelado'},
    {eng: 'web', esp: 'Web'},
    {eng: 'mobile', esp: 'Móvil'},
    {eng: 'desktop', esp: 'Escritorio'},
    {eng: 'game', esp: 'Juego'},
]

export default (value) => {
    return dictiorary.filter(d => d.eng === value)[0] ? dictiorary.filter(d => d.eng === value)[0].esp : value
}
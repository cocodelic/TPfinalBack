const testController = (req, res) => {
    const request = req.body
    console.log(`Request recibida:`,  request)

    res.json({
        status: 200,
        ok: true,
        message: 'Respuesta emitida con éxito',
        payload: null
    })
}

export default testController
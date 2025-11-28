

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());


/**
 * GET / - Endpoint principal
 * Muestra mensaje de bienvenida
 */
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Hola desde Docker!',
        endpoints: {
            bienvenida: 'GET /',
            saludo: 'GET /saludo/:nombre',
            suma: 'GET /suma/:a/:b',
            resta: 'GET /resta/:a/:b',
            multiplicacion: 'GET /multiplicacion/:a/:b',
            division: 'GET /division/:a/:b',
            info: 'GET /info',
            health: 'GET /health'
        }
    });
});

/**
 * GET /saludo/:nombre - Saludo personalizado
 */
app.get('/saludo/:nombre', (req, res) => {
    const { nombre } = req.params;
    res.json({
        mensaje: `¡Hola, ${nombre}! Bienvenido a nuestra aplicación Docker`,
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /suma/:a/:b - Operación de suma
 */
app.get('/suma/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Los parámetros deben ser números válidos' });
    }
    
    res.json({
        operacion: 'suma',
        a: a,
        b: b,
        resultado: a + b
    });
});

/**
 * GET /resta/:a/:b - Operación de resta
 */
app.get('/resta/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Los parámetros deben ser números válidos' });
    }
    
    res.json({
        operacion: 'resta',
        a: a,
        b: b,
        resultado: a - b
    });
});

/**
 * GET /multiplicacion/:a/:b - Operación de multiplicación
 */
app.get('/multiplicacion/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Los parámetros deben ser números válidos' });
    }
    
    res.json({
        operacion: 'multiplicacion',
        a: a,
        b: b,
        resultado: a * b
    });
});

/**
 * GET /division/:a/:b - Operación de división
 */
app.get('/division/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Los parámetros deben ser números válidos' });
    }
    
    if (b === 0) {
        return res.status(400).json({ error: 'No se puede dividir por cero' });
    }
    
    res.json({
        operacion: 'division',
        a: a,
        b: b,
        resultado: a / b
    });
});

/**
 * GET /info - Información del servidor y contenedor
 */
app.get('/info', (req, res) => {
    res.json({
        aplicacion: 'Lab4 Docker - UdeA',
        version: '1.0.0',
        nodejs: process.version,
        plataforma: process.platform,
        arquitectura: process.arch,
        memoria: {
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
            usado: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
        },
        uptime: `${Math.round(process.uptime())} segundos`,
        timestamp: new Date().toISOString(),
        contenedor: process.env.HOSTNAME || 'local'
    });
});

/**
 * GET /health - Health check para Docker
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        mensaje: 'El servicio está funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});


app.listen(PORT, '0.0.0.0', () => {

    console.log(`   Servidor escuchando en puerto ${PORT}`);
    console.log('   Endpoints disponibles:');
    console.log(`   • GET /              - Mensaje de bienvenida`);
    console.log(`   • GET /saludo/:nombre - Saludo personalizado`);
    console.log(`   • GET /suma/:a/:b    - Suma dos números`);
    console.log(`   • GET /resta/:a/:b   - Resta dos números`);
    console.log(`   • GET /multiplicacion/:a/:b - Multiplica dos números`);
    console.log(`   • GET /division/:a/:b - Divide dos números`);
    console.log(`   • GET /info          - Info del servidor`);
    console.log(`   • GET /health        - Health check`);
});


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DWEC - Desarrollo Web Entorno Cliente</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #00d2fc 0%, #0a4cb0 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 25px;
            padding: 60px 40px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            text-align: center;
            animation: zoomIn 0.8s ease-out;
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .icon {
            font-size: 5rem;
            margin-bottom: 20px;
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
        }
        
        h1 {
            color: #0a4cb0;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #999;
            font-size: 0.95em;
            margin-bottom: 30px;
            font-weight: 300;
        }
        
        .description {
            color: #555;
            font-size: 1.1em;
            line-height: 1.8;
            margin: 30px 0;
            animation: fadeIn 1s ease-out 0.3s both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .what-is {
            background: linear-gradient(135deg, #00d2fc15, #0a4cb015);
            padding: 20px;
            border-radius: 15px;
            margin: 30px 0;
            border-left: 4px solid #0a4cb0;
        }
        
        .what-is h2 {
            color: #0a4cb0;
            font-size: 1.3em;
            margin-bottom: 12px;
            text-align: left;
        }
        
        .what-is p {
            color: #666;
            text-align: left;
            line-height: 1.7;
        }
        
        .features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 30px 0;
        }
        
        .feature {
            background: #f0f7ff;
            padding: 15px;
            border-radius: 10px;
            font-size: 0.9em;
            color: #555;
            animation: scaleIn 0.6s ease-out;
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .feature:nth-child(1) { animation-delay: 0.1s; }
        .feature:nth-child(2) { animation-delay: 0.2s; }
        .feature:nth-child(3) { animation-delay: 0.3s; }
        .feature:nth-child(4) { animation-delay: 0.4s; }
        
        .feature strong {
            color: #0a4cb0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🚀</div>
        <h1>DWEC</h1>
        <p class="subtitle">Desarrollo Web Entorno Cliente</p>
        
        <div class="description">
            Aprendes <strong>JavaScript avanzado para crear aplicaciones web dinámicas e interactivas</strong> en el navegador.
        </div>
        
        <div class="what-is">
            <h2>¿Qué vamos a aprender?</h2>
            <p>JavaScript profundo: objetos, funciones, asincronía, manipulación del DOM y cómo hacer webs que respondan a las acciones del usuario en tiempo real.</p>
        </div>
        
        <div class="features">
            <div class="feature">⚡ <strong>JavaScript ES6+</strong></div>
            <div class="feature">🎯 <strong>DOM API</strong></div>
            <div class="feature">🔄 <strong>Asincronía</strong></div>
            <div class="feature">📡 <strong>APIs</strong></div>
        </div>
    </div>
</body>
</html>
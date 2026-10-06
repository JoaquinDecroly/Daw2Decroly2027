<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DWES - Desarrollo Web Entorno Servidor</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
            animation: slideInLeft 0.8s ease-out;
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .icon {
            font-size: 5rem;
            margin-bottom: 20px;
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        h1 {
            color: #11998e;
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
            background: linear-gradient(135deg, #11998e15, #38ef7d15);
            padding: 20px;
            border-radius: 15px;
            margin: 30px 0;
            border-left: 4px solid #11998e;
        }
        
        .what-is h2 {
            color: #11998e;
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
            background: #f0fffe;
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
            color: #11998e;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🔐</div>
        <h1>DWES</h1>
        <p class="subtitle">Desarrollo Web Entorno Servidor</p>
        
        <div class="description">
            Aprendes a <strong>programar la lógica detrás de las aplicaciones web con PHP y bases de datos</strong>.
        </div>
        
        <div class="what-is">
            <h2>¿Qué vamos a aprender?</h2>
            <p>PHP, MySQL, APIs REST, autenticación, seguridad y cómo crear el backend que hace que las webs funcionen de verdad.</p>
        </div>
        
        <div class="features">
            <div class="feature">🐘 <strong>PHP</strong></div>
            <div class="feature">🗄️ <strong>MySQL</strong></div>
            <div class="feature">📡 <strong>APIs REST</strong></div>
            <div class="feature">🔒 <strong>Seguridad</strong></div>
        </div>
    </div>
</body>
</html>
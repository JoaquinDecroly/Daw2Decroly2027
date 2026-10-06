<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DIW - Desarrollo Interfaces Web</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
            animation: slideDown 0.8s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .icon {
            font-size: 5rem;
            margin-bottom: 20px;
            animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        h1 {
            color: #f5576c;
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
            background: linear-gradient(135deg, #f093fb15, #f5576c15);
            padding: 20px;
            border-radius: 15px;
            margin: 30px 0;
            border-left: 4px solid #f5576c;
        }
        
        .what-is h2 {
            color: #f5576c;
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
            background: #fff5f7;
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
            color: #f5576c;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">💻</div>
        <h1>DIW</h1>
        <p class="subtitle">Desarrollo Interfaces Web</p>
        
        <div class="description">
            Aprendes a <strong>programar interfaces web con HTML, CSS y JavaScript</strong>.
        </div>
        
        <div class="what-is">
            <h2>¿Qué vamos a aprender?</h2>
            <p>Estructura de páginas (HTML), estilos y animaciones (CSS) e interactividad (JavaScript) para crear webs que funcionen de verdad.</p>
        </div>
        
        <div class="features">
            <div class="feature">🏗️ <strong>HTML5</strong></div>
            <div class="feature">🎨 <strong>CSS3</strong></div>
            <div class="feature">⚡ <strong>JavaScript</strong></div>
            <div class="feature">📱 <strong>Responsive</strong></div>
        </div>
    </div>
</body>
</html>
DROP DATABASE IF EXISTS imprenta_presupuestos_v2;
CREATE DATABASE IF NOT EXISTS imprenta_presupuestos_v2 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE imprenta_presupuestos_v2;

-- Borrar tablas si ya existen (para evitar errores al re-importar)
DROP TABLE IF EXISTS presupuestos;
DROP TABLE IF EXISTS troqueles;
DROP TABLE IF EXISTS parametros_globales;
DROP TABLE IF EXISTS formatos_impresion;
DROP TABLE IF EXISTS insumos;
DROP TABLE IF EXISTS maquinas;

-- Máquinas de impresión
CREATE TABLE maquinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    formato_max_ancho FLOAT NOT NULL,  -- en cm
    formato_max_largo FLOAT NOT NULL,  -- en cm
    formato_min_ancho FLOAT NOT NULL,  -- en cm
    formato_min_largo FLOAT NOT NULL,  -- en cm
    medida_pinza FLOAT NOT NULL,       -- en cm
    costo_hora DECIMAL(10, 2) NOT NULL,
    costo_puesta DECIMAL(10, 2) NOT NULL DEFAULT 0,
    velocidad_por_hora INT NOT NULL DEFAULT 5000,
    tipo_calculo ENUM('millares', 'unidades') NOT NULL DEFAULT 'millares',
    costo_tinta DECIMAL(10, 2) NOT NULL DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insumos (Materiales como Papel, Tintas, Chapas)
CREATE TABLE insumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('papel', 'tinta', 'chapa', 'prenda', 'otro') NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    gramaje INT DEFAULT NULL,          -- Solo para papel (ej. 150g, 300g)
    formato_ancho FLOAT DEFAULT NULL,  -- Formato de compra (ej. 70cm)
    formato_largo FLOAT DEFAULT NULL,  -- Formato de compra (ej. 100cm)
    costo_unidad DECIMAL(10, 2) NOT NULL, -- Costo por resma, kilo, docena, etc.
    unidades_por_paquete INT DEFAULT 1, -- Ej: 500 para una resma de papel, 1 para tinta.
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Formatos estándar de impresión que se usan usualmente para validar
CREATE TABLE formatos_impresion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ancho FLOAT NOT NULL, -- en cm
    largo FLOAT NOT NULL, -- en cm
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO maquinas (nombre, formato_max_ancho, formato_max_largo, formato_min_ancho, formato_min_largo, medida_pinza, costo_hora, costo_puesta, velocidad_por_hora) VALUES
('Heidelberg Speedmaster 52', 52.0, 37.0, 10.5, 14.5, 1.0, 15000.00, 5000.00, 5000),
('Komori Lithrone 28', 72.0, 52.0, 20.0, 28.0, 1.2, 25000.00, 8000.00, 8000);

-- Insertar Insumos
INSERT INTO insumos (tipo, nombre, gramaje, formato_ancho, formato_largo, costo_unidad, unidades_por_paquete) VALUES
('papel', 'Couche Brillante', 150, 72.0, 102.0, 50000.00, 500), 
('papel', 'Opalina', 250, 72.0, 102.0, 80000.00, 500),
('prenda', 'Remera Algodón Lisa', NULL, NULL, NULL, 5000.00, 1),
('tinta', 'Tinta Cyan', NULL, NULL, NULL, 15000.00, 1),
('chapa', 'Chapa Lithrone 28', NULL, NULL, NULL, 4000.00, 1),
('chapa', 'Chapa GTO 52', NULL, NULL, NULL, 2500.00, 1);

-- Insertar formas comunes
INSERT INTO formatos_impresion (nombre, ancho, largo) VALUES
('Carta', 21.6, 27.9),
('A4', 21.0, 29.7),
('1/2 Oficio', 16.5, 21.6),
('A3', 29.7, 42.0);

-- Parámetros Globales (Solo 1 fila que servirá para la administración general)
CREATE TABLE parametros_globales (
    id INT PRIMARY KEY DEFAULT 1,
    ganancia DECIMAL(5,2) NOT NULL DEFAULT 30.00,
    comision DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    iva DECIMAL(5,2) NOT NULL DEFAULT 22.00
);

INSERT IGNORE INTO parametros_globales (id, ganancia, comision, iva) VALUES (1, 30.00, 0.00, 22.00);

-- Troqueles
CREATE TABLE troqueles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ancho DECIMAL(10,2) NOT NULL,
    largo DECIMAL(10,2) NOT NULL,
    bocas INT NOT NULL
);

-- Insertar Troqueles de Ejemplo
INSERT INTO troqueles (nombre, ancho, largo, bocas) VALUES 
('Troquel Circular 5cm', 5.0, 5.0, 24),
('Carpeta Presentación', 45.0, 32.0, 1),
('Caja Fósforo', 12.0, 15.0, 4);

-- Presupuestos Historial
CREATE TABLE presupuestos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    cliente VARCHAR(255) DEFAULT '',
    cantidad INT NOT NULL,
    archivo_final_str VARCHAR(255) NOT NULL,
    maquina_str VARCHAR(255) NOT NULL,
    costo_base DECIMAL(10,2) NOT NULL,
    ganancia DECIMAL(10,2) NOT NULL,
    comision DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    precio_final DECIMAL(10,2) NOT NULL,
    datos_json TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

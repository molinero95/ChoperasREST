USE Choperas;

INSERT INTO `gasolineras` (
        `id_localidad`, 
        `id_municipio`, 
        `id_provincia`, 
        `id_ccaa`, 
        `horario`, 
        `cp`, 
        `direccion`, 
        `rotulo`, 
        `tipo_venta`,
        `margen`,
        `remision`,
        `latitud`,
        `longitud`
) VALUES
(1, 1, 1, 1,'L-D: 07:00-22:00', 12345, 'direccion test', 'fuel_station_test', 'P', "I", "dm", "37,670667", "-4,555222");
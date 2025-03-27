#!/bin/bash

# Colores para los mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Verificando cambios en el repositorio...${NC}"

# Verificar si hay cambios
if [[ -n $(git status -s) ]]; then
    # Mostrar los cambios
    echo -e "${YELLOW}Cambios detectados:${NC}"
    git status -s
    
    # Solicitar mensaje de commit
    echo -e "${YELLOW}Por favor, ingresa un mensaje para el commit:${NC}"
    read commit_message
    
    # Si no se proporciona mensaje, usar uno por defecto
    if [[ -z "$commit_message" ]]; then
        commit_message="Actualización automática: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # Agregar todos los cambios
    echo -e "${YELLOW}Agregando cambios...${NC}"
    git add .
    
    # Crear commit
    echo -e "${YELLOW}Creando commit...${NC}"
    git commit -m "$commit_message"
    
    # Subir cambios
    echo -e "${YELLOW}Subiendo cambios al repositorio remoto...${NC}"
    if git push origin main; then
        echo -e "${GREEN}¡Cambios subidos exitosamente!${NC}"
    else
        echo -e "${RED}Error al subir los cambios. Por favor, verifica tu conexión y permisos.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}No hay cambios para subir.${NC}"
fi 
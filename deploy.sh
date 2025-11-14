#!/bin/bash

# Script de deployment automático para Fluxo eCommerce
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Iniciando proceso de deployment..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Limpiar carpetas antiguas
echo -e "${BLUE}📦 Limpiando carpetas antiguas...${NC}"
rm -rf dist/
rm -rf deployServer/*

# 2. Build de producción
echo -e "${BLUE}🔨 Compilando proyecto...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}❌ Error en el build. Abortando.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completado exitosamente${NC}"
echo ""

# 3. Copiar archivos a deployServer
echo -e "${BLUE}📂 Copiando archivos a deployServer...${NC}"
cp -r dist/* deployServer/

# 4. Copiar .htaccess (puede no estar en dist/)
if [ -f "public/.htaccess" ]; then
    cp public/.htaccess deployServer/
    echo -e "${GREEN}✅ .htaccess copiado${NC}"
fi

# 5. Verificar archivos críticos
echo -e "${BLUE}🔍 Verificando archivos críticos...${NC}"

CRITICAL_FILES=(
    "deployServer/index.html"
    "deployServer/.htaccess"
    "deployServer/robots.txt"
    "deployServer/sitemap.xml"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  ✓${NC} $file"
    else
        echo -e "${YELLOW}  ✗${NC} $file ${YELLOW}(FALTANTE)${NC}"
    fi
done

echo ""

# 6. Mostrar tamaño del bundle
echo -e "${BLUE}📊 Tamaño del bundle:${NC}"
du -sh deployServer/
du -sh deployServer/assets/

echo ""

# 7. Resumen
echo -e "${GREEN}✨ Deployment preparado exitosamente!${NC}"
echo ""
echo -e "${BLUE}📁 Los archivos están listos en: ${NC}deployServer/"
echo ""
echo -e "${YELLOW}Próximos pasos:${NC}"
echo "  1. Sube el contenido de deployServer/ a tu servidor"
echo "  2. Asegúrate de subir el archivo .htaccess"
echo "  3. Verifica que las rutas funcionen correctamente"
echo "  4. Prueba la integración con WooCommerce"
echo ""
echo -e "${BLUE}Métodos de subida:${NC}"
echo "  • FTP/SFTP: Arrastra deployServer/* a public_html/"
echo "  • rsync: rsync -avz deployServer/ usuario@servidor:public_html/"
echo "  • Git: Commit y push al servidor"
echo ""
echo -e "${GREEN}¡Listo para deployment! 🚀${NC}"

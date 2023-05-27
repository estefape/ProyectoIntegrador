#!/bin/bash

ruta="/home/ubuntu/Dockerfile"
nombre_usuario="cinthyarondon"
nombre_repositorio="digitalbooking"
etiqueta="latest"

# Verificar máquina virtual
echo "Host: $(hostname)"
echo "OS: $(uname -a)"

# Actualizar el sistema
sudo apt-get update
sudo apt-get upgrade -y

# Instalar Docker
if ! command -v docker &>/dev/null; then
  echo "Instalación de Docker"
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
  sudo apt update
  sudo apt install -y docker-ce
else
  echo "Docker ya está instalado"
  docker --version
fi

if [ -f "$ruta" ]; then
  echo "El archivo Dockerfile existe en la ruta especificada."

  # Construir la imagen
  docker build -t "$nombre_usuario/$nombre_repositorio:$etiqueta" .

  # Verificar si la construcción de la imagen fue exitosa
  if [ $? -eq 0 ]; then
    echo "La imagen se ha construido correctamente."

    # Ejecutar el contenedor
    docker run -d -p 8000:8080 "$nombre_usuario/$nombre_repositorio:$etiqueta"
  else
    echo "La construcción de la imagen ha fallado."
  fi
else
  echo "El archivo Dockerfile no existe en la ruta especificada."
fi
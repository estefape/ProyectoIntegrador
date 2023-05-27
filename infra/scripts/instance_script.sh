#!/bin/bash

ruta="/home/ubuntu"
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
  echo "Docker ya está instalado!"
  docker --version
  sudo systemctl enable docker

fi

# Verificar si el puerto 80 está ocupado
if docker ps --format '{{.Ports}}' | grep -q ":80->"; then
  echo "El puerto 80 está ocupado. Eliminando el contenedor existente..."
  sudo docker rm -f mi_contenedor
fi

# Verificar si el Dockerfile existe
if [ -f "$ruta/Dockerfile" ]; then
  echo "El archivo Dockerfile existe en la ruta especificada."

  if [ -f "$ruta/backend/" ]; then
    echo "La carpeta 'backend' existe en la ruta especificada."

    # Construir la imagen
    sudo docker build -t "$nombre_usuario/$nombre_repositorio:$etiqueta" .

    # Verificar si la construcción de la imagen fue exitosa
    if [ $? -eq 0 ]; then
      echo "La imagen se ha construido correctamente."

      # Ejecutar el contenedor
      sudo docker run -d -p 80:8080 "$nombre_usuario/$nombre_repositorio:$etiqueta"
    else
      echo "La construcción de la imagen ha fallado."
    fi

  else
    echo "La carpeta 'backend' no existe en la ruta especificada."
  fi

else
  echo "El archivo Dockerfile no existe en la ruta especificada."
fi
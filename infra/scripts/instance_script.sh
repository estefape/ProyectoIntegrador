#!/bin/bash

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
fi

echo "La versión de Docker instalada es:"
docker --version
